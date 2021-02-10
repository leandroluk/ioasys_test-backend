import request from 'supertest'
import app from '../../config/app'

describe('bodyParser', () => {
  test('should should parse body as json', async () => {
    const url = '/test-body-parser'
    const data = { name: 'test' }

    app.post(url, (req, res) => res.send(req.body))

    await request(app).post(url).send(data).expect(data)
  })
})
