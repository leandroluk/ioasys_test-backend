import { IUserModel } from '../../../../domain/models/user.interface'
import { IAddUser, IAddUserModel } from '../../../../domain/use-cases/add-user.interface'
import env from '../../../../main/config/env'
import { MongoHelper } from '../helpers/mongo.helper'

export class MongoAddUserRepository implements IAddUser {
  async addUser(userData: IAddUserModel, by: string): Promise<IUserModel> {
    const userCollection = MongoHelper.getCollection(env.mongo.collections.users)
    const data = {
      ...userData,
      _created: { at: new Date(), by }
    }
    const result = await userCollection.insertOne(data)
    const { password, ...userWithoutPassword } = result.ops[0]
    return MongoHelper.map<IUserModel>(userWithoutPassword)
  }
}
