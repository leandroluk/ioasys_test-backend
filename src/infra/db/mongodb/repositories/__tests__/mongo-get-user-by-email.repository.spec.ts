import { IUserWithPasswordModel } from '../../../../../domain/models/user.interface'
import { IGetUserByEmail } from '../../../../../domain/use-cases/get-user-by-email.interface'
import env from '../../../../../main/config/env'
import { MongoHelper } from '../../helpers/mongo.helper'
import { MongoGetUserByEmailRepository } from '../mongo-get-user-by-email.repository'

const makeSut = (): {
  sut: IGetUserByEmail
  userWithPasswordModel: IUserWithPasswordModel
} => {
  const sut = new MongoGetUserByEmailRepository()
  const userWithPasswordModel: IUserWithPasswordModel = {
    _id: MongoHelper.objectId().toHexString(),
    _created: { by: 'by', at: new Date() },
    email: 'email',
    password: 'password',
    username: 'username'
  }

  return {
    sut,
    userWithPasswordModel
  }
}

describe('mongo-get-user-by-email.repository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))
  beforeEach(async () => await MongoHelper.getCollection(env.mongo.collections.users).deleteMany({}))
  afterAll(async () => await MongoHelper.disconnect())

  describe('getUserByEmail', () => {
    it('should call getCollection from MongoHelper', async () => {
      const { sut } = makeSut()
      const getCollectionSpy = jest.spyOn(MongoHelper, 'getCollection')
      await sut.getUserByEmail('a@a.c')
      expect(getCollectionSpy).toHaveBeenCalled()
    })

    it('should return user with password', async () => {
      const { sut, userWithPasswordModel } = makeSut()
      await MongoHelper.getCollection(env.mongo.collections.users)
        .insertOne(userWithPasswordModel)

      const user = await sut.getUserByEmail<IUserWithPasswordModel>(userWithPasswordModel.email, true)

      expect(user).toBeTruthy()
      expect(user._id).toBeTruthy()
      expect(user._created?.at).toBeInstanceOf(Date)
      expect(user._created?.by).toBe(userWithPasswordModel._created.by)
      expect(user.email).toBe(userWithPasswordModel.email)
      expect(user.username).toBe(userWithPasswordModel.username)
      expect(user.password).toBe(userWithPasswordModel.password)
    })

    it('should return user without password', async () => {
      const { sut, userWithPasswordModel } = makeSut()
      await MongoHelper.getCollection(env.mongo.collections.users)
        .insertOne(userWithPasswordModel)

      const user = await sut.getUserByEmail<any>(userWithPasswordModel.email)

      expect(user).toBeTruthy()
      expect(user._id).toBeTruthy()
      expect(user._created?.at).toBeInstanceOf(Date)
      expect(user._created?.by).toBe(userWithPasswordModel._created.by)
      expect(user.email).toBe(userWithPasswordModel.email)
      expect(user.username).toBe(userWithPasswordModel.username)
      expect(user.password).toBeUndefined()
    })

    it('should return null if not found', async () => {
      const { sut } = makeSut()
      const user = await sut.getUserByEmail('email')
      expect(user).toBeNull()
    })
  })
})
