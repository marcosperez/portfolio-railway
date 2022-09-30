import dotenv from "dotenv";
import { createApp } from "./app";

dotenv.config();

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const url = process.env.STATIC_URL || "localhost";

(async () => {
  const App = await createApp();
  App.listen(port, () => {
    const protocole = env === "PROD" ? "https" : "http";
    console.log(
      `⚡️ [server][${env}]: Server is running at ${protocole}://${url}:${port} .... \u{1F37B}`
    );
  });
})();
