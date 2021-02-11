import { ObjectValidationError } from '../../../errors/object-validation.error'
import { errorToJson } from '../error.helper'

describe('error.helper', () => {
  describe('errorToJson', () => {
    class TestError extends Error {
      constructor(readonly foo: string, readonly bar: string) {
        super('TestError')
        Object.setPrototypeOf(this, TestError.prototype)
      }
    }
    const testErrorResult = {
      bar: 'bar',
      foo: 'foo',
      message: 'TestError'
    }

    it('should transform errors into json object with only public properties', () => {
      const testError = new TestError('foo', 'bar')
      const result = errorToJson(testError)
      expect(result).toEqual(testErrorResult)
    })

    it("should no return property 'stack' when exists", () => {
      const testError = new TestError('foo', 'bar')
      testError.stack = 'stack'
      const error = new ObjectValidationError({ testError })
      const result = errorToJson(error)
      expect(result.stack).toBeUndefined()
      expect(result.errors.testError).toEqual(testErrorResult)
      expect(result.errors.testError.stack).toBeUndefined()
    })

    it('should return string if only message is passed', () => {
      const errorMessage = 'message'
      const result = errorToJson(errorMessage)
      expect(result).toEqual(errorMessage)
    })

    it('should return a simple object if a simple object is passed', () => {
      const errorObject = { field: 'field' }
      const result = errorToJson(errorObject)
      expect(result.name).toBeUndefined()
      expect(result.field).toBe(errorObject.field)
    })

    it("should return a simple object with name of type if name isn't passed", () => {
      const errorObjectWithoutName = { field: 'field' }
      const result = errorToJson(errorObjectWithoutName)
      expect(result.name).toBeUndefined()
      expect(result.field).toBe(errorObjectWithoutName.field)
    })
  })
})
