import { IBaseModel } from '../generics/base-model.interface'

export interface IUserModel extends IBaseModel {
  email: string
  username: string
}

export interface IUserWithPasswordModel extends IUserModel {
  password: string
}
