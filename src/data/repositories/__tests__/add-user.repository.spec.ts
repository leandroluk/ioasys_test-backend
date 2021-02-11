import { IAddUser, IAddUserModel } from '../../../domain/use-cases/add-user.interface'
import { IGetUserByEmail } from '../../../domain/use-cases/get-user-by-email.interface'
import { EncrypterMock } from '../../../mocks/data/protocols/encrypter'
import { AddUserMock } from '../../../mocks/domain/use-cases/add-user'
import { GetUserByEmailMock } from '../../../mocks/domain/use-cases/get-user-by-email'
import { IEncrypter } from '../../protocols/encrypter.interface'
import { AddUserRepository } from '../add-user.repository'

const makeSut = (): {
  dbGetUserByEmail: IGetUserByEmail
  dbAddUser: IAddUser
  encrypter: IEncrypter
  sut: AddUserRepository
  addUserModel: IAddUserModel
  createdBy: string
} => {
  const dbGetUserByEmail = new GetUserByEmailMock()
  const dbAddUser = new AddUserMock()
  const encrypter = new EncrypterMock()
  const sut = new AddUserRepository(
    dbGetUserByEmail, encrypter, dbAddUser
  )
  const addUserModel: IAddUserModel = {
    email: 'a@a.com',
    username: 'username',
    password: 'password',
    passwordConfirmation: 'passwordConfirmation'
  }
  const createdBy = 'username'

  return {
    dbGetUserByEmail,
    dbAddUser,
    encrypter,
    sut,
    addUserModel,
    createdBy
  }
}

describe('add-user.repository', () => {
  describe('addUser', () => {
    it('should call encrypter with correct password', async () => {
      const { sut, encrypter, dbGetUserByEmail, addUserModel, createdBy } = makeSut()
      jest.spyOn(dbGetUserByEmail, 'getUserByEmail').mockResolvedValue(null)
      const encrypterSpy = jest.spyOn(encrypter, 'encrypt')
      await sut.addUser(addUserModel, createdBy)
      expect(encrypterSpy).toHaveBeenCalledWith(addUserModel.password)
    })

    it('should call AddUserRepository with correct values', async () => {
      const { sut, dbGetUserByEmail, dbAddUser, addUserModel, createdBy } = makeSut()
      jest.spyOn(dbGetUserByEmail, 'getUserByEmail').mockResolvedValue(null)
      const addUserSpy = jest.spyOn(dbAddUser, 'addUser')
      await sut.addUser(addUserModel, createdBy)
      expect(addUserSpy).toHaveBeenCalledWith({ ...addUserModel, password: 'hashed' }, createdBy)
    })

    it('should call GetUserRepository with correct values', async () => {
      const { sut, dbGetUserByEmail, addUserModel, createdBy } = makeSut()
      const getUserSpy = jest.spyOn(dbGetUserByEmail, 'getUserByEmail').mockResolvedValue(null)
      await sut.addUser(addUserModel, createdBy)
      expect(getUserSpy).toHaveBeenCalledWith(addUserModel.email)
    })

    it('should throw if IEncrypter throws', async () => {
      const { sut, encrypter, dbGetUserByEmail, createdBy } = makeSut()
      jest.spyOn(dbGetUserByEmail, 'getUserByEmail').mockResolvedValue(null)
      jest.spyOn(encrypter, 'encrypt').mockRejectedValue(new Error())
      await expect(sut.addUser({} as any, createdBy)).rejects.toThrow()
    })

    it('should throw if IAddUserRepository throws', async () => {
      const { sut, dbAddUser, createdBy } = makeSut()
      jest.spyOn(dbAddUser, 'addUser').mockRejectedValue(new Error())
      await expect(sut.addUser({} as any, createdBy)).rejects.toThrow()
    })

    it('should return UserModel if user is created', async () => {
      const { sut, dbGetUserByEmail, addUserModel, createdBy } = makeSut()
      jest.spyOn(dbGetUserByEmail, 'getUserByEmail').mockResolvedValue(null)
      const result = await sut.addUser(addUserModel, createdBy)
      expect(result.email).toBe(addUserModel.email)
    })
  })
})
