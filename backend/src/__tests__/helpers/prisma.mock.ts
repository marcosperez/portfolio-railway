import { Prisma, PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "../../contexts/infrastructure/client";
import { iocContainer } from "../../inversify.config";

jest.mock("../../contexts/infrastructure/client", () => ({
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
