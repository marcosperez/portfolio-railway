import { PrismaClient as UserPrismaClient } from "@internal/prisma/users-client";

const userPrismaClient = new UserPrismaClient();
export default userPrismaClient;
