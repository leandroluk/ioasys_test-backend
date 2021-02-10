import { Express, Router } from 'express'
import fg from 'fast-glob'
import env from './env'

export default (app: Express): void => {
  const router = Router()
  app.use(env.app.apiBasePath, router)
  const routes = fg.sync('**/src/main/routes/**.route.ts')
  routes.map(async file => (await import(`../../../${file}`)).default(router, app))
}
