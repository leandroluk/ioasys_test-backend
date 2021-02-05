export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500
}

export interface IHttpRequest<Header = any, Body = any> {
  header?: Header
  body?: Body
}

export interface IHttpResponse<Header = any, Body = any> extends IHttpRequest<Header, Body> {
  statusCode: number
}
