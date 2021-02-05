import { IUserModel } from '../models/user.interface'

export interface IGetUserByEmail {
  getUserByEmail(email: string, includePassword?: boolean): Promise<IUserModel>
}
