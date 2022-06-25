"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_config_1 = __importDefault(require("./morgan.config"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const router_config_1 = require("./router.config");
const repositories_1 = require("./contexts/infrastructure/repositories");
const services_1 = require("./contexts/application/services");
const client_1 = __importDefault(require("./contexts/infrastructure/client"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
function createApp(client = client_1.default) {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use(morgan_config_1.default.MorganLogConsole);
    app.use(morgan_config_1.default.MorganLogFile);
    app.use((0, body_parser_1.json)());
    app.get("/ping", (req, res) => {
        res.json({ status: "ok", message: "pong" });
    });
    const repositories = new repositories_1.AppRepositories(client);
    const services = new services_1.AppServices(repositories);
    (0, router_config_1.ConfigAppRouter)(app, services, repositories);
    console.log("RAILWAY_STATIC_URL: ", process.env.RAILWAY_STATIC_URL);
    console.log("RAILWAY_GIT_COMMIT_SHA: ", process.env.RAILWAY_GIT_COMMIT_SHA);
    console.log("RAILWAY_GIT_AUTHOR: ", process.env.RAILWAY_GIT_AUTHOR);
    console.log("RAILWAY_GIT_BRANCH: ", process.env.RAILWAY_GIT_BRANCH);
    console.log("RAILWAY_GIT_REPO_NAME: ", process.env.RAILWAY_GIT_REPO_NAME);
    console.log("RAILWAY_GIT_REPO_OWNER: ", process.env.RAILWAY_GIT_REPO_OWNER);
    console.log("RAILWAY_GIT_COMMIT_MESSAGE: ", process.env.RAILWAY_GIT_COMMIT_MESSAGE);
    console.log("RAILWAY_HEALTHCHECK_TIMEOUT_SEC: ", process.env.RAILWAY_HEALTHCHECK_TIMEOUT_SEC);
    console.log("RAILWAY_ENVIRONMENT: ", process.env.RAILWAY_ENVIRONMENT);
    console.log("Dir web: ", path_1.default.join(__dirname, "/web"));
    app.use("/", express_1.default.static(path_1.default.join(__dirname, "/web")));
    return app;
}
exports.createApp = createApp;
