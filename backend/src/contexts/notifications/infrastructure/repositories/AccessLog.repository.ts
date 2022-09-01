import {
  PrismaClient as UserPrismaClient,
  Prisma,
} from "@internal/prisma/notifications-client";
import { inject, injectable } from "inversify";
import { AccessLog } from "../../domain/models/AccessLog.model";
import { AccessLogRepositoryInterface } from "./AccessLog.repository.interface";

@injectable()
export class AccessLogRepository implements AccessLogRepositoryInterface {
  constructor(
    @inject("NotificationsPrismaClient")
    private readonly prisma: UserPrismaClient
  ) {}

  public async save(accessLog: AccessLog): Promise<AccessLog | null> {
    const accessLogDB = await this.prisma.accessLogs.create({
      data: accessLog,
    });

    return new AccessLog(accessLogDB);
  }
}
