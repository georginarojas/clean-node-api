import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import {
  Controller,
  HttpRequest,
  HttpResponse
} from '../../presentation/protocols'

// Decorator pattern
/*
  This class was applied because we need to save in DB the logs of our app
*/
export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepository: LogErrorRepository
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse.statusCode === 500) {
      await this.logErrorRepository.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
