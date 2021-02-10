import { NextFunction, Request, Response } from 'express'

export default (req: Request, _res: Response, next: NextFunction): void => {
  req.headers = Object
    .entries(req.headers)
    .reduce((obj, [key, value]) => ({
      ...obj,
      [key.toLowerCase()]: value
    }), {}) as any
  next()
}
