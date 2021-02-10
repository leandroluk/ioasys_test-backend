import { MongoHelper } from '../infra/db/mongodb/helpers/mongo.helper'
import env from './config/env'

MongoHelper
  .connect(env.mongo.url)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.app.port, () => console.log(`running on ${env.app.port}`))
  })
  .catch(console.error)
