import { throwFn } from '../helpers'
describe('helpers', () => {
  describe('throwFn', () => {
    test('should throw error', () => {
      expect(throwFn).toThrow()
    })
  })
})
