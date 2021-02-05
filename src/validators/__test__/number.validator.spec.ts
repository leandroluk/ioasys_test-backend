import { NumberValidator } from '../number.validator'

describe('number.validator', () => {
  const sut = new NumberValidator()

  describe('isNumber', () => {
    test('should return true if is number', async () => {
      const numberValues = [-1, 0, 1, 1.1, 1n, 0x1, 0o1, 0b1]
      for (const value of numberValues) {
        await expect(sut.isNumber(value)).resolves.toBeTruthy()
      }
    })

    test("should return false if isn't number", async () => {
      const noNumberValues = ['a', true, false, '', { a: 1 }, [1], () => {}, function () {}]
      for (const value of noNumberValues) {
        await expect(sut.isNumber(value)).resolves.toBeFalsy()
      }
    })
  })
})
