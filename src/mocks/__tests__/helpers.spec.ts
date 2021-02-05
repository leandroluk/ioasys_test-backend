import { throwFn } from '../helpers'
describe('helpers', () => {
  describe('throwFn', () => {
    it('should throw error', () => {
      expect(throwFn).toThrow()
    })
  })
})
