import { IEncrypter } from '../../../data/protocols/encrypter.interface'

export class EncrypterMock implements IEncrypter {
  async compare(): Promise<boolean> {
    return await Promise.resolve(true)
  }

  async encrypt(): Promise<string> {
    return await Promise.resolve('hashed')
  }
}
