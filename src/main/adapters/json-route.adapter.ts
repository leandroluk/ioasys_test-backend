import { Request, Response } from 'express'
import { IController } from '../../presentation/protocols/controller.interface'
import { IHttpRequest } from '../../presentation/protocols/http.interface'

export default (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      header: req.headers,
      body: req.body,
      params: req.params,
      query: req.query
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
