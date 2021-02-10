import request from 'supertest'
import app from '../../config/app'

describe('header-parser.middleware', () => {
  it('should return lowercase headers', async () => {
    const url = '/test-header-parser'

    app.get(url, (req, res) => res.send(req.headers))

    const result = await request(app)
      .get(url)
      .set('X-TEST', 'TEST')

    expect(result.body['x-test']).toBeTruthy()
  })
})
