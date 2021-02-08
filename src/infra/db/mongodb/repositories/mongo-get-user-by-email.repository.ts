import { IUserModel, IUserWithPasswordModel } from '../../../../domain/models/user.interface'
import { IGetUserByEmail } from '../../../../domain/use-cases/get-user-by-email.interface'

export class MongoGetUserByEmailRepository implements IGetUserByEmail {
  async getUserByEmail(
    email: IUserModel['email'],
    includePassword?: boolean
  ): Promise<IUserModel | IUserWithPasswordModel> {
    throw new Error('Method not implemented.')
  }
}
