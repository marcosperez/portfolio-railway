import "reflect-metadata";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import MorganConfig from "./morgan.config";
import cors from "cors";
import { json } from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import path from "path";
import { iocContainer } from "./inversify.config";
import { Container } from "inversify";
import helmet from "helmet";
import { RegisterRoutes } from "../swagger/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import { ValidationError } from "joi";
import { ErrorController } from "./contexts/shared/infrastructure/controllers/Controller";
import { INotificationListener } from "./contexts/notifications/infrastructure/listeners/notification.listener.interface";
import { IConsumer } from "./contexts/shared/infrastructure/consumer/consumer.interface";
import { IProducer } from "./contexts/shared/infrastructure/producer/producer.interface";
class ResponseError extends Error {
  status?: number;
}

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const url = process.env.RAILWAY_STATIC_URL || "localhost";
const protocole = env === "PROD" ? "https" : "http";

export async function createApp(container: Container = iocContainer) {
  const server = new InversifyExpressServer(container);
  server.setConfig((app) => {
    app.use(cors());
    app.use(MorganConfig.MorganLogConsole);
    app.use(MorganConfig.MorganLogFile);
    app.use(json());

    app.use(helmet());
    app.use("/", express.static(path.join(__dirname, "/web")));
    console.log(`☁️ [Web] on ${protocole}://${url}:${port}/`);

    // DISABLED FOR PRODUCTION - add ratelimit before enabled
    if (env !== "PROD") {
      RegisterRoutes(app);
      // TODO: thinking about error handling
      app.use(function errorHandler(
        err: unknown,
        req: ExRequest,
        res: ExResponse,
        next: NextFunction
      ): ErrorController | ExResponse | void {
        if (err instanceof ValidateError) {
          console.warn(
            `🤯 Caught Validation Error for ${req.path}:`,
            err.fields
          );
          return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
          });
        }

        console.warn(`🤯 [ErrorHandler][Error][${req.path}]`);
        console.warn(err);

        if (err instanceof ValidationError) {
          return res.status(422).json({
            status: false,
            reason: err.message,
            error: err,
          });
        }

        if (err instanceof Error) {
          return res.status((err as ResponseError).status || 500).json({
            status: false,
            reason: err.message,
          });
        }

        next();
      });

      console.log(`🎮 [Open API] on ${protocole}://${url}:${port}/docs`);

      app.use(
        "/docs",
        swaggerUi.serve,
        async (_req: ExRequest, res: ExResponse) => {
          return res.send(
            swaggerUi.generateHTML(await import("../swagger/swagger.json"))
          );
        }
      );

      // PUB SUB EVENT DRIVE
      // TODO: Pasar a un service
      const consumer = container.get("Consumer") as IConsumer<string, any>;
      const producer = container.get("Producer") as IProducer<string, any>;
      Promise.all([consumer.connect(), producer.connect()])
        .then(() => {
          const notificationListener = container.get(
            "NotificationListener"
          ) as INotificationListener;
          notificationListener.start();
        })
        .catch((err) => {
          console.log("Notification Connection Failed ", err);
        });
    }
  });

  return server.build();
}
