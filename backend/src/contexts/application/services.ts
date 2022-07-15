import { PrismaClient } from "@prisma/client";
import { AppRepositories } from "../infrastructure/repositories";
import { GetUsersService } from "./services/users/GetUsers.application";
import { LoginUserService } from "./services/users/LoginUser.application";
import { RegisterUserService } from "./services/users/RegisterUser.application";

export class AppServices {
  getUsersService: GetUsersService;
  loginUserService: LoginUserService;
  registerUserService: RegisterUserService;

  constructor(respositories: AppRepositories) {
    this.getUsersService = new GetUsersService(respositories.usersRepository);
    this.loginUserService = new LoginUserService(respositories.usersRepository);
    this.registerUserService = new RegisterUserService(
      respositories.usersRepository
    );
  }
}
