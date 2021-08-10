import { MongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  // Connect and disconnect the mongodb
  beforeAll(async () => {
    const uri = process.env.MONGO_URL as string
    await sut.connect(uri)
  })

  afterAll(async () => {
    await sut.disconnect()
  })
  // -----------------------------------
  // Clear the db table's
  // beforeEach(async () => {
  //   const accountCollection = await sut.getCollection('accounts')
  //   await accountCollection.deleteMany({}) // clean than collection
  // })
  // ------------------------------------

  test('Should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
