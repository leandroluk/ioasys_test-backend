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
      message: 'TestError',
      name: 'TestError'
    }

    test('should transform errors into json object with only public properties', () => {
      const testError = new TestError('foo', 'bar')
      const result = errorToJson(testError)
      expect(result).toEqual(testErrorResult)
    })

    test("should no return property 'stack' when exists", () => {
      const testError = new TestError('foo', 'bar')
      testError.stack = 'stack'
      const error = new ObjectValidationError({ testError })
      const result = errorToJson(error)
      expect(result.stack).toBeUndefined()
      expect(result.errors.testError).toEqual(testErrorResult)
      expect(result.errors.testError.stack).toBeUndefined()
    })

    test('should return string if only message is passed', () => {
      const errorMessage = 'message'
      const result = errorToJson(errorMessage)
      expect(result).toEqual(errorMessage)
    })

    test('should return a simple object if a simple object is passed', () => {
      const errorObject = { name: 'name', field: 'field' }
      const result = errorToJson(errorObject)
      expect(result.name).toBeDefined()
      expect(result.field).toBe(errorObject.field)
    })

    test("should return a simple object with name of type if name isn't passed", () => {
      const errorObjectWithoutName = { field: 'field' }
      const result = errorToJson(errorObjectWithoutName)
      expect(result.name).toBeDefined()
      expect(result.field).toBe(errorObjectWithoutName.field)
    })
  })
})
