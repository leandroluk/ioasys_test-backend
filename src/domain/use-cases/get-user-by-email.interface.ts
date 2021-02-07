import { IUserModel } from '../models/user.interface'

export interface IGetUserByEmail {
  getUserByEmail(email: IUserModel['email'], includePassword?: boolean): Promise<IUserModel>
}
