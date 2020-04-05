import * as Koa from "koa";
import * as http from "http";
import env from "./config/environment";
import logger from "./loaders/logger";
import loadKoa from "./loaders/koa";
import loadWebsocket from "./loaders/websocket";
import roomLoader from "./api/room";
import websocketLoader from "./api/websocket";

async function main() {
  const app = new Koa();
  const router = loadKoa(app);

  roomLoader(router);

  app.use(router.routes());

  const server = http.createServer(app.callback());
  const wss = loadWebsocket(server);

  websocketLoader(wss);

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