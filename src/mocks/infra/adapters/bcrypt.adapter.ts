import bcrypt from 'bcrypt'
import { IEncrypter } from '../../../data/protocols/encrypter.interface'

export class BcryptAdapter implements IEncrypter {
  constructor(readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, hashed: string): Promise<boolean> {
    return await bcrypt.compare(value, hashed)
  }
}
