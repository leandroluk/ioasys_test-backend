import { MongoClient, ObjectId } from 'mongodb'
import env from '../../../../../main/config/env'
import { MongoHelper, MongoSeed } from '../mongo.helper'

describe('mongo.helper', () => {
  describe('MongoSeed', () => {
    describe('addGodUser', () => {
      it('should return false if no pass client', async () => {
        await expect(MongoSeed.addGodUser(undefined as any)).resolves.toBeFalsy()
      })

      it('should return false if no have db', async () => {
        const fakeClient: any = { db: jest.fn(() => undefined) }
        await expect(MongoSeed.addGodUser(fakeClient)).resolves.toBeFalsy()
      })

      it('should check if username of god exists on db', async () => {
        const fakeFindOne = jest.fn(() => true)
        const fakeClient: any = {
          db: () => ({
            collection: () => ({
              findOne: fakeFindOne
            })
          })
        }
        await MongoSeed.addGodUser(fakeClient)
        expect(fakeFindOne).toHaveBeenCalled()
      })
    })
  })

  describe('MongoHelper', () => {
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
        await MongoHelper.disconnect()
      })

      it('should run addGodUserSeed if is passed', async () => {
        await MongoHelper.connect(process.env.MONGO_URL)

        await Promise.all([
          MongoHelper.getCollection(env.mongo.collections.users).deleteMany({}),
          MongoHelper.getCollection(env.mongo.collections.userRoles).deleteMany({})
        ])

        await MongoHelper.disconnect()
        await MongoHelper.connect(process.env.MONGO_URL, {
          addGodUserSeed: true
        })

        // NOTE: this isn't a codesmell because when I disconnect previously I
        //       lose db access, so I have pull collection again
        const savedGodUser = await MongoHelper.getCollection(env.mongo.collections.users)
          .findOne({ username: 'god' })

        expect(savedGodUser).toBeDefined()
        await MongoHelper.disconnect()
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
        expect(MongoHelper.map('' as any)).toBeUndefined()
      })

      it('should return an object with field _id if an object is provided', () => {
        const keys = Object.keys(MongoHelper.map({}))
        expect(keys.includes('_id')).toBeTruthy()
      })
    })
  })
})
