import { IAddUserValidator } from '../../domain/use-cases/add-user.interface'
import { ObjectValidationError } from '../../errors/object-validation.error'
import { badRequest, ok } from '../helpers/http.helper'
import { IController } from '../protocols/controller.interface'
import { IHttpRequest, IHttpResponse } from '../protocols/http.interface'

export class SignUpController implements IController {
  constructor(readonly addUserValidator: IAddUserValidator) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { body } = httpRequest

    const addUserValidation = await this.addUserValidator.validateAddUser(body)

    if (Object.keys(addUserValidation).length > 0) {
      return badRequest(new ObjectValidationError(addUserValidation))
    }

    return ok()
  }
}
