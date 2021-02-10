import { MongoClient, ObjectId } from 'mongodb'
import { MongoHelper } from '../mongo.helper'

describe('mongo.helper', () => {
  describe('objectId', () => {
    it('should return mongo ObjectId if pass valid id', () => {
      const id = new ObjectId()
      expect(MongoHelper.objectId(id)).toBeDefined()
      expect(MongoHelper.objectId(id.toHexString())).toBeDefined()
    })
    it('should throw if wrong id is passed', () => {
      expect(() => MongoHelper.objectId('wrong')).toThrow()
    })
  })

  describe('connect', () => {
    it('should connect on mongodb', async () => {
      const client = await MongoHelper.connect(process.env.MONGO_URL)
      expect(client.db('jest')).toBeTruthy()
      await client.close()
    })
  })

  describe('disconnect', () => {
    it('should MongoClient.close is called', async () => {
      const closeSpy = jest.spyOn(MongoClient.prototype, 'close')
      await MongoHelper.connect(process.env.MONGO_URL)
      await MongoHelper.disconnect()
      expect(closeSpy).toHaveBeenCalled()
    })
  })

  describe('getCollection', () => {
    it('should return a collection', async () => {
      await MongoHelper.connect(process.env.MONGO_URL)
      const collection = MongoHelper.getCollection('test')
      expect(collection).toBeDefined()
      await MongoHelper.disconnect()
    })
  })

  describe('map<T>', () => {
    it("should return undefined if doc isn't passed", () => {
      expect(MongoHelper.map(null as any)).toBeUndefined()
      expect(MongoHelper.map(undefined as any)).toBeUndefined()
    })

    it('should return an object with field _id if an object is provided', () => {
      const keys = Object.keys(MongoHelper.map({}))
      expect(keys.includes('_id')).toBeTruthy()
    })
  })
})
