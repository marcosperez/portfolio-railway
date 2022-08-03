import "reflect-metadata";
import express from "express";
import dotenv from "dotenv";
import MorganConfig from "./morgan.config";
import cors from "cors";
import { json } from "body-parser";
import { InversifyExpressServer } from "inversify-express-utils";
import path from "path";
import InversifyContainer from "./inversify.config";
import { Container } from "inversify";
import helmet from "helmet";
dotenv.config();

export async function createApp(container: Container = InversifyContainer) {
  const server = new InversifyExpressServer(container);

  server.setConfig((app) => {
    app.use(cors());
    app.use(MorganConfig.MorganLogConsole);
    app.use(MorganConfig.MorganLogFile);
    app.use(json());

    app.use(helmet());
    app.use("/", express.static(path.join(__dirname, "/web")));
  });

  return server.build();
}
