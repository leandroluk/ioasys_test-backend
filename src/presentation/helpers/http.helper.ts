import { ServerError } from '../errors/server.error'
import { HttpStatusCode, IHttpResponse } from '../protocols/http.interface'
import { errorToJson } from './error.helper'

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  header: {},
  body: errorToJson(error)
})

export const unauthorized = (error: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.unauthorized,
  header: {},
  body: errorToJson(error)
})

export const serverError = (more?: string): IHttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  header: {},
  body: errorToJson(new ServerError(more))
})

export const created = <Header = any, Body = any>(header: Header = {} as any, body: Body = {} as any): IHttpResponse<Header, Body> => ({
  statusCode: HttpStatusCode.created,
  header,
  body
})

export const ok = <Header = any, Body = any>(header: Header = {} as any, body: Body = {} as any): IHttpResponse<Header, Body> => ({
  statusCode: HttpStatusCode.ok,
  header,
  body
})

export const notFound = (error?: Error): IHttpResponse => ({
  statusCode: HttpStatusCode.notFound,
  header: {},
  body: error ? errorToJson(error) : null
})
