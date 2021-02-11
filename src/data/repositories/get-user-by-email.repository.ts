import { IUserModel, IUserWithPasswordModel } from '../../domain/models/user.interface'
import { IGetUserByEmail } from '../../domain/use-cases/get-user-by-email.interface'

export class GetUserByEmailRepository implements IGetUserByEmail {
  constructor(
    readonly dbGetUserByEmail: IGetUserByEmail
  ) { }

  async getUserByEmail<T = IUserModel | IUserWithPasswordModel>(
    email: IUserModel['email'],
    includePassword?: boolean
  ): Promise<T> {
    return await this.dbGetUserByEmail.getUserByEmail<T>(email, includePassword)
  }
}
