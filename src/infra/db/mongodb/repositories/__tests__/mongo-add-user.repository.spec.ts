import { IAddUser, IAddUserModel } from '../../../../../domain/use-cases/add-user.interface'
import env from '../../../../../main/config/env'
import { MongoHelper } from '../../helpers/mongo.helper'
import { MongoAddUserRepository } from '../mongo-add-user.repository'

const makeSut = (): {
  sut: IAddUser
  userData: IAddUserModel
} => {
  const sut = new MongoAddUserRepository()
  const userData: IAddUserModel = {
    email: 'a@a.com',
    username: 'username',
    password: 'password',
    passwordConfirmation: 'password'
  }

  return {
    sut,
    userData
  }
}

describe('add-user.repository', () => {
  beforeAll(async () => await MongoHelper.connect(process.env.MONGO_URL))
  beforeEach(async () => await MongoHelper.getCollection(env.mongo.collections.users).deleteMany({}))
  afterAll(async () => await MongoHelper.disconnect())

  it('should return user without password on success', async () => {
    const { sut, userData } = makeSut()
    const user = await sut.addUser(userData, userData.username)

    expect(user).toBeTruthy()
    expect(user._id).toBeTruthy()
    expect(user._created.at).toBeInstanceOf(Date)
    expect(user._created.by).toBe(userData.username)
    expect(user.email).toBe(userData.email)
    expect(user.username).toBe(userData.username)
    expect((user as any).password).toBeUndefined()
    expect((user as any).passwordConfirmation).toBeUndefined()
  })
})
