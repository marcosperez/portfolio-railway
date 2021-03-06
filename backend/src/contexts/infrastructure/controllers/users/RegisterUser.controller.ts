import { Request, Response } from "express";
import Joi from "joi";
import { RegisterUserService } from "../../../application/services/users/RegisterUser.application";
import { Controller } from "../Controller";
import { controller, httpPost } from "inversify-express-utils";
import { inject } from "inversify";
import { UsersServicesTypes } from "../../../application/services/users/users.services";

@controller("/users")
export class RegisterUserController implements Controller {
  constructor(
    @inject(UsersServicesTypes.RegisterUserService)
    private registerUserService: RegisterUserService
  ) {}

  @httpPost("/register")
  async handler(req: Request, res: Response): Promise<void> {
    try {
      const [ok, user] = await this.registerUserService.execute(req.body);

      if (!ok) {
        res.status(404).json({
          status: false,
          message: "Error en creacion de usuario",
        });
        return;
      }

      res.status(200).json({
        status: ok,
        data: { user },
      });
    } catch (err) {
      console.log("[RegisterUsersController][Error]");
      console.log(err);

      res.status(500).json({
        status: false,
        message: "Error en creacion de usuario",
      });
    }
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
