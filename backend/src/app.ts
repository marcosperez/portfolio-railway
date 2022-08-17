import "reflect-metadata";
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from "express";
import dotenv from "dotenv";
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

dotenv.config();

export async function createApp(container: Container = iocContainer) {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(cors());
    app.use(MorganConfig.MorganLogConsole);
    app.use(MorganConfig.MorganLogFile);
    app.use(json());

    app.use(helmet());
    app.use("/", express.static(path.join(__dirname, "/web")));

    RegisterRoutes(app);
    // TODO: thinking about error handling
    app.use(function errorHandler(
      err: unknown,
      req: ExRequest,
      res: ExResponse,
      next: NextFunction
    ): ErrorController | ExResponse | void {
      if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
          message: "Validation Failed",
          details: err?.fields,
        });
      }

      console.warn(`[ErrorHandler][Error][${req.path}]`);
      console.warn(err);

      if (err instanceof ValidationError) {
        return res.status(422).json({
          status: false,
          reason: err.message,
          error: err,
        });
      }

      if (err instanceof Error) {
        return res.status(500).json({
          status: false,
          reason: "Error desconocido",
        });
      }

      next();
    });
    app.use(
      "/docs",
      swaggerUi.serve,
      async (_req: ExRequest, res: ExResponse) => {
        return res.send(
          swaggerUi.generateHTML(await import("../swagger/swagger.json"))
        );
      }
    );
  });

  return server.build();
}
