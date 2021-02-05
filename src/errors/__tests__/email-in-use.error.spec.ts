import { EmailInUseError } from '../email-in-use.error'

describe('email-in-use.error', () => {
  it('should return email in use error with passed email', () => {
    const sut = new EmailInUseError('foo@bar.com')
    expect(sut.message).toMatch(EmailInUseError.REGEX_MATCH)
    expect(sut.message).toMatch(/foo@bar\.com/)
  })
})
