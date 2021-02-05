import { IUserModel } from '../../../domain/models/user.interface'
import { IAddUser } from '../../../domain/use-cases/add-user.interface'

export class AddUserMock implements IAddUser {
  async addUser(): Promise<IUserModel> {
    return await Promise.resolve({
      _id: '_id',
      _created: { at: new Date(), by: 'by' },
      email: 'a@a.com',
      username: 'username'
    })
  }
}
