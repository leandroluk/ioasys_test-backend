import { IUserModel } from '../../domain/models/user.interface'
import {
  IAddUser,
  IAddUserModel
} from '../../domain/use-cases/add-user.interface'
import { IGetUserByEmail } from '../../domain/use-cases/get-user-by-email.interface'
import { EmailInUseError } from '../../errors/email-in-use.error'
import { IEncrypter } from '../protocols/encrypter.interface'

export class AddUserRepository implements IAddUser {
  constructor(
    readonly getUserByEmail: IGetUserByEmail,
    readonly encrypter: IEncrypter,
    readonly dbAddUser: IAddUser
  ) { }

  async addUser(data: IAddUserModel, by: string): Promise<IUserModel> {
    data = { ...data }

    const existingUser = await this.getUserByEmail.getUserByEmail(data.email)

    if (existingUser) {
      throw new EmailInUseError(data.email)
    }

    data.password = await this.encrypter.encrypt(data.password)

    return await this.dbAddUser.addUser(data, by)
  }
}
