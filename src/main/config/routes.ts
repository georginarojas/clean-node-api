import { Express, Router } from 'express'
import fg from 'fast-glob'
// import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // Add dynamically all the files *routes.ts
  const dir = `${__dirname}` + '/../routes/**routes.??'
  fg.sync(dir).map(async file => (await import(file)).default(router))
  // Another way
  /*
  readdirSync(dir).map(async file => {
    if (!file.includes('.test.')) {
      (await import(file)).default(router)
    }
  })
  */
}
