import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";

import "./contexts/application/controllers/test/test.controllers";
import "./contexts/application/controllers/users/users.controllers";

import { GetUsersService } from "./contexts/application/services/users/GetUsers.application";
import { UserRepository } from "./contexts/infrastructure/users/User.repository";
import prisma from "./contexts/infrastructure/client";
import { LoginUserService } from "./contexts/application/services/users/LoginUser.application";
import { RegisterUserService } from "./contexts/application/services/users/RegisterUser.application";
import { UserRepositoryInterface } from "./contexts/infrastructure/users/User.repository.interface";
import { Service } from "./contexts/application/Service";
import { GetUsersFilterCriteria } from "./contexts/domain/users/GetUsersFilterCriteria.domain";
import { UserDTO } from "./contexts/domain/users/UserDTO.domain";
import { PageData } from "./contexts/infrastructure/Infrastructure.common";
import { LoginUser } from "./contexts/domain/users/LoginUser.domain";
import { LoginUserToken } from "./contexts/domain/users/LoginUserToken.domain";
import { RegisterUser } from "./contexts/domain/users/RegisterUser.domain";
import { User } from "./contexts/domain/users/User.domain";

const InversifyContainer = new Container();

// Prisma Client
InversifyContainer.bind<PrismaClient>("PrismaClient").toDynamicValue(
  () => prisma
);

// Repositories
InversifyContainer.bind<UserRepositoryInterface>("UserRepository").to(
  UserRepository
);

// Services
InversifyContainer.bind<Service<GetUsersFilterCriteria, PageData<UserDTO>>>(
  "GetUsersService"
).to(GetUsersService);
InversifyContainer.bind<Service<LoginUser, LoginUserToken>>(
  "LoginUserService"
).to(LoginUserService);
InversifyContainer.bind<Service<RegisterUser, User>>("RegisterUserService").to(
  RegisterUserService
);

export default InversifyContainer;
