import Joi from "joi";
import { LoginUserService } from "../../../application/services/users/LoginUser.application";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UsersServicesTypes } from "../../../application/services/users/users.services";
import {
  Route,
  Controller,
  Post,
  SuccessResponse,
  Tags,
  Response,
  Body,
} from "tsoa";
import { ResultController } from "../Controller";
import { LoginUserDTO } from "../../../domain/users/LoginUser.domain";
import { LoginUserToken } from "../../../domain/users/LoginUserToken.domain";

type LoginUsersResponseDTO = ResultController<{
  token: LoginUserToken | undefined;
}>;

@Route("/users")
@Tags("Users")
@controller("/users")
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
      data: { token: token },
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
