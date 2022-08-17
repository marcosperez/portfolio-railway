import { Prisma, PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import UsersPrismaClient from "../../../../contexts/users/infrastructure/repositories/prisma/UsersPrismaClient";
import { iocContainer } from "../../../../inversify.config";

jest.mock(
  "../../../../contexts/users/infrastructure/repositories/prisma/UsersPrismaClient",
  () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
  })
);

// beforeEach(() => {
//   InversifyContainer.rebind<any>("PrismaClient").toDynamicValue(
//     () => prismaMock
//   );
//   mockReset(prismaMock);
// });

export const prismaMock =
  UsersPrismaClient as unknown as DeepMockProxy<PrismaClient>;
