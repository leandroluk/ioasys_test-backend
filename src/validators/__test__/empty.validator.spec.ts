import { EmptyValidator } from '../empty.validator'

describe('empty.validator', () => {
  it('should return false if not empty', async () => {
    const sut = new EmptyValidator()
    const invalid = [1, 1.1, true, function () {}, (f: any) => f]
    for (const value of invalid) {
      await expect(sut.isEmpty(value)).resolves.toBeFalsy()
    }
  })

  it('should return true if is empty', async () => {
    const sut = new EmptyValidator()
    const valid = [undefined, null, '', {}, []]
    for (const value of valid) {
      await expect(sut.isEmpty(value)).resolves.toBeTruthy()
    }
  })
})
