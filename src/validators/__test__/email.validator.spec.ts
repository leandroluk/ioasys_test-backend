import validator from 'validator'
import { throwFn } from '../../mocks/helpers'
import { EmailValidator } from '../email.validator'

describe('EmailValidator', () => {
  const sut = new EmailValidator()

  describe('isEmail', () => {
    it('should return false if invalid email is provided', async () => {
      const invalid = [
        '', 1, true,
        {}, [], function () {}, (f: any) => f,
        'a', 'a@', 'a@a', 'a@a.c', 'a a@a.com', 'a@a.123'
      ]

      for (const value of invalid) {
        await expect(sut.isEmail(value as any)).resolves.toBeFalsy()
      }
    })

    it('should return true if a valid email is provided', async () => {
      const valid = [
        'a@a.com', 'foo@bar.com', 'a@a.com.br'
      ]

      for (const value of valid) {
        await expect(sut.isEmail(value)).resolves.toBeTruthy()
      }
    })

    it('should return false if validator throws', async () => {
      const isEmailSpy = jest.spyOn(validator, 'isEmail').mockImplementation(throwFn)
      const result = await sut.isEmail('any@email.com')
      expect(isEmailSpy).toHaveBeenCalled()
      expect(result).toBeFalsy()
    })
  })
})
