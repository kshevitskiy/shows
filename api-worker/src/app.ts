import {
  createApp,
  createRouter,
  defineEventHandler,
  sendProxy,
  useBase,
} from 'h3'
import cors from './middleware/cors'
import * as shows from './handlers/shows'
import * as genres from './handlers/genres'

// create an app instance
export const app = createApp()

const router = createRouter()
router.get(
  '/',
  defineEventHandler(() => ({ status: '✅' }))
)

const v1 = createRouter()
v1.get(
  '**',
  defineEventHandler((event) => {
    // cloudflare env
    const env = event.context.cloudflare?.env
    const baseUrl = env.TV_MAZE_API_URL

    // proxy requests to tv-maze api
    const path = event.path.replace('/api/v1', '')
    return sendProxy(event, baseUrl + path)
  })
)

const v2 = createRouter()
v2.get('/shows', shows.list)
v2.get('/genres', genres.list)

router.use('/api/v1/**', useBase('/api/v1', v1.handler))
router.use('/api/v2/**', useBase('/api/v2', v2.handler))

app.use(cors)
app.use(router)
