import { IBearerTokenModel } from '../../domain/models/bearer-token.interface'
import { IUserModel } from '../../domain/models/user.interface'

export interface IJwt {
  generate(user: IUserModel): Promise<IBearerTokenModel>
  verify(accessToken: string): Promise<IUserModel>
}
