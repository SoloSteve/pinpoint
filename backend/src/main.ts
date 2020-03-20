import * as Koa from "koa";
import * as http from "http";
import env from "./config/environment";
import logger from "./loaders/logger";
import loadKoa from "./loaders/koa";
import roomLoader from "./api/room";

async function main() {
  const app = new Koa();
  const router = loadKoa(app);

  roomLoader(router);

  app.use(router.routes());

  let server = http.createServer(app.callback());
  server.listen({
    port: env.HTTP_PORT,
    host: "127.0.0.1",
    path: undefined, // For IPC
  });

  logger.info("Server Started");
}

main().then(() => {
  logger.debug("Main ran successfully");
}).catch((e) => {
  logger.error("Main threw an error", {
    error: e
  });
});