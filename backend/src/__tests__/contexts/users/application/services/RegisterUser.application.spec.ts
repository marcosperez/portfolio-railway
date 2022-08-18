import "reflect-metadata";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { iocContainer } from "../../../../../inversify.config";
import { prismaMock } from "../../helpers/prisma.mock";
import { Service } from "../../../../../contexts/users/application/Services.common";
import { RegisterUserService } from "../../../../../contexts/users/application/services/RegisterUser.application";
import { UsersServicesTypes } from "../../../../../contexts/users/application/services/users.services";
import { RegisterUserDTO } from "../../../../../contexts/users/domain/dto/RegisterUser.dto";
import { User } from "../../../../../contexts/users/domain/models/User.domain";

describe("Tests for RegisterUser Service ", () => {
  let service: Service<RegisterUserDTO, User>;
  let prisma: DeepMockProxy<any>;

  beforeAll(async () => {
    iocContainer
      .rebind<any>("UserPrismaClient")
      .toDynamicValue(() => prismaMock);
    prisma = iocContainer.get<any>("UserPrismaClient");
    service = iocContainer.get<RegisterUserService>(
      UsersServicesTypes.RegisterUserService
    );
  });

  beforeEach(async () => {
    mockReset(prisma);
  });

  test("Register succefuly", async () => {
    const newUser = {
      id: 1000,
      username: "marcosp222",
      passwordHash: await User.hashPassword("12345678"),
      email: "marcos.d.perez@gmail.com",
      name: "Marcos Perez",
      address: null,
      street: null,
      suite: null,
      city: null,
      zipcode: null,
      phone: null,
      website: null,
    };

    prisma.users.create.mockResolvedValue(newUser);

    const registerUser = {
      username: "marcosp222",
      password: "12345678",
      passwordConfirmation: "12345678",
      email: "marcos.d.perez@gmail.com",
      name: "Marcos Perez",
      address: undefined,
      street: undefined,
      suite: undefined,
      city: undefined,
      zipcode: undefined,
      phone: undefined,
      website: undefined,
    };

    const [ok, user] = await service.execute(registerUser);

    expect(ok).toBeTruthy();
    expect(user).not.toBeUndefined();
  });
});
