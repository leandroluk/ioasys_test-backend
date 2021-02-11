import { ISetUserRole, ISetUserRoleModel } from '../../domain/use-cases/set-user-role.interface'

export class SetUserRoleRepository implements ISetUserRole {
  constructor(
    readonly dbSetUserRole: ISetUserRole
  ) { }

  async setUserRole(data: ISetUserRoleModel): Promise<boolean> {
    return await this.dbSetUserRole.setUserRole(data)
  }
}
