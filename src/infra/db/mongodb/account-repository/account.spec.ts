import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
import * as dotenv from 'dotenv'
dotenv.config()

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Account Mongo Repository', () => {
  // Connect and disconnect the mongodb
  beforeAll(async () => {
    const uri = process.env.MONGO_URL as string
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })
  // -----------------------------------
  // Clear the db table's
  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({}) // clean than collection
  })
  // ------------------------------------

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy() // Not null
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })
})
