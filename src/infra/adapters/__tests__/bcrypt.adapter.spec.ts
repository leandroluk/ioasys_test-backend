import bcrypt from 'bcrypt'
import { IEncrypter } from '../../../data/protocols/encrypter.interface'
import { BcryptAdapter } from '../bcrypt.adapter'

const makeStut = (): {
  salt: number
  sut: IEncrypter
} => {
  const salt = 12
  const sut = new BcryptAdapter(salt)

  return {
    salt,
    sut
  }
}

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return await Promise.resolve('hashed')
  },
  async compare(a: string, b: string): Promise<boolean> {
    return await Promise.resolve(a === b)
  }
}))

describe('bcrypt.adapter', () => {
  describe('encrypt', () => {
    it('should call bcrypt.hash with correct values', async () => {
      const { sut, salt } = makeStut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.encrypt('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    it('should return a hash on success', async () => {
      const { sut } = makeStut()
      const hash = await sut.encrypt('any_value')
      expect(hash).toBe('hashed')
    })

    it('should throw if bcrypt.hash throws', async () => {
      const { sut } = makeStut()
      jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error())
      await expect(sut.encrypt('any_value')).rejects.toThrow()
    })
  })

  describe('compare', () => {
    it('should call bcrypt.compare with correct values', async () => {
      const { sut } = makeStut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare('a', 'b')
      expect(compareSpy).toHaveBeenCalledWith('a', 'b')
    })

    it('should return true if success', async () => {
      const { sut } = makeStut()
      await expect(sut.compare('a', 'a')).resolves.toBeTruthy()
    })

    it('should throw if bycript throws', async () => {
      const { sut } = makeStut()
      jest.spyOn(bcrypt, 'compare').mockRejectedValue(new Error())
      await expect(sut.compare('a', 'a')).rejects.toThrow()
    })
  })
})
