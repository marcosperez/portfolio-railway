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

const InversifyContainer = new Container();

// Prisma Client
InversifyContainer.bind<PrismaClient>("PrismaClient").toDynamicValue(
  () => prisma
);

// Repositories
InversifyContainer.bind<UserRepository>("UserRepository").to(UserRepository);

// Services
InversifyContainer.bind<GetUsersService>(GetUsersService).to(GetUsersService);
InversifyContainer.bind<LoginUserService>(LoginUserService).to(
  LoginUserService
);
InversifyContainer.bind<RegisterUserService>(RegisterUserService).to(
  RegisterUserService
);

export default InversifyContainer;
