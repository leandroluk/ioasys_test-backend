import { IStringValidator } from '../presentation/protocols/string.validator.interface'

export class StringValidator implements IStringValidator {
  async isString(value: any): Promise<boolean> {
    return await Promise.resolve(typeof value === 'string')
  }
}
