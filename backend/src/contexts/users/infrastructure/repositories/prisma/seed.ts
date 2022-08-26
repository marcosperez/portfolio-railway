import { Users, Roles } from "@internal/prisma/users-client";
import userPrismaClient from "./UsersPrismaClient";

export class UserSeed {
  async seeding() {
    try {
      const admin = await this.createAdminUser();
      const [adminRol, _] = await this.createRoles();
      await this.createAdminRolRelation(admin, adminRol);
      console.log(`[users seed] Finish OK`);
    } catch (err) {
      console.log(`[users seed] Failed`);
      console.log(err);
    }
  }

  private async createAdminUser() {
    return await userPrismaClient.users.upsert({
      where: { username: "admin" },
      create: {
        name: "admin",
        username: "admin",
        passwordHash:
          "$2b$10$o1kaIFMhEtqmfVH.dwB4ReZlvGDfKHoZoWoX524fpW.J1SikRxJni",
        email: "marcos.d.perez@gmail.com",
        address: "Falso 1233",
        street: "Falsa",
        suite: "14",
        city: "Bratislava",
        phone: "12321321",
        website: "www.marcosperez.com.ar",
        zipcode: "665465",
      },
      update: {
        updatedAt: new Date(),
      },
    });
  }

  private async createRoles() {
    const adminRol = await userPrismaClient.roles.upsert({
      where: { name: "admin" },
      create: {
        name: "admin",
      },
      update: {
        updatedAt: new Date(),
      },
    });

    const guestRol = await userPrismaClient.roles.upsert({
      where: { name: "guest" },
      create: {
        name: "guest",
      },
      update: {
        updatedAt: new Date(),
      },
    });

    return [adminRol, guestRol];

    //   await userPrismaClient.roles.upsert({
    //     where: {  },
    //     create: {
    //      name: "videotuber"
    //     },
    //     update: {
    //       updatedAt: new Date(),
    //     },
    //   });
  }

  private async createAdminRolRelation(user: Users, rol: Roles) {
    const usersHasRoles = await userPrismaClient.usersHasRoles.findFirst({
      where: { rolId: rol.id, userId: user.id, assignedBy: user.id },
    });
    if (usersHasRoles) {
      return;
    }
    await userPrismaClient.usersHasRoles.create({
      data: { rolId: rol.id, userId: user.id, assignedBy: user.id },
    });
  }
}

const usersSeeder = new UserSeed();

usersSeeder.seeding();
