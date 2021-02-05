import { ObjectValidationError } from '../object-validation.error'

describe('object-validation.error', () => {
  test("should contains message field with 'object validation error' text", () => {
    const sut = new ObjectValidationError({})
    expect(sut.message).toMatch(ObjectValidationError.REGEX_MATCH)
  })

  test('should contains message field with more info when is passed', () => {
    const sut = new ObjectValidationError({}, 'more')
    expect(sut.message).toMatch(/.*more.*/)
  })

  test('should containe field error with dictionary of errors', () => {
    const error = new Error('error')
    const sut = new ObjectValidationError({ error })
    expect(sut.errors).toBeInstanceOf(Object)
    expect(Object.keys(sut.errors).length).toBe(1)
    expect(sut.errors.error.message).toBe(error.message)
  })
})
