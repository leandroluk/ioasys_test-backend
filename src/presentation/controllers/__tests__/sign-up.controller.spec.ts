import { IAddUserModel, IAddUserValidator } from '../../../domain/use-cases/add-user.interface'
import { INoEmptyBodyValidator } from '../../../domain/use-cases/no-empty-body.interface'
import { MissingParamError } from '../../../errors/missing-param.error'
import { NoEmptyBodyValidatorMock } from '../../../mocks/domain/use-cases/no-empty-body-validator'
import { AddUserValidatorMock } from '../../../mocks/presentation/validators/add-user.validator'
import { badRequest } from '../../helpers/http.helper'
import { IController } from '../../protocols/controller.interface'
import { HttpStatusCode } from '../../protocols/http.interface'
import { SignUpController } from '../sign-up.controller'

const makeSut = (): {
  noEmptyBodyValidator: INoEmptyBodyValidator
  addUserValidator: IAddUserValidator
  sut: IController
  expectedBody: IAddUserModel
} => {
  const noEmptyBodyValidator = new NoEmptyBodyValidatorMock()
  const addUserValidator = new AddUserValidatorMock()
  const sut = new SignUpController(noEmptyBodyValidator, addUserValidator)
  const expectedBody: IAddUserModel = {
    email: 'a@a.com',
    username: 'username',
    password: 'password',
    passwordConfirmation: 'passwordConfirmation'
  }

  return {
    noEmptyBodyValidator,
    addUserValidator,
    sut,
    expectedBody
  }
}

describe('sign-up.controller', () => {
  describe('handle', () => {
    it('should noEmptyBodyValidator to be called', async () => {
      const { sut, noEmptyBodyValidator, expectedBody } = makeSut()
      const noEmptyBodyValidateSpy = jest.spyOn(noEmptyBodyValidator, 'noEmptyBodyValidate')
      const httpRequest = { body: expectedBody }
      await sut.handle(httpRequest)
      expect(noEmptyBodyValidateSpy).toHaveBeenCalled()
    })

    it('should return 400 if body is empty', async () => {
      const { sut, noEmptyBodyValidator, expectedBody } = makeSut()
      jest.spyOn(noEmptyBodyValidator, 'noEmptyBodyValidate')
        .mockResolvedValue(badRequest(new Error()))
      const httpRequest = { body: expectedBody }
      const httpResponse = await sut.handle(httpRequest)
      expect(httpResponse.statusCode).toBe(HttpStatusCode.badRequest)
    })

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
