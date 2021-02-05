import { MissingParamError } from '../../errors/missing-param.error'
import { EmptyValidator } from '../../validators/empty.validator'
import { badRequest } from '../helpers/http.helper'
import { IController } from '../protocols/controller.interface'
import { IEmptyValidator } from '../protocols/empty.validator.interface'
import { IHttpRequest, IHttpResponse } from '../protocols/http.interface'

export function noEmptyBody(
  emptyValidator: IEmptyValidator = new EmptyValidator()
): Function {
  let IController_handle: IController['handle']

  return (
    _target: any,
    _propertyKey: any,
    descriptor: TypedPropertyDescriptor<typeof IController_handle>
  ) => {
    const originalMethod = descriptor.value

    descriptor.value = async function (
      httpRequest: IHttpRequest
    ): Promise<IHttpResponse> {
      return await emptyValidator.isEmpty(httpRequest.body)
        ? badRequest(new MissingParamError('body'))
        : originalMethod?.bind(this, httpRequest)()
    }

    return descriptor
  }
}
