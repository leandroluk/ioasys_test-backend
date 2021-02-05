import { StringValidator } from '../string.validator'

describe('string.validator', () => {
  const sut = new StringValidator()

  describe('isString', () => {
    it('should return true if is string', async () => {
      const stringValues = ['', 'a', '1', 'true', '()=>{}']
      for (const value of stringValues) {
        await expect(sut.isString(value)).resolves.toBeTruthy()
      }
    })

    it("should return false if isn't string", async () => {
      const noStringValues = [true, false, { a: 1 }, [1], () => {}, function () {}, 1, 1n]
      for (const value of noStringValues) {
        await expect(sut.isString(value)).resolves.toBeFalsy()
      }
    })
  })
})
