import { UserRoleTypes } from '../models/user-role.interface'

export interface ISetUserRoleModel {
  role: UserRoleTypes
}

export interface ISetUserRole {
  setUserRole(data: ISetUserRole): Promise<boolean>
}
