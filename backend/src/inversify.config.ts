import "reflect-metadata";

import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";

// Prisma DB Client
import { PrismaClient } from "@prisma/client";
import prisma from "./contexts/infrastructure/client";

// Domain Models
import { Service } from "./contexts/application/services/Services.common";
import { GetUsersFilterCriteria } from "./contexts/domain/users/GetUsersFilterCriteria.domain";
import { UserDTO } from "./contexts/domain/users/UserDTO.domain";
import { PageData } from "./contexts/infrastructure/Infrastructure.common";
import { LoginUserDTO } from "./contexts/domain/users/LoginUser.domain";
import { LoginUserToken } from "./contexts/domain/users/LoginUserToken.domain";
import { RegisterUser } from "./contexts/domain/users/RegisterUser.domain";
import { User } from "./contexts/domain/users/User.domain";

// Services
import {
  GetUsersService,
  LoginUserService,
  RegisterUserService,
  UsersServicesTypes,
} from "./contexts/application/services/users/users.services";

// Repositories
import { UserRepository } from "./contexts/infrastructure/repositories/users/User.repository";
import { UserRepositoryInterface } from "./contexts/infrastructure/repositories/users/User.repository.interface";

// Controllers
import {
  PingController,
  GetUsersController,
  LoginUserController,
  RegisterUserController,
} from "./contexts/infrastructure/controllers";

//*************************************************************************************** */
// TODO: split code?
// Configuration Inversify Container
const iocContainer = new Container();

// Prisma Client
iocContainer.bind<PrismaClient>("PrismaClient").toDynamicValue(() => prisma);

// Repositories
iocContainer.bind<UserRepositoryInterface>("UserRepository").to(UserRepository);

// Services
iocContainer
  .bind<Service<GetUsersFilterCriteria, PageData<UserDTO>>>(
    UsersServicesTypes.GetUsersService
  )
  .to(GetUsersService);
iocContainer
  .bind<Service<LoginUserDTO, LoginUserToken>>(
    UsersServicesTypes.LoginUserService
  )
  .to(LoginUserService);
iocContainer
  .bind<Service<RegisterUser, User>>(UsersServicesTypes.RegisterUserService)
  .to(RegisterUserService);

// Controllers
iocContainer.bind<PingController>(PingController).to(PingController);
iocContainer
  .bind<GetUsersController>(GetUsersController)
  .to(GetUsersController);
iocContainer
  .bind<LoginUserController>(LoginUserController)
  .to(LoginUserController);
iocContainer
  .bind<RegisterUserController>(RegisterUserController)
  .to(RegisterUserController);

//*************************************************************************************** */

decorate(injectable(), Controller);
iocContainer.load(buildProviderModule());

export { iocContainer };
