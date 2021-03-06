import { User } from "../../../domain/users/User.domain";
import { Prisma, PrismaClient } from "@prisma/client";
import { GetUsersFilterCriteria } from "../../../domain/users/GetUsersFilterCriteria.domain";
import { UserRepositoryInterface } from "./User.repository.interface";
import { inject, injectable } from "inversify";

@injectable()
export class UserRepository implements UserRepositoryInterface {
  // prisma: PrismaClient;
  // constructor(client: PrismaClient = new PrismaClient()) {
  //   this.prisma = client;
  // }

  constructor(@inject("PrismaClient") private readonly prisma: PrismaClient) {}

  // Default repository methods

  async findById(id: number): Promise<User | null> {
    const user = await this.prisma.users.findFirst({ where: { id: id } });
    return user ? new User(user) : null;
  }

  async find(where: GetUsersFilterCriteria): Promise<Array<User>> {
    const skip = (where.page - 1) * where.pageSize;
    const whereQuery = this.buildFindWhereFilter(where);

    const query = {
      where: whereQuery,
      take: where.pageSize,
      skip: skip,
    };
    const allUsers = await this.prisma.users.findMany(query);

    return allUsers.map((dbUser) => new User(dbUser));
  }

  async count(where: GetUsersFilterCriteria): Promise<number> {
    const whereQuery = this.buildFindWhereFilter(where);
    const totalUsers = await this.prisma.users.count({ where: whereQuery });

    return totalUsers;
  }

  update(id: number, user: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(user: User): Promise<User> {
    const dbUser = await this.prisma.users.create({ data: user.persistData() });

    return new User(dbUser);
  }

  // Custom methods
  async findByUsername(login: string): Promise<User | null> {
    const where = {
      where: {
        username: login,
      },
    };
    const user = await this.prisma.users.findFirst(where);
    return user ? new User(user) : null;
  }

  // Private methods

  private buildFindWhereFilter(
    where: GetUsersFilterCriteria
  ): Prisma.UsersWhereInput {
    let whereQuery = {};
    if (where.filter) {
      whereQuery = {
        OR: {
          username: { contains: where.filter },
          name: { contains: where.filter },
          email: { contains: where.filter },
        },
      };
    }

    return whereQuery;
  }
}
