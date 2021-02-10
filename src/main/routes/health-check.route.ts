import { Express, Request, Response, Router } from 'express'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo.helper'
import env from '../config/env'

export default (_router: Router, app: Express): void => {
  app.use(env.app.healthCheckBasePath, (_req: Request, res: Response) => {
    if (MongoHelper.client.isConnected()) {
      return res.sendStatus(200)
    }
    return res.sendStatus(500)
  })
}
