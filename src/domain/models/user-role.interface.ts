import { IBaseModel } from '../generics/base-model.interface'

export enum UserRoleTypes {
  user = 'user',
  admin = 'admin',
  god = 'god'
}

export interface IUserRoleModel extends IBaseModel {
  role: UserRoleTypes
}
