/*
Websocket Server Loader
=======================

Bootstrap the websocket server instance.
 */

import {Server as SocketServer} from "socket.io";
import {Server as HttpServer} from "http";
import {defaultWebsocketOptions} from "../config/websocket";
import env from "../config/environment";

export default (httpServer: HttpServer): SocketServer => {
  return new SocketServer(httpServer, {
    path: `/${env.INSTANCE_ID}`,
    pingInterval: defaultWebsocketOptions.pingInterval,
    pingTimeout: defaultWebsocketOptions.pingTimeout,
    serveClient: false,
    cookie: false,
    transports: ["websocket"],
  });
}

