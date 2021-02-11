import { Router } from 'express'
import jsonRouteAdapter from '../adapters/json-route.adapter'
import env from '../config/env'
import { makeSignUpController } from '../factories/sign-up.factory'

export default (router: Router): void => {
  router.post(env.routes.signUp, jsonRouteAdapter(makeSignUpController()))
}
