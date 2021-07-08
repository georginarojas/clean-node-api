import {
  HttpResponse,
  HttpRequest,
  Controller,
  EmailValidator,
  AddAccount
} from './signup-protocols'
import { MissingParamError, InvalidParamError } from '../../errors'
import { badRequest, ok, serverError } from '../../helpers/http_helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount
  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // if (!httpRequest.body.name) {
      //   return badRequest(new MissingParamError('name'))
      // }
      // if (!httpRequest.body.email) {
      //   return badRequest(new MissingParamError('email'))
      // }

      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { name, email, password, passwordConfirmation } = httpRequest.body

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (error) {
      return serverError()
    }
  }
}
