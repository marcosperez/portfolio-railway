import "reflect-metadata";
import { prismaMock } from "../../../../helpers/prisma.mock";
import { objectWithTheSameFields } from "../../../../helpers/mock.utils";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { iocContainer } from "../../../../../inversify.config";
import { Service } from "../../../../../contexts/users/application/Services.common";
import { LoginUserService } from "../../../../../contexts/users/application/services/LoginUser.application";
import { UsersServicesTypes } from "../../../../../contexts/users/application/services/users.services";
import { LoginUserDTO } from "../../../../../contexts/users/domain/dto/LoginUser.domain";
import { LoginUserToken } from "../../../../../contexts/users/domain/dto/LoginUserToken.domain";
import { User } from "../../../../../contexts/users/domain/models/User.domain";

describe("Tests for LoginUser Service ", () => {
  let service: Service<LoginUserDTO, LoginUserToken>;
  let prisma: DeepMockProxy<any>;

  beforeAll(async () => {
    iocContainer.rebind<any>("PrismaClient").toDynamicValue(() => prismaMock);
    prisma = iocContainer.get<any>("PrismaClient");
    service = iocContainer.get<LoginUserService>(
      UsersServicesTypes.LoginUserService
    );
  });

  beforeEach(async () => {
    mockReset(prisma);
  });

  test("Login succefuly", async () => {
    const testUser = {
      id: 666,
      username: "test1234",
      passwordHash: await User.hashPassword("12345678"),
      email: "test@gmail.com",
      name: "Tester Perez",
      address: "corriente",
      street: "calle falsa 123",
      suite: "14 C",
      city: "Santelmo",
      zipcode: "4401",
      phone: "+54 362 5436815",
      website: "http://www.paginafalsa.com.ar",
    };

    prisma.users.findFirst
      .calledWith(
        objectWithTheSameFields({
          where: {
            username: "test1234",
          },
        })
      )
      .mockResolvedValue(testUser);

    const [ok, token] = await service.execute({
      password: "12345678",
      login: "test1234",
    });

    expect(ok).toBeTruthy();
    expect(token).not.toBeUndefined();
  });

  test("Login Failed", async () => {
    const [ok, token] = await service.execute({
      password: "87654321",
      login: "test1234",
    });

    expect(ok).toBeFalsy();
    expect(token).toBeUndefined();
  });

  test("Login Failed", async () => {
    // Pisa el resultado del find first

    prisma.users.findFirst.mockResolvedValue(null);
    const [ok, token] = await service.execute({
      password: "12345678",
      login: "test1234",
    });

    expect(ok).toBeFalsy();
    expect(token).toBeUndefined();
  });
});
