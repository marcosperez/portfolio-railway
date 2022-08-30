import { Users, Roles } from "@internal/prisma/users-client";
import { User } from "../../../domain/models/User.domain";
import userPrismaClient from "./UsersPrismaClient";

export class UserSeed {
  async seeding() {
    try {
      await this.createUsers();
      console.log(`[users seed] Finish OK`);
    } catch (err) {
      console.log(`[users seed] Failed`);
      console.log(err);
    }
  }

  private async createUsers() {
    const passwordHash = await User.hashPassword("testtest");

    await userPrismaClient.users.upsert({
      where: { username: "admin" },
      create: {
        name: "admin",
        username: "admin",
        passwordHash: passwordHash,
        email: "marcos.d.perez@gmail.com",
        address: "Falso 1233",
        street: "Falsa",
        suite: "14",
        city: "Bratislava",
        phone: "12321321",
        website: "www.marcosperez.com.ar",
        zipcode: "665465",
        Roles: {
          create: {
            assignedAt: new Date(),
            assignedBy: "admin",
            rol: {
              create: {
                name: "admin",
              },
            },
          },
        },
      },
      update: {
        updatedAt: new Date(),
      },
    });

    const passwordHash2 = await User.hashPassword("userpass");

    await userPrismaClient.users.upsert({
      where: { username: "user1" },
      create: {
        name: "user1",
        username: "user1",
        passwordHash: passwordHash2,
        email: "marcos.d.perez@gmail.com",
        address: "Falso 222",
        street: "Verdadero",
        suite: "2222",
        city: "croacia",
        phone: "3497453126",
        website: "www.usercom.com.ar",
        zipcode: "59786",
        Roles: {
          create: {
            assignedAt: new Date(),
            assignedBy: "user1",
            rol: {
              create: {
                name: "user",
              },
            },
          },
        },
      },
      update: {
        updatedAt: new Date(),
      },
    });

    return;
  }
}

const usersSeeder = new UserSeed();

usersSeeder.seeding();
