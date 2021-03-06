import { createApp } from "./app";

const env = process.env.NODE_ENV;
const port = process.env.PORT;
const url = process.env.RAILWAY_STATIC_URL || "localhost";

(async () => {
  const App = await createApp();
  App.listen(port, () => {
    const protocole = env === "PROD" ? "https" : "http";
    console.log(
      `⚡️ [server][${env}]: Server is running at ${protocole}://${url}:${port} .... \u{1F37B}`
    );
  });
})();
