import { PrismaClient as UserPrismaClient } from "../../../../../../node_modules/@internal/prisma/users-client";

const userPrismaClient = new UserPrismaClient();
export default userPrismaClient;
