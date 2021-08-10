import request from 'supertest'
import app from '../config/app'

describe('Body parser Middleware', () => {
  test('Should parse body as json', async () => {
    // Emulate a route for testing
    app.post('/test_body_parse', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parse')
      .send({ name: 'Georgina' })
      .expect({ name: 'Georgina' })
  })
})
