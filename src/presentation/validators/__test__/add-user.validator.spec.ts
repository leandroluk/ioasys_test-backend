import { IAddUserModel, IAddUserValidator } from '../../../domain/use-cases/add-user.interface'
import { EmailValidatorMock } from '../../../mocks/validators/email.validator'
import { EmptyValidatorMock } from '../../../mocks/validators/empty.validator'
import { StringValidatorMock } from '../../../mocks/validators/string.validator'
import { IEmailValidator } from '../../protocols/email.validator.interface'
import { IEmptyValidator } from '../../protocols/empty.validator.interface'
import { IStringValidator } from '../../protocols/string.validator.interface'
import { AddUserValidator } from '../add-user.validator'

const makeSut = (): {
  emptyValidator: IEmptyValidator
  emailValidator: IEmailValidator
  stringValidator: IStringValidator
  sut: IAddUserValidator
  validData: IAddUserModel
} => {
  const emptyValidator = new EmptyValidatorMock()
  const emailValidator = new EmailValidatorMock()
  const stringValidator = new StringValidatorMock()
  const sut = new AddUserValidator(emptyValidator, emailValidator, stringValidator)
  const validData: IAddUserModel = {
    email: 'a@a.com',
    username: 'username',
    password: 'password',
    passwordConfirmation: 'passwordConfirmation'
  }

  return {
    emptyValidator,
    emailValidator,
    stringValidator,
    sut,
    validData
  }
}

describe('add-user.validator', () => {
  describe('validateAddUser', () => {
    it('should call emptyValidator', async () => {
      const { sut, emptyValidator, validData } = makeSut()
      const isEmptySpy = jest.spyOn(emptyValidator, 'isEmpty')
      await sut.validateAddUser(validData)
      expect(isEmptySpy).toBeCalled()
    })

    it('should call emailValidator and stringValidator', async () => {
      const { sut, emptyValidator, emailValidator, stringValidator, validData } = makeSut()
      jest.spyOn(emptyValidator, 'isEmpty').mockResolvedValue(false)
      const isEmailSpy = jest.spyOn(emailValidator, 'isEmail')
      const isStringSpy = jest.spyOn(stringValidator, 'isString')
      await sut.validateAddUser(validData)
      expect(isEmailSpy).toBeCalled()
      expect(isStringSpy).toBeCalled()
    })

    it('should return a dictionary with errors if some required field is missing', async () => {
      const { sut, validData } = makeSut()

      for (const [field] of Object.entries(validData)) {
        const dataWithoutField: any = { ...validData }
        delete dataWithoutField[field]
        const result = await sut.validateAddUser(dataWithoutField)
        expect(result[field]).toBeDefined()
      }
    })

    it('should return a dictionary with errors if some required field is invalid', async () => {
      const { sut, validData, emptyValidator, emailValidator, stringValidator } = makeSut()

      jest.spyOn(emptyValidator, 'isEmpty').mockResolvedValue(false)
      jest.spyOn(emailValidator, 'isEmail').mockResolvedValue(false)
      jest.spyOn(stringValidator, 'isString').mockResolvedValue(false)

      const dataWithoutField: any = Object.keys(validData)
        .reduce((obj, key) => ({ ...obj, [key]: 1 }), {})
      const result = await sut.validateAddUser(dataWithoutField)
      expect(result.email).toBeDefined()
      expect(result.username).toBeDefined()
      expect(result.password).toBeDefined()
      expect(result.passwordConfirmation).toBeDefined()
    })

    it("should return a dictionary with errors if password isn't equal passwordConfirmation", async () => {
      const { sut, validData } = makeSut()
      const result = await sut.validateAddUser({ ...validData, password: '1' })
      expect(result.passwordConfirmation).toBeDefined()
    })
  })
})
