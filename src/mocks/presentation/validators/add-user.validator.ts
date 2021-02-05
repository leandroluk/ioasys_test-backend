import { IDictionary } from '../../../domain/generics/dictionary.interface'
import { IAddUserValidator } from '../../../domain/use-cases/add-user.interface'

export class AddUserValidatorMock implements IAddUserValidator {
  async validateAddUser(): Promise<IDictionary<Error>> {
    return await Promise.resolve({})
  }
}
