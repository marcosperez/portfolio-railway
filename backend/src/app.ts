import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import MorganConfig from "./morgan.config";
import cors from "cors";
import { json } from "body-parser";
import { ConfigAppRouter } from "./router.config";
import { AppRepositories } from "./contexts/infrastructure/repositories";
import { AppServices } from "./contexts/application/services";
import {
  interfaces,
  InversifyExpressServer,
  TYPE,
} from "inversify-express-utils";
import path from "path";
import InversifyContainer from "./inversify.config";
import { Container } from "inversify";
dotenv.config();

export async function createApp(container: Container = InversifyContainer) {
  let server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(cors());
    app.use(MorganConfig.MorganLogConsole);
    app.use(MorganConfig.MorganLogFile);
    app.use(json());

    // const repositories = new AppRepositories(client);
    // const services = new AppServices(repositories);
    // ConfigAppRouter(app, services, repositories);
    app.use("/", express.static(path.join(__dirname, "/web")));
  });

  return server.build();
}
