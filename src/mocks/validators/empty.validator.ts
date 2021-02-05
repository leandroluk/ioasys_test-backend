import { IEmptyValidator } from '../../presentation/protocols/empty.validator.interface'

export class EmptyValidatorMock implements IEmptyValidator {
  async isEmpty(): Promise<boolean> {
    return await Promise.resolve(true)
  }
}
