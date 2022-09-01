import Joi from "joi";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import {
  Route,
  Controller,
  Post,
  SuccessResponse,
  Tags,
  Response,
  Body,
  Example,
} from "tsoa";
import { ResultController } from "../../../shared/infrastructure/controllers/Controller";
import { LoginUserService } from "../../application/services/LoginUser.application";
import { UsersServicesTypes } from "../../application/services/users.services";
import { LoginUserDTO } from "../../domain/dtos/LoginUser.dto";
import { LoginUserToken } from "../../domain/dtos/LoginUserToken.dto";

type LoginUsersResponseDTO = ResultController<LoginUserToken | undefined>;

@Route("/api/users")
@Tags("Users")
@controller("/api/users")
export class LoginUserController extends Controller {
  constructor(
    @inject(UsersServicesTypes.LoginUserService)
    private loginUserService: LoginUserService
  ) {
    super();
  }

  @httpPost("/login")
  @Response<LoginUsersResponseDTO>(400, "Bad Request")
  @SuccessResponse("200", "Users login", "application/json")
  @Example<LoginUsersResponseDTO>({
    status: true,
    reason: "success",
    data: { token: "asdasdasdasdas%$%&$##" },
  })
  @Post("/login")
  async handler(
    @Body() requestBody: LoginUserDTO
  ): Promise<LoginUsersResponseDTO> {
    await BodyLoginSchema.validateAsync(requestBody);
    const [ok, token] = await this.loginUserService.execute(requestBody);
    if (!ok) {
      this.setStatus(401);
      return {
        status: false,
        reason: "Login Failed",
      };
    }

    this.setStatus(200);
    return {
      status: ok,
      reason: "success",
      data: token,
    };
  }
}

export const BodyLoginSchema = Joi.object({
  login: Joi.string().required(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
});
