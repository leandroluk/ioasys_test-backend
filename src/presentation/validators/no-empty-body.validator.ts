import { INoEmptyBodyValidator } from '../../domain/use-cases/no-empty-body.interface'
import { MissingParamError } from '../../errors/missing-param.error'
import { badRequest } from '../helpers/http.helper'
import { IEmptyValidator } from '../protocols/empty.validator.interface'
import { IHttpResponse } from '../protocols/http.interface'

export class NoEmptyBodyValidator implements INoEmptyBodyValidator {
  constructor(
    readonly emptyValidator: IEmptyValidator
  ) { }

  async noEmptyBodyValidate(httpRequest): Promise<IHttpResponse | null> {
    if (await this.emptyValidator.isEmpty(httpRequest.body)) {
      return badRequest(new MissingParamError('body'))
    }
    return null
  }
}
