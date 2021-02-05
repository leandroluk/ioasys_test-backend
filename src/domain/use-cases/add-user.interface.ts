import { IDictionary } from '../generics/dictionary.interface'
import { IUserModel } from '../models/user.interface'

export interface IAddUserModel {
  email: string
  username: string
  password: string
  passwordConfirmation: string
}

export interface IAddUser {
  addUser(data: IAddUserModel): Promise<IUserModel>
}

export interface IAddUserValidator {
  validateAddUser(data: IAddUserModel): Promise<IDictionary<Error>>
}
