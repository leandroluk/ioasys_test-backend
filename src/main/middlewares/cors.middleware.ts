import { NextFunction, Request, Response } from 'express'
import env from '../config/env'

export default (_req: Request, res: Response, next: NextFunction): void => {
  res.set('access-control-allow-origin', env.app.corsControlAllowOrigin)
  res.set('access-control-allow-methods', '*')
  res.set('access-control-allow-headers', '*')
  next()
}
