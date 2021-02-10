import { IUserModel, IUserWithPasswordModel } from '../models/user.interface'

export interface IGetUserByEmail {
  getUserByEmail<T = IUserModel | IUserWithPasswordModel>(email: IUserModel['email'], includePassword?: boolean): Promise<T>
}
