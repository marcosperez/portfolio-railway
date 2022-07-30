import "reflect-metadata";
import { User } from "../../../../../contexts/domain/users/User.domain";
import { GetUsersService } from "../../../../../contexts/application/services/users/GetUsers.application";
import { objectWithTheSameFields } from "../../../../helpers/mock.utils";
import InversifyContainer from "../../../../../inversify.config";
import { DeepMockProxy, mockReset } from "jest-mock-extended";
import { prismaMock } from "../../../../helpers/prisma.mock";
import { GetUsersFilterCriteria } from "../../../../../contexts/domain/users/GetUsersFilterCriteria.domain";
import { UserDTO } from "../../../../../contexts/domain/users/UserDTO.domain";
import { PageData } from "../../../../../contexts/infrastructure/Infrastructure.common";
import { UsersServicesTypes } from "../../../../../contexts/application/services/users/users.services";
import { Service } from "../../../../../contexts/application/services/Services.common";

describe("Tests for Get Users Service ", () => {
  let service: Service<GetUsersFilterCriteria, PageData<UserDTO>>;
  let prisma: DeepMockProxy<any>;

  beforeAll(async () => {
    InversifyContainer.rebind<any>("PrismaClient").toDynamicValue(
      () => prismaMock
    );
    prisma = InversifyContainer.get<any>("PrismaClient");
    service = InversifyContainer.get<GetUsersService>(
      UsersServicesTypes.GetUsersService
    );
  });

  beforeEach(async () => {
    mockReset(prisma);
  });

  test("GetUsers find by username", async () => {
    prisma.users.findMany
      .calledWith(
        objectWithTheSameFields({
          where: {
            OR: {
              username: { contains: "pepeeee" },
              name: { contains: "pepeeee" },
              email: { contains: "pepeeee" },
            },
          },
          take: 2,
          skip: 0,
        })
      )
      .mockResolvedValue([
        {
          id: 666,
          username: "pepeeee1234",
          passwordHash: await User.hashPassword("12345678"),
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

    const [ok, page] = await service.execute({
      filter: "pepeeee",
      page: 1,
      pageSize: 2,
    });

    expect(ok).toBeTruthy();
    expect(page).not.toBeUndefined();
    expect(page?.list.length).toEqual(1);
    expect(page?.count).toEqual(1);
  });

  test("GetUsers find by username", async () => {
    prisma.users.count.mockResolvedValue(5);
    prisma.users.findMany
      .calledWith(objectWithTheSameFields({ where: {}, take: 2, skip: 0 }))
      .mockResolvedValue([
        {
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
        },
        {
          id: 666,
          username: "pepeeee1234",
          passwordHash: await User.hashPassword("12345678"),
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
        // {
        //   id: 667,
        //   username: "test7",
        //   passwordHash: await User.hashPassword("75678"),
        //   email: "test_7@gmail.com",
        //   name: "Tester Perez 7",
        //   address: "corriente",
        //   street: "calle falsa 7",
        //   suite: "17 C",
        //   city: "Santelmo7",
        //   zipcode: "4407",
        //   phone: "+54 362 5436817",
        //   website: "http://www.paginafalsa7.com.ar",
        // },
        // {
        //   id: 668,
        //   username: "test8",
        //   passwordHash: await User.hashPassword("85688"),
        //   email: "test_8@gmail.com",
        //   name: "Tester Perez 8",
        //   address: "corriente",
        //   street: "calle falsa 8",
        //   suite: "18 C",
        //   city: "Santelmo8",
        //   zipcode: "4408",
        //   phone: "+54 362 5436818",
        //   website: "http://www.paginafalsa8.com.ar",
        // },
        // {
        //   id: 669,
        //   username: "test9",
        //   passwordHash: await User.hashPassword("95699"),
        //   email: "test_9@gmail.com",
        //   name: "Tester Perez 9",
        //   address: "corriente",
        //   street: "calle falsa 9",
        //   suite: "19 C",
        //   city: "Santelmo9",
        //   zipcode: "4409",
        //   phone: "+54 362 5436919",
        //   website: "http://www.paginafalsa9.com.ar",
        // },
      ]);

    const [ok, page] = await service.execute({
      page: 1,
      pageSize: 2,
    });

    expect(ok).toBeTruthy();
    expect(page).not.toBeUndefined();
    expect(page?.list.length).toEqual(2);
    expect(page?.count).toEqual(5);
  });
});
