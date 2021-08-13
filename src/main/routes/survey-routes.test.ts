import { Collection } from 'mongodb'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let surveyCollection: Collection

describe('Survey Routes', () => {
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
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({}) // clean than collection
  })
  // ------------------------------------
  describe('POST /survey', () => {
    test('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'question',
          answers: [
            {
              image: 'https://images.example.com',
              answer: 'answer 1'
            },
            {
              answer: 'answer 2'
            }
          ]
        })
        .expect(204)
    })
  })
})
