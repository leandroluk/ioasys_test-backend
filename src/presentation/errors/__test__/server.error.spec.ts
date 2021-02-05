import { ServerError } from '../server.error'

describe('server.error', () => {
  test("should contains message field with 'server error' text", () => {
    const sut = new ServerError()
    expect(sut.message).toMatch(ServerError.REGEX_MATCH)
  })

  test('should contains message field with more info when is passed', () => {
    const sut = new ServerError('more')
    expect(sut.message).toMatch(/.*more.*/)
  })
})
