import { interfaces, controller, httpGet } from "inversify-express-utils";

@controller("/ping")
export class PingController implements interfaces.Controller {
  @httpGet("/")
  async handler(): Promise<any> {
    return { status: "ok", message: "pong 2.0" };
  }
}
