import { IGetUserByEmail } from '../../../domain/use-cases/get-user-by-email.interface'
import { GetUserByEmailMock } from '../../../mocks/domain/use-cases/get-user-by-email'
import { GetUserByEmailRepository } from '../get-user-by-email.repository'

const makeSut = (): {
  dbGetUserByEmail: IGetUserByEmail
  sut: IGetUserByEmail
  email: string
} => {
  const dbGetUserByEmail = new GetUserByEmailMock()
  const sut = new GetUserByEmailRepository(
    dbGetUserByEmail
  )
  const email = 'a@a.c'

  return {
    dbGetUserByEmail,
    sut,
    email
  }
}

describe('get-user-by-email.repository', () => {
  describe('getUserByEmail', () => {
    it('should call IGetUserByEmail', async () => {
      const { sut, dbGetUserByEmail, email } = makeSut()
      const getUserByEmailSpy = jest.spyOn(dbGetUserByEmail, 'getUserByEmail')
      await sut.getUserByEmail(email)
      expect(getUserByEmailSpy).toHaveBeenCalled()
    })
  })
})
