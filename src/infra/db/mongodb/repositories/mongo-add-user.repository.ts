import { UserRoleTypes } from '../../../../domain/models/user-role.interface'
import { IUserModel } from '../../../../domain/models/user.interface'
import { IAddUser, IAddUserModel } from '../../../../domain/use-cases/add-user.interface'
import env from '../../../../main/config/env'
import { MongoHelper } from '../helpers/mongo.helper'

export class MongoAddUserRepository implements IAddUser {
  async addUser(userData: IAddUserModel, by: string): Promise<IUserModel> {
    const { passwordConfirmation, ...restOfUserData } = userData
    const data = {
      ...restOfUserData,
      _created: { at: new Date(), by }
    }

    const userCollection = MongoHelper.getCollection(env.mongo.collections.users)
    const userRoleCollection = MongoHelper.getCollection(env.mongo.collections.userRoles)

    // add user
    const userResult = await userCollection.insertOne(data)
    const { password, ...userWithoutPassword } = userResult.ops[0]

    // add default role of user
    await userRoleCollection.insertOne({
      _id: (userWithoutPassword as IUserModel)._id,
      role: UserRoleTypes.user
    })

    return MongoHelper.map<IUserModel>(userWithoutPassword)
  }
}
