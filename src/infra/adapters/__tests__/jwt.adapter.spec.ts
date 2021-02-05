import jwt from 'jsonwebtoken'
import { IJwt } from '../../../data/protocols/jwt.interface'
import { IUserModel } from '../../../domain/models/user.interface'
import { throwFn } from '../../../mocks/helpers'
import { JwtAdapter } from '../jwt.adapter'

const makeStut = (
  hoursToExpire = 6
): {
  hoursToExpire: number
  sut: IJwt
  data: IUserModel
  accessToken: string
} => {
  const sut = new JwtAdapter('secret', hoursToExpire)
  const data: IUserModel = {
    _id: '_id',
    _created: { at: new Date(), by: 'by' },
    email: 'email',
    username: 'username'
  }
  const accessToken = jwt.sign(data, 'secret', { expiresIn: `${hoursToExpire}h` })

  return {
    hoursToExpire,
    sut,
    data,
    accessToken
  }
}

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'token'
  },
  verify(_data: any, _secret: any, cb: (err: Error | null, value: any) => void): void {
    return cb(null, { key: 'value' })
  }
}))

describe('JwtTokenAdapter', () => {
  describe('generate', () => {
    it('should call jwt with correct values', async () => {
      const { sut, hoursToExpire, data } = makeStut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.generate(data)

      expect(signSpy).toHaveBeenCalledWith(data, 'secret', { expiresIn: `${hoursToExpire}h` })
    })

    it('should return a bearer token on success', async () => {
      const { sut, data } = makeStut()
      const result = await sut.generate(data)

      expect(result.accessToken).toBe('token')
      expect(result.tokenType).toBe('bearer')
      expect(result.expiresAt).toBeDefined()
    })

    it('should throw if jwt throws', async () => {
      const { sut, data } = makeStut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwFn)
      await expect(sut.generate(data)).rejects.toThrow()
    })
  })

  describe('verify', () => {
    jest.resetAllMocks()
    it('should return jwt data if jwt return jwt data', async () => {
      const { sut, accessToken } = makeStut()

      const result: any = await sut.verify(accessToken)
      expect(result.key).toBe('value')
    })
  })
})
