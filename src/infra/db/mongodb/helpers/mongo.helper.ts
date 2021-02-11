import { Collection, MongoClient, ObjectId } from 'mongodb'
import { UserRoleTypes } from '../../../../domain/models/user-role.interface'
import env from '../../../../main/config/env'

export interface MongoHelper_connectOptions {
  addGodUserSeed?: boolean
}

export const MongoSeed = {
  async addGodUser(client: MongoClient) {
    const godUser = {
      _created: { at: new Date(), by: 'script:addGodUserSeed' },
      email: 'god@email.com',
      username: 'god',
      password: '$2b$12$mS6vkCYGIt0CQhsiq4xZy.4d3lWXyusqCDs.MaG2TMMSWcqfuJUC6'
    }

    const db = client?.db()

    if (db) {
      const userCollection = db.collection(env.mongo.collections.users)

      if (!await userCollection.findOne({ username: godUser.username })) {
        const { insertedId } = await userCollection.insertOne(godUser)

        await db.collection(env.mongo.collections.userRoles)
          .insertOne({ _id: insertedId, role: UserRoleTypes.god })

        return true
      }
    }

    return false
  }
}

export const MongoHelper = {
  client: null as MongoClient,

  objectId(id?: string | ObjectId) {
    if (id instanceof ObjectId) {
      return id
    }
    return new ObjectId(id)
  },

  async connect(uri: string, options?: MongoHelper_connectOptions): Promise<MongoClient> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    if (options?.addGodUserSeed) {
      await MongoSeed.addGodUser(this.client)
    }

    return this.client
  },

  async disconnect(): Promise<void> {
    await this.client?.close()
  },

  getCollection(name: string): Collection {
    return (this.client as MongoClient).db().collection(name)
  },

  map<T = any>(doc: any): T {
    if ([null, undefined, ''].includes(doc)) {
      return undefined
    }
    const { _id, ...rest } = doc
    return { _id: _id?.toString(), ...rest }
  }
}
