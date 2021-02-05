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

  return {
    dbGetUserByEmail,
    dbAddUser,
    encrypter,
    sut,
    addUserModel
  }
}

describe(
  'add-user.repository', () => {
    test('should true', () => {
      const { sut } = makeSut()
      console.log(sut)
    })
  }
)
