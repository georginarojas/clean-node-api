import { Express, Router } from 'express'
import fg from 'fast-glob'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)
  // Add dynamically all the files *routes.ts
  fg.sync('**/src/main/routes/**routes.ts').map(async file => {
    // Import each route from routes directory
    const route = (await import(`../../../${file}`)).default
    route(router)
  })
}
