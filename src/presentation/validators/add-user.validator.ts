import { IDictionary } from '../../domain/generics/dictionary.interface'
import { IAddUserModel, IAddUserValidator } from '../../domain/use-cases/add-user.interface'
import { InvalidParamError } from '../../errors/invalid-param.error'
import { MissingParamError } from '../../errors/missing-param.error'
import { IS_EMAIL, IS_STRING } from '../../validators/constants'
import { IEmailValidator } from '../protocols/email.validator.interface'
import { IEmptyValidator } from '../protocols/empty.validator.interface'
import { IStringValidator } from '../protocols/string.validator.interface'
export class AddUserValidator implements IAddUserValidator {
  constructor(readonly emptyValidator: IEmptyValidator, readonly emailValidator: IEmailValidator, readonly stringValidator: IStringValidator) {}

  async validateAddUser(data: IAddUserModel): Promise<IDictionary<Error>> {
    const errors: IDictionary<Error> = {}

    if (await this.emptyValidator.isEmpty(data.email)) {
      errors.email = new MissingParamError('email')
    } else if (!(await this.emailValidator.isEmail(data.email))) {
      errors.email = new InvalidParamError('email', IS_EMAIL)
    }

    if (await this.emptyValidator.isEmpty(data.username)) {
      errors.username = new MissingParamError('username')
    } else if (!(await this.stringValidator.isString(data.username))) {
      errors.username = new InvalidParamError('username', IS_STRING)
    }

    if (await this.emptyValidator.isEmpty(data.password)) {
      errors.password = new MissingParamError('password')
    } else if (!(await this.stringValidator.isString(data.password))) {
      errors.password = new InvalidParamError('password', IS_STRING)
    }

    if (await this.emptyValidator.isEmpty(data.passwordConfirmation)) {
      errors.passwordConfirmation = new MissingParamError('passwordConfirmation')
    } else if (!(await this.stringValidator.isString(data.passwordConfirmation))) {
      errors.passwordConfirmation = new InvalidParamError('passwordConfirmation', IS_STRING)
    }

    if (data.password !== data.passwordConfirmation) {
      errors.passwordConfirmation = new InvalidParamError('passwordConfirmation', "passwords don't match")
    }

    return errors
  }
}
