import { IStringValidator } from '../../presentation/protocols/string.validator.interface'

export class StringValidatorMock implements IStringValidator {
  async isString(): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
