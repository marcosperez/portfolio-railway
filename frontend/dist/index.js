"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = process.env.PORT;
const url = process.env.RAILWAY_STATIC_URL || "localhost";
const App = (0, app_1.createApp)();
App.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://${url}:${port} ....`);
});
