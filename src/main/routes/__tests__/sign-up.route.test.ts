/*
import faker from 'faker'
import request from 'supertest'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo.helper'
import app from '../../config/app'
import env from '../../config/env'
*/

describe('sign-up.route', () => {
  it('should true', () => {})
  /*
  const url = env.app.apiBasePath + env.routes.signUp

  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))
  beforeEach(async () => await MongoHelper.getCollection(env.mongo.collections.users).deleteMany({}))
  afterAll(async () => await MongoHelper.disconnect())

  describe('ho have body', () => {
    it('should return 400 if no have body', async () => {
      await request(app)
        .post(url)
        .expect(400)
        .expect(/Missing param.*body.*?/)
    })
  })

  describe('missing param', () => {
    it('should return 400 if missing required param', async () => {
      await request(app)
        .post(url)
        .send({ password: 'password' })
        .expect(400)
        .expect(/Missing param.*email.*?/)
      await request(app)
        .post(url)
        .send({
          email: faker.internet.email()
        })
        .expect(400)
        .expect(/Missing param.*password.*?/)
    })
  })

  describe('invalid param', () => {
    it('should return 400 if invalid param', async () => {
      await request(app)
        .post(url)
        .send({
          email: 'invalid_email',
          password: 'password'
        })
        .expect(400)
        .expect(/Invalid param/)
    })
  })

  describe('email already exists', () => {
    it('should return 400 if email already exists', async () => {
      const existingUser = {
        email: 'already@exists.com',
        password: 'already_exists_com'
      }

      await MongoHelper
        .getCollection(env.mongo.collections.users)
        .insertOne(existingUser)

      await request(app)
        .post(url)
        .send(existingUser)
        .expect(400)
    })
  })

  describe('success', () => {
    it('should return user on success ', async () => {
      await request(app)
        .post(url)
        .send({
          email: faker.internet.email(),
          password: faker.internet.password(5)
        })
        .expect(200)
    })
  })
  */
})
