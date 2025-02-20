import {
  createApp,
  createRouter,
  defineEventHandler,
  sendProxy,
  useBase,
} from 'h3'
import { TV_MAZE_API_URL } from '../constants'
import * as shows from './handlers/shows'

// create an app instance
export const app = createApp()

const router = createRouter()

const v1 = createRouter()
v1.get(
  '**',
  defineEventHandler((event) => {
    // proxy requests to tv-maze api
    const path = event.path.replace('/api/v1', '')
    return sendProxy(event, TV_MAZE_API_URL + path)
  })
)

const v2 = createRouter()
v2.get('/shows', shows.list)

router.use('/api/v1/**', useBase('/api/v1', v1.handler))
router.use('/api/v2/**', useBase('/api/v2', v2.handler))

app.use(router)
