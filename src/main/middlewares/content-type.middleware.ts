
import { NextFunction, Request, Response } from 'express'

export default (_req: Request, res: Response, next: NextFunction): void => {
  res.type('json')
  next()
}
