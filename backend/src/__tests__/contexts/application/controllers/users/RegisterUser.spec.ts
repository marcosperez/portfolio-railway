import { agent as request } from "supertest";
import { createApp } from "../../../../../app";
import { prismaMock } from "../../../../helpers/prisma.mock";
import { User } from "../../../../../contexts/domain/users/User.domain";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import InversifyContainer from "../../../../../inversify.config";

describe("Register User Controller", function () {
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

  test("Register successful user registration", async () => {
    const passwordHash = await User.hashPassword("12345678");
    const newUser = {
      id: 1000,
      username: "marcosp222",
      passwordHash: passwordHash,
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
      name: "Marcos",
      address: undefined,
      street: undefined,
      suite: undefined,
      city: undefined,
      zipcode: undefined,
      phone: undefined,
      website: undefined,
    };

    const response = await request(app)
      .post("/users/register")
      .send(registerUser)
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.status).toBeTruthy();
    expect(response.body.data.user).not.toBeUndefined();
    expect(response.body.data.user.username).toBe("marcosp222");
    expect(User.comparePassword(passwordHash, "12345678")).toBeTruthy();
  });
});
