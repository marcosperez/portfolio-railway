import { PrismaClient } from "@prisma/client";
import { UserRepository } from "./repositories/users/User.repository";

export class AppRepositories {
  usersRepository: UserRepository;

  constructor(primaClient: PrismaClient) {
    this.usersRepository = new UserRepository(primaClient);
  }
}
