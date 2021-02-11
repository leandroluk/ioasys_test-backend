import { IBaseModel } from '../generics/base-model.interface'
import { IDictionary } from '../generics/dictionary.interface'
import { UserRoleTypes } from '../models/user-role.interface'

export interface ISetUserRoleModel {
  user_id: IBaseModel['_id']
  role: UserRoleTypes
}

export interface ISetUserRole {
  setUserRole(data: ISetUserRoleModel): Promise<boolean>
}


export interface ISetUserRoleValidator {
  validateSetUserRole(data: ISetUserRoleModel): Promise<IDictionary<Error>>
}
