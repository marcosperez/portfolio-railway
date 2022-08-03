import "reflect-metadata";
import { PrismaClient } from "@prisma/client";
import { Container } from "inversify";

import "./contexts/infrastructure/controllers/common/Ping.controller";
import "./contexts/infrastructure/controllers/users/Users.controllers";

import { UserRepository } from "./contexts/infrastructure/repositories/users/User.repository";
import prisma from "./contexts/infrastructure/client";
import { Service } from "./contexts/application/services/Services.common";
import { GetUsersFilterCriteria } from "./contexts/domain/users/GetUsersFilterCriteria.domain";
import { UserDTO } from "./contexts/domain/users/UserDTO.domain";
import { PageData } from "./contexts/infrastructure/Infrastructure.common";
import { LoginUser } from "./contexts/domain/users/LoginUser.domain";
import { LoginUserToken } from "./contexts/domain/users/LoginUserToken.domain";
import { RegisterUser } from "./contexts/domain/users/RegisterUser.domain";
import { User } from "./contexts/domain/users/User.domain";
import {
  GetUsersService,
  LoginUserService,
  RegisterUserService,
  UsersServicesTypes,
} from "./contexts/application/services/users/users.services";
import { UserRepositoryInterface } from "./contexts/infrastructure/repositories/users/User.repository.interface";

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
  UsersServicesTypes.GetUsersService
).to(GetUsersService);
InversifyContainer.bind<Service<LoginUser, LoginUserToken>>(
  UsersServicesTypes.LoginUserService
).to(LoginUserService);
InversifyContainer.bind<Service<RegisterUser, User>>(
  UsersServicesTypes.RegisterUserService
).to(RegisterUserService);

export default InversifyContainer;
