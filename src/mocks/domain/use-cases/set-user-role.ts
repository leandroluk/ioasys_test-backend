import { IDictionary } from '../../../domain/generics/dictionary.interface'
import { ISetUserRole, ISetUserRoleValidator } from '../../../domain/use-cases/set-user-role.interface'

export class SetUserRoleMock implements ISetUserRole {
  async setUserRole(): Promise<boolean> {
    return await Promise.resolve(true)
  }
}

export class SetUserRoleValidatorMock implements ISetUserRoleValidator {
  async validateSetUserRole(): Promise<IDictionary<Error>> {
    return await Promise.resolve({})
  }
}
