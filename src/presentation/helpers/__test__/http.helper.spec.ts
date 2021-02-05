import { badRequest, created, notFound, ok, serverError, unauthorized } from '../http.helper'

describe('http.helper', () => {
  describe('badRequest', () => {
    it('should return http response with status 400', () => {
      const sut = badRequest(new Error())
      expect(sut.statusCode).toBe(400)
    })
  })

  describe('unauthorized', () => {
    it('should return http response with status 401', () => {
      const sut = unauthorized(new Error())
      expect(sut.statusCode).toBe(401)
    })
  })

  describe('serverError', () => {
    it('should return http response with status 500', () => {
      const sut = serverError()
      expect(sut.statusCode).toBe(500)
    })
  })

  describe('created', () => {
    it('should return http response with status 201', () => {
      const sut = created()
      expect(sut.statusCode).toBe(201)
    })
  })

  describe('ok', () => {
    it('should return http response with status 200', () => {
      const sut = ok({})
      expect(sut.statusCode).toBe(200)
    })
  })

  describe('notFound', () => {
    it('should return http response with status 404', () => {
      const sut = notFound()
      expect(sut.statusCode).toBe(404)
    })

    it('should return with error parsed if is passed', () => {
      const sut = notFound(new Error('test'))
      expect(sut.body.message).toMatch(/test/)
    })
  })
})
