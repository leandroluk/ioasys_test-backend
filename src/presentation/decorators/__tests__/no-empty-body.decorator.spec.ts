import { MissingParamError } from '../../../errors/missing-param.error'
import { throwFn } from '../../../mocks/helpers'
import { EmptyValidatorMock } from '../../../mocks/validators/empty.validator'
import { IController } from '../../protocols/controller.interface'
import { IEmptyValidator } from '../../protocols/empty.validator.interface'
import { HttpStatusCode, IHttpResponse } from '../../protocols/http.interface'
import { noEmptyBody } from '../no-empty-body.decorator'

const makeSut = (): {
  controller: IController
  emptyValidator: IEmptyValidator
} => {
  const emptyValidator = new EmptyValidatorMock()

  class Controller implements IController {
    @noEmptyBody(emptyValidator)
    async handle(): Promise<IHttpResponse> {
      return await Promise.resolve({
        statusCode: HttpStatusCode.ok
      })
    }
  }

  const controller = new Controller()

  return {
    controller,
    emptyValidator
  }
}

describe('noEmptyBody', () => {
  test('should build and return decorator', () => {
    const decorator = noEmptyBody(new EmptyValidatorMock())
    expect(decorator).toBeInstanceOf(Function)
  })

  test('should call IEmptyValidator', async () => {
    const { controller, emptyValidator } = makeSut()
    const isEmptySpy = jest.spyOn(emptyValidator, 'isEmpty')
    await controller.handle({})
    expect(isEmptySpy).toHaveBeenCalled()
  })

  test('should throw if IEmptyValidator throw', async () => {
    const { controller, emptyValidator } = makeSut()
    jest.spyOn(emptyValidator, 'isEmpty').mockImplementation(throwFn)
    await expect(controller.handle({})).rejects.toThrow()
  })

  test('should return bad request if no have body', async () => {
    const { controller, emptyValidator } = makeSut()
    jest.spyOn(emptyValidator, 'isEmpty').mockResolvedValue(true)
    const result = await controller.handle({})
    expect(result.statusCode).toBe(HttpStatusCode.badRequest)
    expect(result.body?.message).toMatch(MissingParamError.REGEX_MATCH)
  })

  test('should return ok if have body', async () => {
    const { controller, emptyValidator } = makeSut()
    jest.spyOn(emptyValidator, 'isEmpty').mockResolvedValue(false)
    const result = await controller.handle({ body: {} })
    expect(result.statusCode).toBe(HttpStatusCode.ok)
  })
})
