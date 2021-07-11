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
  private readonly controller: Controller
  constructor (controller: Controller) {
    this.controller = controller
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    return httpResponse
  }
}
