import { IBearerTokenModel } from '../models/bearer-token.interface'

export interface IAuthUserModel {
  email: string
  password: string
}

export interface IAuthUser {
  authUser(data: IAuthUserModel): Promise<IBearerTokenModel>
}
