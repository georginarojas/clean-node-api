import { Express, Router } from 'express'
import { readdirSync } from 'fs'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // Add dynamically all the files *routes.ts
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => {
  //   // Import each route from routes directory
  //   const route = (await import(`../../../${file}`)).default
  //   route(router)
  // })
  const dir = `${__dirname}` + '/../routes'
  readdirSync(dir).map(async file => {
    if (!file.includes('.test.')) {
      (await import(`../routes/${file}`)).default(router)
    }
  })
}
