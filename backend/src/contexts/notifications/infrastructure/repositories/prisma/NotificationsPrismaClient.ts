import { PrismaClient as NotificationsPrismaClient } from "@internal/prisma/notifications-client";

const notificationsPrismaClient = new NotificationsPrismaClient();
export default notificationsPrismaClient;
