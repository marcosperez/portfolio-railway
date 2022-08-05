import Joi from "joi";
import { RegisterUserService } from "../../../application/services/users/RegisterUser.application";
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
  Example,
} from "tsoa";
import { ResultController } from "../Controller";
import { User } from "../../../domain/users/User.domain";
import { RegisterUserDTO } from "../../../domain/users/RegisterUser.domain";

type RegisterUsersResponseDTO = ResultController<{
  user: Partial<User> | undefined;
}>;

@Route("/users")
@Tags("Users")
@controller("/users")
export class RegisterUserController extends Controller {
  constructor(
    @inject(UsersServicesTypes.RegisterUserService)
    private registerUserService: RegisterUserService
  ) {
    super();
  }
  @httpPost("/register")
  @Response<RegisterUsersResponseDTO>(400, "Bad Request")
  @SuccessResponse("200", "Register User", "application/json")
  @Example<RegisterUsersResponseDTO>({
    status: true,
    reason: "exito",
  })
  @Post("/register")
  async handler(
    @Body() requestBody: RegisterUserDTO
  ): Promise<RegisterUsersResponseDTO> {
    await BodyRegisterSchema.validateAsync(requestBody);
    const [ok, user] = await this.registerUserService.execute(requestBody);

    if (!ok) {
      this.setStatus(404);
      return {
        status: false,
        reason: "Error en creacion de usuario",
      };
    }
    this.setStatus(200);
    return {
      status: ok,
      data: {
        user: {
          id: user?.id,
          name: user?.name,
          username: user?.username,
          email: user?.email,
        },
      },
    };
  }
}

export const BodyRegisterSchema = Joi.object({
  id: Joi.forbidden(),
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required(),
  passwordConfirmation: Joi.any().valid(Joi.ref("password")).required(),
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  street: Joi.string(),
  city: Joi.string(),
  zipcode: Joi.string(),
  phone: Joi.string(),
  website: Joi.string(),
});

// export default new RegisterUserController();
