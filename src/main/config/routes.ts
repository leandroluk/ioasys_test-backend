import { Express, Router } from 'express'
import healthRoute from '../routes/health-check.route'
import signUpRoute from '../routes/sign-up.route'
import env from './env'

export default (app: Express): void => {
  const router = Router()
  app.use(env.app.apiBasePath, router)
  healthRoute(router, app)
  signUpRoute(router)
}
