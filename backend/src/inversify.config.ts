import "reflect-metadata";

import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";

// Prisma DB Client
import { PrismaClient } from "@prisma/client";
import prisma from "./contexts/shared/infrastructure/dbClient";

// Domain Models
import { User } from "./contexts/users/domain/models/User.domain";

// DTO
import { GetUsersFilterCriteria } from "./contexts/users/domain/dto/GetUsersFilterCriteria.domain";
import { LoginUserDTO } from "./contexts/users/domain/dto/LoginUser.domain";
import { LoginUserToken } from "./contexts/users/domain/dto/LoginUserToken.domain";
import { RegisterUserDTO } from "./contexts/users/domain/dto/RegisterUser.domain";
import { UserDTO } from "./contexts/users/domain/dto/UserDTO.domain";

// Services
import { PageData } from "./contexts/shared/infrastructure/Infrastructure.common";
import { Service } from "./contexts/users/application/Services.common";
import { GetUsersService } from "./contexts/users/application/services/GetUsers.application";
import { LoginUserService } from "./contexts/users/application/services/LoginUser.application";
import { RegisterUserService } from "./contexts/users/application/services/RegisterUser.application";
import { UsersServicesTypes } from "./contexts/users/application/services/users.services";

// Repositories
import { UserRepositoryInterface } from "./contexts/users/infrastructure/repositories/User.repository.interface";
import { UserRepository } from "./contexts/users/infrastructure/repositories/User.repository";

// Controllers
import { PingController } from "./contexts/shared/infrastructure/controllers/healthCheck/Ping.controller";
import { GetUsersController } from "./contexts/users/infrastructure/controllers/GetUsers.controller";
import { LoginUserController } from "./contexts/users/infrastructure/controllers/LoginUser.controller";
import { RegisterUserController } from "./contexts/users/infrastructure/controllers/RegisterUser.controller";

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
  .bind<Service<RegisterUserDTO, User>>(UsersServicesTypes.RegisterUserService)
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
