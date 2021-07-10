import { Collection, MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
dotenv.config()

export const MongoHelper = {
  // For to avoid conflicts syntax between the assign a value to an object in js
  // and define a type in typeScript, is necessary to define our object
  // in this way:
  client: null as unknown as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection

    return Object.assign({}, collectionWithoutId, { id: _id })
  }
}
