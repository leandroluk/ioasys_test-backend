import { IModel } from '../generics/model.interface'

export interface IUserModel extends IModel {
  email: string
  username: string
}

export interface IUserWithPasswordModel extends IUserModel{
  password: string
}
