import { IAddUser, IAddUserModel, IAddUserValidator } from '../../domain/use-cases/add-user.interface'
import { INoEmptyBodyValidator } from '../../domain/use-cases/no-empty-body.interface'
import { ObjectValidationError } from '../../errors/object-validation.error'
import { badRequest, created } from '../helpers/http.helper'
import { IController } from '../protocols/controller.interface'
import { IHttpRequest, IHttpResponse } from '../protocols/http.interface'

export class SignUpController implements IController {
  constructor(
    readonly noEmptyBodyValidator: INoEmptyBodyValidator,
    readonly addUserValidator: IAddUserValidator,
    readonly addUserRepository: IAddUser
  ) { }

  async handle(httpRequest: IHttpRequest<any, IAddUserModel>): Promise<IHttpResponse> {
    const httpResponse = await this.noEmptyBodyValidator.noEmptyBodyValidate(httpRequest)

    if (httpResponse) {
      return httpResponse
    }

    const addUserValidation = await this.addUserValidator.validateAddUser(httpRequest.body)

    if (Object.keys(addUserValidation).length > 0) {
      return badRequest(new ObjectValidationError(addUserValidation))
    }

    try {
      const user = await this.addUserRepository.addUser(httpRequest.body, httpRequest.body.username)
      return created(user)
    } catch (error) {
      return badRequest(error)
    }
  }
}
