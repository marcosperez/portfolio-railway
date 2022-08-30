import { agent as request } from "supertest";
import { createApp } from "../../../../../app";
import { prismaMock } from "../../helpers/prisma.mock";
import { objectWithTheSameFields } from "../../helpers/mock.utils";
import { iocContainer } from "../../../../../inversify.config";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { generateMockToken } from "../../helpers/getToken.mock";

describe("Get Users Controller", function () {
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

  test("Get users succefuly without filters", (done) => {
    prisma.users.findMany.mockResolvedValue([
      {
        id: "666",
        username: "pepeeee1234",
        passwordHash: "asdasdasdasd",
        email: "pepeeee@gmail.com",
        name: "Pepeeeeer Perez",
        address: "corriente",
        street: "calle falsa 123",
        suite: "14 C",
        city: "Santelmo",
        zipcode: "4401",
        phone: "+54 362 5436815",
        website: "http://www.paginafalsa.com.ar",
      },
    ]);
    prisma.users.count.mockResolvedValue(1);
    const token = generateMockToken();
    request(app)
      .get("/api/users")
      .set("authorization", `Bearer ${token}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBeTruthy();
        expect(response.body.data.count).toBe(1);
        expect(response.body.data.list[0].id).toBe("666");
        done();
      })
      .catch((err) => done(err));
  });

  test("Get users succefuly with filter", (done) => {
    prisma.users.findMany
      .calledWith(
        objectWithTheSameFields({
          where: {
            OR: {
              username: { contains: "1234" },
              name: { contains: "1234" },
              email: { contains: "1234" },
            },
          },
          take: 10,
          skip: 0,
        })
      )
      .mockResolvedValue([
        {
          id: "665",
          username: "test1234",
          passwordHash: "12312312",
          email: "test@gmail.com",
          name: "Tester Perez",
          address: "corriente",
          street: "calle falsa 123",
          suite: "14 C",
          city: "Santelmo",
          zipcode: "4401",
          phone: "+54 362 5436815",
          website: "http://www.paginafalsa.com.ar",
        },
        {
          id: "666",
          username: "pepeeee1234",
          passwordHash: "12345678",
          email: "pepeeee@gmail.com",
          name: "Pepeeeeer Perez",
          address: "corriente",
          street: "calle falsa 123",
          suite: "14 C",
          city: "Santelmo",
          zipcode: "4401",
          phone: "+54 362 5436815",
          website: "http://www.paginafalsa.com.ar",
        },
      ]);
    prisma.users.count.mockResolvedValue(2);
    const token = generateMockToken();
    request(app)
      .get("/api/users")
      .set("authorization", `Bearer ${token}`)
      .query({ filter: "1234" })
      .expect("Content-Type", /json/)
      .expect(200)
      .then((response) => {
        expect(response.body.status).toBeTruthy();
        expect(response.body.data.count).toBe(2);
        expect(response.body.data.list[0].id).toBe("665");
        done();
      })
      .catch((err) => done(err));
  });
});
