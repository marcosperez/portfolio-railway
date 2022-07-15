import "reflect-metadata";
import { User } from "../../../../contexts/domain/users/User.domain";
import { UserRepository } from "../../../../contexts/infrastructure/users/User.repository";
import { prismaMock } from "../../../helpers/prisma.mock";
import { LoginUserService } from "../../../../contexts/application/services/users/LoginUser.application";
import { objectWithTheSameFields } from "../../../helpers/mock.utils";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { GetUsersService } from "../../../../contexts/application/services/users/GetUsers.application";
import InversifyContainer from "../../../../inversify.config";

describe("Tests for LoginUser Service ", () => {
  let service: LoginUserService;
  let prisma: DeepMockProxy<any>;

  beforeAll(async () => {
    InversifyContainer.rebind<any>("PrismaClient").toDynamicValue(
      () => prismaMock
    );
    prisma = InversifyContainer.get<any>("PrismaClient");
    service = InversifyContainer.get<LoginUserService>(LoginUserService);
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
