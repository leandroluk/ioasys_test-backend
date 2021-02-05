import jwt, { VerifyErrors } from 'jsonwebtoken'
import { IJwt } from '../../data/protocols/jwt.interface'
import { IBearerTokenModel } from '../../domain/models/bearer-token.interface'
import { IUserModel } from '../../domain/models/user.interface'

export class JwtAdapter implements IJwt {
  constructor(
    readonly secret: string,
    readonly hoursToExpire: number = 6
  ) {}

  async generate(data: IUserModel): Promise<IBearerTokenModel> {
    return await new Promise((resolve, reject) => {
      try {
        resolve({
          accessToken: jwt.sign(data, this.secret, { expiresIn: `${this.hoursToExpire}h` }),
          tokenType: 'bearer',
          expiresAt: new Date(Date.now() + this.hoursToExpire * 60 * 60 * 1000)
        })
      } catch (error) {
        reject(error)
      }
    })
  }

  async verify(accessToken: string): Promise<IUserModel> {
    return await new Promise(resolve => {
      jwt.verify(accessToken, this.secret, (_err: VerifyErrors | null, decoded: object | undefined) => {
        resolve(decoded as IUserModel)
      })
    })
  }
}
