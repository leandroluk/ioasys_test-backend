import faker from 'faker'
import request from 'supertest'
import { InvalidParamError } from '../../../errors/invalid-param.error'
import { MissingParamError } from '../../../errors/missing-param.error'
import { MongoHelper } from '../../../infra/db/mongodb/helpers/mongo.helper'
import app from '../../config/app'
import env from '../../config/env'


describe('sign-up.route', () => {
  const url = env.app.apiBasePath + env.routes.signUp

  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))
  beforeEach(async () => await MongoHelper.getCollection(env.mongo.collections.users).deleteMany({}))
  afterAll(async () => await MongoHelper.disconnect())

  it('should return 400 if no have body', async () => {
    const response = await request(app).post(url)
    expect(response.status).toBe(400)
    expect(JSON.stringify(response)).toMatch(MissingParamError.REGEX_MATCH)
  })

  it('should return 400 if missing required param', async () => {
    await request(app)
      .post(url)
      .send({
        password: 'password'
      })
      .expect(400)
      .expect(MissingParamError.REGEX_MATCH)
    await request(app)
      .post(url)
      .send({
        email: faker.internet.email()
      })
      .expect(400)
      .expect(MissingParamError.REGEX_MATCH)
  })

  it('should return 400 if invalid param', async () => {
    await request(app)
      .post(url)
      .send({
        email: 'invalid_email',
        password: 'password'
      })
      .expect(400)
      .expect(InvalidParamError.REGEX_MATCH)
  })

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

  it('should return 201 user on success ', async () => {
    const password = faker.internet.password(5)
    await request(app)
      .post(url)
      .send({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password,
        passwordConfirmation: password
      })
      .expect(201)
  })
})
