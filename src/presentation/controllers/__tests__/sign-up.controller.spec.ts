import { IAddUserModel, IAddUserValidator } from '../../../domain/use-cases/add-user.interface'
import { MissingParamError } from '../../../errors/missing-param.error'
import { AddUserValidatorMock } from '../../../mocks/presentation/validators/add-user.validator'
import { IController } from '../../protocols/controller.interface'
import { SignUpController } from '../sign-up.controller'

const makeSut = (): {
  addUserValidator: IAddUserValidator
  sut: IController
  expectedBody: IAddUserModel
} => {
  const addUserValidator = new AddUserValidatorMock()
  const sut = new SignUpController(addUserValidator)
  const expectedBody: IAddUserModel = {
    email: 'a@a.com',
    username: 'username',
    password: 'password',
    passwordConfirmation: 'passwordConfirmation'
  }

  return {
    addUserValidator,
    sut,
    expectedBody
  }
}

describe('sign-up.controller', () => {
  describe('handle', () => {
    it('should addUserValidator to be called', async () => {
      const { sut, expectedBody, addUserValidator } = makeSut()
      const addUserValidatorSpy = jest.spyOn(addUserValidator, 'validateAddUser')
      const httpRequest = { body: expectedBody }
      await sut.handle(httpRequest)
      expect(addUserValidatorSpy).toHaveBeenCalled()
    })

    it("should return 400 with object validation error if one of required fields isn't provided", async () => {
      const { sut, expectedBody, addUserValidator } = makeSut()

      jest.spyOn(addUserValidator, 'validateAddUser').mockImplementation(
        async () =>
          await Promise.resolve({
            field: new MissingParamError('field')
          })
      )

      for (const key of Object.keys(expectedBody)) {
        const body: any = { ...expectedBody }
        delete body[key]
        const httpRequest = { body }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body?.errors.field?.message).toMatch(/missing param/i)
      }
    })
  })
})
