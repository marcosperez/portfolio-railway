import { Prisma, PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "../../contexts/shared/infrastructure/dbClient";
import { iocContainer } from "../../inversify.config";

jest.mock("../../contexts/shared/infrastructure/dbClient", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

// beforeEach(() => {
//   InversifyContainer.rebind<any>("PrismaClient").toDynamicValue(
//     () => prismaMock
//   );
//   mockReset(prismaMock);
// });

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
