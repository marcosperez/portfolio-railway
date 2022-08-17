import Joi from "joi";
import { ValidationError } from "joi";
import { GetUsersFilterCriteria } from "../../domain/dto/GetUsersFilterCriteria.dto";
import { GetUsersService } from "../../application/services/GetUsers.application";
import { controller, httpGet } from "inversify-express-utils";
import { inject } from "inversify";
import {
  Route,
  Controller,
  Get,
  Query,
  Response,
  SuccessResponse,
  Tags,
} from "tsoa";
import { PageData } from "../../../shared/infrastructure/Infrastructure.common";
import { ResultController } from "../../../shared/infrastructure/controllers/Controller";
import { UsersServicesTypes } from "../../application/services/users.services";
import { UserDTO } from "../../domain/dto/User.dto";

export const QueryGetUsersSchema = Joi.object({
  filter: Joi.string().min(0).max(30),
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

type GetUsersResponseDTO = ResultController<
  PageData<UserDTO> | ValidationError
>;

@Route("/users")
@Tags("Users")
@controller("/users")
export class GetUsersController extends Controller {
  constructor(
    @inject(UsersServicesTypes.GetUsersService)
    private getUsersService: GetUsersService
  ) {
    super();
  }

  /**
   * Return a list of users with pagination
   * @param filter
   * @param page
   * @param pageSize
   * @param sortField
   * @param sortDirection
   * @returns paginated users
   * @summary users list
   */
  @httpGet("/")
  @Response<GetUsersResponseDTO>(400, "Bad Request")
  @SuccessResponse("200", "Users pagination list", "application/json")
  @Get("/")
  public async handler(
    @Query() filter = "",
    @Query() page = defaultPagination.page,
    @Query() pageSize = defaultPagination.pageSize,
    @Query() sortField = defaultPagination.sortField,
    @Query() sortDirection = defaultPagination.sortDirection
  ): Promise<GetUsersResponseDTO> {
    const query: any = {
      ...defaultPagination,
      ...{ filter, page, pageSize, sortField, sortDirection },
    };
    await QueryGetUsersSchema.validateAsync(query);

    const [ok, users] = await this.getUsersService.execute(query);
    if (!ok) {
      this.setStatus(400);

      return {
        status: false,
        reason: "Get Users Failed",
      };
    }

    this.setStatus(200);
    return {
      status: ok,
      data: users,
    };
  }
}
