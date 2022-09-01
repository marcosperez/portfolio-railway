import "reflect-metadata";

import { Container, decorate, injectable } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { Controller } from "tsoa";

// Prisma DB Client
import { PrismaClient as UserPrismaClient } from "@internal/prisma/users-client";
import { PrismaClient as NotificationsPrismaClient } from "@internal/prisma/notifications-client";

// Domain Models
import { User } from "./contexts/users/domain/models/User.domain";

// DTO
import { GetUsersFilterCriteria } from "./contexts/users/domain/dtos/GetUsersFilterCriteria.dto";
import { LoginUserDTO } from "./contexts/users/domain/dtos/LoginUser.dto";
import { LoginUserToken } from "./contexts/users/domain/dtos/LoginUserToken.dto";
import { RegisterUserDTO } from "./contexts/users/domain/dtos/RegisterUser.dto";
import { UserDTO } from "./contexts/users/domain/dtos/User.dto";

// Services
import { PageData } from "./contexts/shared/infrastructure/Infrastructure.common";
import { Service } from "./contexts/users/application/Services.common";
import { GetUsersService } from "./contexts/users/application/services/GetUsers.application";
import { LoginUserService } from "./contexts/users/application/services/LoginUser.application";
import { RegisterUserService } from "./contexts/users/application/services/RegisterUser.application";
import { UsersServicesTypes } from "./contexts/users/application/services/users.services";

// Repositories
// USERS
import { UserRepositoryInterface } from "./contexts/users/infrastructure/repositories/User.repository.interface";
import { UserRepository } from "./contexts/users/infrastructure/repositories/User.repository";

// NOTIFICATION
import { AccessLogRepositoryInterface } from "./contexts/notifications/infrastructure/repositories/AccessLog.repository.interface";
import { AccessLogRepository } from "./contexts/notifications/infrastructure/repositories/AccessLog.repository";

// Controllers
import { PingController } from "./contexts/shared/infrastructure/controllers/healthCheck/Ping.controller";
import { GetUsersController } from "./contexts/users/infrastructure/controllers/GetUsers.controller";
import { LoginUserController } from "./contexts/users/infrastructure/controllers/LoginUser.controller";
import { RegisterUserController } from "./contexts/users/infrastructure/controllers/RegisterUser.controller";
import userPrismaClient from "./contexts/users/infrastructure/repositories/prisma/UsersPrismaClient";
import basicEventPubSub from "./contexts/shared/infrastructure/BasicEventPubSub.common";
import { INotificationListener } from "./contexts/notifications/infrastructure/listeners/notification.listener.interface";
import {
  AccessLogData,
  RegisterAccessLogs,
} from "./contexts/notifications/application/services/RegisterAccessLogs.service";
import { AccessLog } from "./contexts/notifications/domain/models/AccessLog.model";
import { NotificationsServicesTypes } from "./contexts/notifications/application/services/notifications.services";
import { NotificationListener } from "./contexts/notifications/infrastructure/listeners/notification.listener";
import notificationsPrismaClient from "./contexts/notifications/infrastructure/repositories/prisma/NotificationsPrismaClient";
import { IEventPubSub } from "./contexts/shared/infrastructure/eventEmiterPubSub.interface";

// EventDrive

//*************************************************************************************** */
// TODO: split code?
// Configuration Inversify Container
const iocContainer = new Container();

// Prisma Client
iocContainer
  .bind<UserPrismaClient>("UserPrismaClient")
  .toDynamicValue(() => userPrismaClient);

iocContainer
  .bind<NotificationsPrismaClient>("NotificationsPrismaClient")
  .toDynamicValue(() => notificationsPrismaClient);

// Repositories
// Users
iocContainer.bind<UserRepositoryInterface>("UserRepository").to(UserRepository);

// Notifications
iocContainer
  .bind<AccessLogRepositoryInterface>("AccessLogRepository")
  .to(AccessLogRepository);

// Services
//Users
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

// Notifications
iocContainer
  .bind<Service<AccessLogData, AccessLog>>(
    NotificationsServicesTypes.RegisterAccessLogs
  )
  .to(RegisterAccessLogs);

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

// EventDrive
iocContainer
  .bind<IEventPubSub>("EventPubSub")
  .toDynamicValue(() => basicEventPubSub);

iocContainer
  .bind<INotificationListener>("NotificationListener")
  .to(NotificationListener);
// .toDynamicValue(() => notificationListener);

//*************************************************************************************** */

decorate(injectable(), Controller);
iocContainer.load(buildProviderModule());

export { iocContainer };
