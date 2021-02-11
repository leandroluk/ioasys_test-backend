import { SignUpController } from '../../presentation/controllers/sign-up.controller'
import { AddUserValidator } from '../../presentation/validators/add-user.validator'
import { NoEmptyBodyValidator } from '../../presentation/validators/no-empty-body.validator'
import { EmailValidator } from '../../validators/email.validator'
import { EmptyValidator } from '../../validators/empty.validator'
import { StringValidator } from '../../validators/string.validator'

export const makeSignUpController = (): SignUpController => {
  const emptyValidator = new EmptyValidator()
  const emailValidator = new EmailValidator()
  const stringValidator = new StringValidator()
  const noEmptyBodyValidator = new NoEmptyBodyValidator(emptyValidator)
  const addUserValidator = new AddUserValidator(emptyValidator, emailValidator, stringValidator)

  return new SignUpController(noEmptyBodyValidator, addUserValidator)
}
