import { IEmailValidator } from '../../presentation/protocols/email.validator.interface'

export class EmailValidatorMock implements IEmailValidator {
  async isEmail(): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
