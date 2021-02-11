import { INoEmptyBodyValidator } from '../../../domain/use-cases/no-empty-body.interface'
import { IHttpRequest, IHttpResponse } from '../../../presentation/protocols/http.interface'

export class NoEmptyBodyValidatorMock implements INoEmptyBodyValidator {
  async noEmptyBodyValidate(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    return await Promise.resolve(null)
  }
}
