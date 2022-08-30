import { PrismaClient as UserPrismaClient } from "@internal/prisma/users-client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import usersUserPrismaClient from "../../../../contexts/users/infrastructure/repositories/prisma/UsersPrismaClient";

jest.mock(
  "../../../../contexts/users/infrastructure/repositories/prisma/UsersPrismaClient",
  () => ({
    __esModule: true,
    default: mockDeep<UserPrismaClient>(),
  })
);

export const prismaMock =
  usersUserPrismaClient as unknown as DeepMockProxy<UserPrismaClient>;
