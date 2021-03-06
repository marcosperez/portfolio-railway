import { Request, Response } from "express";
import Joi from "joi";
import { GetUsersFilterCriteria } from "../../../domain/users/GetUsersFilterCriteria.domain";
import { GetUsersService } from "../../../application/services/users/GetUsers.application";
import { interfaces, controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import { UsersServicesTypes } from "../../../application/services/users/users.services";

export const QueryGetUsersSchema = Joi.object({
  filter: Joi.string().min(1).max(30),
  page: Joi.number().min(1).max(99999),
  pageSize: Joi.number().max(100).min(1),
  sortField: Joi.string().valid("id", "username", "name", "email"),
  sortDirection: Joi.number().valid("asc", "desc"),
});

const defaultPagination: GetUsersFilterCriteria = {
  page: 1,
  pageSize: 10,
  sortField: "id",
  sortDirection: "desc",
};

@controller("/users")
export class GetUsersController implements interfaces.Controller {
  constructor(
    @inject(UsersServicesTypes.GetUsersService)
    private getUsersService: GetUsersService
  ) {}

  @httpGet("/")
  async handler(req: Request, res: Response): Promise<void> {
    const query = { ...defaultPagination, ...req.query };
    const [ok, users] = await this.getUsersService.execute(query);
    if (!ok) {
      res.status(404).json({
        status: false,
        message: "Error en get de usuarios",
      });
      return;
    }

    res.status(200).json({
      status: ok,
      data: { users },
    });
  }
}
