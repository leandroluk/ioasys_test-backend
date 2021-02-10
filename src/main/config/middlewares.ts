import { Express } from 'express'
import bodyParser from '../middlewares/body-parser.middleware'
import contentType from '../middlewares/content-type.middleware'
import cors from '../middlewares/cors.middleware'
import headerParser from '../middlewares/header-parser.middleware'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
  app.use(headerParser)
}
