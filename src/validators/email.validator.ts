import validator from 'validator'
import { IEmailValidator } from '../presentation/protocols/email.validator.interface'

export class EmailValidator implements IEmailValidator {
  async isEmail(value: string): Promise<boolean> {
    return await new Promise(resolve => {
      try {
        resolve(
          ![undefined, null, ''].includes(value) &&
          typeof value === 'string' &&
          validator.isEmail(value)
        )
      } catch (error) {
        resolve(false)
      }
    })
  }
}
