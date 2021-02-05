import { MissingParamError } from '../missing-param.error'

describe('missing-param.error', () => {
  test("should contains message field with 'missing param' text", () => {
    const sut = new MissingParamError('param')
    expect(sut.message).toMatch(MissingParamError.REGEX_MATCH)
  })

  test('should contains message field with more info when is passed', () => {
    const sut = new MissingParamError('param', 'more')
    expect(sut.message).toMatch(/.*more.*/)
  })
})
