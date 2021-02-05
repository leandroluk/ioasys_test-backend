import { IUserWithPasswordModel } from '../../../domain/models/user.interface'
import { IGetUserByEmail } from '../../../domain/use-cases/get-user-by-email.interface'

export class GetUserByEmailMock implements IGetUserByEmail {
  async getUserByEmail(): Promise<IUserWithPasswordModel> {
    return await Promise.resolve({
      _id: '_id',
      _created: { at: new Date(), by: 'by' },
      email: 'a@a.com',
      username: 'username',
      password: 'password'
    })
  }
}
