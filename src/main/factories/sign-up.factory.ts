import { AddUserRepository } from '../../data/repositories/add-user.repository'
import { GetUserByEmailRepository } from '../../data/repositories/get-user-by-email.repository'
import { BcryptAdapter } from '../../infra/adapters/bcrypt.adapter'
import { MongoAddUserRepository } from '../../infra/db/mongodb/repositories/mongo-add-user.repository'
import { MongoGetUserByEmailRepository } from '../../infra/db/mongodb/repositories/mongo-get-user-by-email.repository'
import { SignUpController } from '../../presentation/controllers/sign-up.controller'
import { AddUserValidator } from '../../presentation/validators/add-user.validator'
import { NoEmptyBodyValidator } from '../../presentation/validators/no-empty-body.validator'
import { EmailValidator } from '../../validators/email.validator'
import { EmptyValidator } from '../../validators/empty.validator'
import { StringValidator } from '../../validators/string.validator'
import env from '../config/env'

export const makeSignUpController = (): SignUpController => {
  const emptyValidator = new EmptyValidator()
  const emailValidator = new EmailValidator()
  const stringValidator = new StringValidator()
  const noEmptyBodyValidator = new NoEmptyBodyValidator(emptyValidator)
  const addUserValidator = new AddUserValidator(emptyValidator, emailValidator, stringValidator)
  const dbGetUserByEmail = new MongoGetUserByEmailRepository()
  const getUserByEmail = new GetUserByEmailRepository(dbGetUserByEmail)
  const encrypter = new BcryptAdapter(env.cryptography.salt)
  const dbAddUser = new MongoAddUserRepository()
  const addUserRepository = new AddUserRepository(getUserByEmail, encrypter, dbAddUser)

  return new SignUpController(noEmptyBodyValidator, addUserValidator, addUserRepository)
}
