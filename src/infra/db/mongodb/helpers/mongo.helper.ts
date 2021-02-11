import { Collection, MongoClient, ObjectId } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  objectId(id?: string | ObjectId) {
    if (id instanceof ObjectId) {
      return id
    }
    return new ObjectId(id)
  },

  async connect(uri: string): Promise<MongoClient> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
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
