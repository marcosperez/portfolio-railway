import { agent as request } from "supertest";
import { createApp } from "../../../../../app";
import { prismaMock } from "../../helpers/prisma.mock";
import { objectWithTheSameFields } from "../../helpers/mock.utils";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { iocContainer } from "../../../../../inversify.config";
import { User } from "../../../../../contexts/users/domain/models/User.domain";

describe("Login User Controller", function () {
  let prisma: DeepMockProxy<any>;
  let app: Express.Application;

  beforeAll(async () => {
    iocContainer
      .rebind<any>("UserPrismaClient")
      .toDynamicValue(() => prismaMock);
    prisma = iocContainer.get<any>("UserPrismaClient");
    app = await createApp();
  });

  beforeEach(async () => {
    mockReset(prisma);
  });

  test("User Login successful", async () => {
    const passwordHash = await User.hashPassword("9876544");
    const testUser = {
      id: "666",
      username: "test1234",
      passwordHash: passwordHash,
      email: "test@gmail.com",
      name: "Tester Perez",
      address: "corriente",
      street: "calle falsa 123",
      suite: "14 C",
      city: "Santelmo",
      zipcode: "4401",
      phone: "+54 362 5436815",
      website: "http://www.paginafalsa.com.ar",
      createdAt: new Date(),
      updatedAt: new Date(),
      disabled: true,
    };

    prismaMock.users.findFirst
      .calledWith(
        objectWithTheSameFields({
          where: {
            username: "test1234",
          },
        })
      )
      .mockResolvedValue(testUser);

    const loginBody = {
      password: "9876544",
      login: "test1234",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginBody)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.status).toBeTruthy();
    expect(response.body.data.token).not.toBeUndefined();
    expect(User.comparePassword(passwordHash, "9876544")).toBeTruthy();
  });

  test("User Login failed", async () => {
    const passwordHash = await User.hashPassword("9876544");
    const testUser = {
      id: "666",
      username: "test1234",
      passwordHash: passwordHash,
      email: "test@gmail.com",
      name: "Tester Perez",
      address: "corriente",
      street: "calle falsa 123",
      suite: "14 C",
      city: "Santelmo",
      zipcode: "4401",
      phone: "+54 362 5436815",
      website: "http://www.paginafalsa.com.ar",
      createdAt: new Date(),
      updatedAt: new Date(),
      disabled: true,
    };

    prismaMock.users.findFirst
      .calledWith(
        objectWithTheSameFields({
          where: {
            username: "test1234",
          },
        })
      )
      .mockResolvedValue(testUser);

    const loginBody = {
      password: "1234567",
      login: "test1234",
    };

    const response = await request(app)
      .post("/api/users/login")
      .send(loginBody)
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body.status).toBeFalsy();
    expect(response.body.data).toBeUndefined();
  });
});
