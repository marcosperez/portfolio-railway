import { agent as request } from "supertest";
import { createApp } from "../../../../../app";
import { prismaMock } from "../../../../helpers/prisma.mock";
import { objectWithTheSameFields } from "../../../../helpers/mock.utils";
import { User } from "../../../../../contexts/domain/users/User.domain";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import InversifyContainer from "../../../../../inversify.config";

describe("Login User Controller", function () {
  let prisma: DeepMockProxy<any>;
  let app: Express.Application;

  beforeAll(async () => {
    InversifyContainer.rebind<any>("PrismaClient").toDynamicValue(
      () => prismaMock
    );
    prisma = InversifyContainer.get<any>("PrismaClient");
    app = await createApp();
  });

  beforeEach(async () => {
    mockReset(prisma);
  });

  test("User Login successful", async () => {
    const passwordHash = await User.hashPassword("9876544");
    const testUser = {
      id: 666,
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
      .post("/users/login")
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
      id: 666,
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
      .post("/users/login")
      .send(loginBody)
      .expect("Content-Type", /json/)
      .expect(401);

    expect(response.body.status).toBeFalsy();
    expect(response.body.data).toBeUndefined();
  });
});
