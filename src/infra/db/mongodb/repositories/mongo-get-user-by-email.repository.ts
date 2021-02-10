import { IUserModel, IUserWithPasswordModel } from '../../../../domain/models/user.interface'
import { IGetUserByEmail } from '../../../../domain/use-cases/get-user-by-email.interface'
import env from '../../../../main/config/env'
import { MongoHelper } from '../helpers/mongo.helper'

export class MongoGetUserByEmailRepository implements IGetUserByEmail {
  async getUserByEmail<T = IUserModel | IUserWithPasswordModel>(
    email: IUserModel['email'],
    includePassword?: boolean
  ): Promise<T> {
    const userCollection = MongoHelper.getCollection(env.mongo.collections.users)
    const user = await userCollection.findOne({ email })

    if (user) {
      if (!includePassword) {
        delete user.password
      }

      return MongoHelper.map<T>(user)
    }

    return null
  }
}
