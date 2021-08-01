import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers/http_helper'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { EmailValidator } from '../signup/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('email')))
        )
      }
      if (!password) {
        return await new Promise((resolve) =>
          resolve(badRequest(new MissingParamError('password')))
        )
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return await new Promise((resolve) =>
          resolve(badRequest(new InvalidParamError('email')))
        )
      }

      return new Promise((resolve) => resolve(serverError(new Error())))
    } catch (error) {
      return serverError(error)
    }
  }
}
