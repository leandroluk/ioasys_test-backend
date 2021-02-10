import request from 'supertest'
import app from '../../config/app'
import env from '../../config/env'

describe('cors.middleware', () => {
  it('should enable cors', async () => {
    const url = '/test-cors'

    app.get(url, (_, res) => res.send())

    await request(app)
      .get(url)
      .expect('access-control-allow-origin', env.app.corsControlAllowOrigin)
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
