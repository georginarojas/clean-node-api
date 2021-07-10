import { Request, Response, NextFunction } from 'express'

// Define of type response, in this case is json for default
export const contentType = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.type('json')

  next()
}
