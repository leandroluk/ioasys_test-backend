import request from 'supertest'
import app from '../../config/app'

describe('content-type.middleware', () => {
  it('should return default content type as json', async () => {
    const url = '/test_content_type_json'

    app.get(url, (_, res) => res.send(''))

    await request(app)
      .get(url)
      .expect('content-type', /json/)
  })

  it('should return xml content type when forced', async () => {
    const url = '/test_content_type_xml'

    app.get(url, (_, res) => res.type('xml') && res.send(''))

    await request(app)
      .get(url)
      .expect('content-type', /xml/)
  })
})
