import { interfaces, controller, httpGet } from "inversify-express-utils";
import { Get, Response, Route, Tags } from "tsoa";

interface PingResponseBody {
  status: string;
  message: string;
  datetime: Date;
}

@controller("/ping")
@Tags("Health Checker")
@Route("/ping")
export class PingController implements interfaces.Controller {
  /**
   * Health checker
   * @returns PingResponseBody
   * @summary Health checker
   */
  @Get("/")
  @Response<PingResponseBody>("200", "Health Check", {
    status: "ok",
    message: "pong 3.0",
    datetime: new Date(),
  })
  @httpGet("/")
  async handler(): Promise<PingResponseBody> {
    return { status: "ok", message: "pong 2.0", datetime: new Date() };
  }
}
