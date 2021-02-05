import { INumberValidator } from '../presentation/protocols/number.validator.interface'

export class NumberValidator implements INumberValidator {
  async isNumber(value: any): Promise<boolean> {
    return await Promise.resolve(['number', 'bigint'].includes(typeof value))
  }
}
