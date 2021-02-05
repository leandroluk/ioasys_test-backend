import { IUserModel } from '../../domain/models/user.interface'
import {
  IAddUser,
  IAddUserModel
} from '../../domain/use-cases/add-user.interface'
import { IGetUserByEmail } from '../../domain/use-cases/get-user-by-email.interface'
import { IEncrypter } from '../protocols/encrypter.interface'

export class AddUserRepository implements IAddUser {
  constructor(
    readonly dbGetUserByEmail: IGetUserByEmail,
    readonly encrypter: IEncrypter,
    readonly dbAddUser: IAddUser
  ) {}

  async addUser(data: IAddUserModel): Promise<IUserModel> {
    throw new Error('Method not implemented.')
  }
}
