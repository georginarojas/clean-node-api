import { badRequest } from '../../../helpers/http/http_helper'
import {
  AddSurvey,
  Controller,
  HttpRequest,
  HttpResponse,
  Validation
} from './add-survey-controller-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
    this.validation = validation
    this.addSurvey = addSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { question, answers } = httpRequest.body
    await this.addSurvey.add({ question, answers })

    return await new Promise<HttpResponse>((resolve) =>
      resolve(null as unknown as HttpResponse)
    )
  }
}
