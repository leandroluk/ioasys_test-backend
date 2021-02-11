import { IHttpRequest, IHttpResponse } from '../../presentation/protocols/http.interface'

export interface INoEmptyBodyValidator {
  noEmptyBodyValidate(httpRequest: IHttpRequest): Promise<IHttpResponse | null>
}
