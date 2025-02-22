import { toWebHandler } from 'h3'
import { app } from './app'
const handler = toWebHandler(app)

export default {
  async fetch(request: Request, env: any, ctx: any) {
    return handler(request, {
      cloudflare: { env, ctx },
    })
  },
}
