import { InvalidParamError } from '../invalid-param.error'

describe('invalid-param.error', () => {
  it("should contains message field with 'invalid param' text", () => {
    const sut = new InvalidParamError('param')
    expect(sut.message).toMatch(InvalidParamError.REGEX_MATCH)
  })

  it('should contains message field with more info when is passed', () => {
    const sut = new InvalidParamError('param', 'more')
    expect(sut.message).toMatch(/.*more.*/)
  })
})
