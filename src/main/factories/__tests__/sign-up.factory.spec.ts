import { makeSignUpController } from '../sign-up.factory'

describe('sign-up.factory', () => {
  it('should create SignUpController', () => {
    const signUpController = makeSignUpController()
    expect(signUpController).toBeDefined()
  })
})
