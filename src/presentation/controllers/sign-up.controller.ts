import { IAddUserValidator } from '../../domain/use-cases/add-user.interface'
import { INoEmptyBodyValidator } from '../../domain/use-cases/no-empty-body.interface'
import { ObjectValidationError } from '../../errors/object-validation.error'
import { badRequest, ok } from '../helpers/http.helper'
import { IController } from '../protocols/controller.interface'
import { IHttpRequest, IHttpResponse } from '../protocols/http.interface'

export class SignUpController implements IController {
  constructor(
    readonly noEmptyBodyValidator: INoEmptyBodyValidator,
    readonly addUserValidator: IAddUserValidator
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.noEmptyBodyValidator.noEmptyBodyValidate(httpRequest)

    if (httpResponse) {
      return httpResponse
    }

    const addUserValidation = await this.addUserValidator.validateAddUser(httpRequest.body)

    if (Object.keys(addUserValidation).length > 0) {
      return badRequest(new ObjectValidationError(addUserValidation))
    }

    return ok()
  }
}
