import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http_helper'
import { AuthMiddleware } from './auth-middleware'

interface SutTypes{
  sut: AuthMiddleware
}

const makeSut = (): SutTypes => {
  const sut = new AuthMiddleware()

  return {
    sut
  }
}

describe('Auht Middleware', () => {
  test('should return 403 of no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
