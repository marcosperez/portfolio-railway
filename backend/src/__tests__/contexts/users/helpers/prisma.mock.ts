import { PrismaClient as UserPrismaClient } from "../../../../../node_modules/@internal/prisma/users-client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import usersUserPrismaClient from "../../../../contexts/users/infrastructure/repositories/prisma/UsersPrismaClient";
import { iocContainer } from "../../../../inversify.config";

jest.mock(
  "../../../../contexts/users/infrastructure/repositories/prisma/UsersPrismaClient",
  () => ({
    __esModule: true,
    default: mockDeep<UserPrismaClient>(),
  })
);

// beforeEach(() => {
//   InversifyContainer.rebind<any>("UserPrismaClient").toDynamicValue(
//     () => prismaMock
//   );
//   mockReset(prismaMock);
// });

export const prismaMock =
  usersUserPrismaClient as unknown as DeepMockProxy<UserPrismaClient>;
