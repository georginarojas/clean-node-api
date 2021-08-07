import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../../presentation/protocols'
import { Request, Response, RequestHandler } from 'express'

// This function allow uncouple the express of the app
// This adapter couple the express http call (req, res) with our controller (httpRequest)
export const adaptRoute = (controller: Controller): RequestHandler => {
  // Is asynchronous because the handle method of controller.
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }
    const httpResponse: HttpResponse = await controller.handle(httpRequest)

    if (httpResponse.statusCode === 200) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res
        .status(httpResponse.statusCode)
        .json({ error: httpResponse.body.message })
    }
  }
}
