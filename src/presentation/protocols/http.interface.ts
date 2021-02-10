export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export interface IHttpRequest<Header = any, Body = any, Params = any, Query = any> {
  header?: Header
  body?: Body
  params?: Params
  query?: Query
}

export interface IHttpResponse<Header = any, Body = any> {
  statusCode: number
  header?: Header
  body?: Body
}
