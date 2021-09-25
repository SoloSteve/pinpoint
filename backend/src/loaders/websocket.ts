/*
Websocket Server Loader
=======================

Bootstrap the websocket server instance.
 */

import * as io from "socket.io";
import {Server} from "http";
import {defaultWebsocketOptions} from "../config/websocket";
import env from "../config/environment";

export default (httpServer: Server): io.Server => {
  return io(httpServer, {
    path: `/${env.INSTANCE_ID}`,
    pingInterval: defaultWebsocketOptions.pingInterval,
    pingTimeout: defaultWebsocketOptions.pingTimeout,
    serveClient: false,
    cookie: false,
    transports: ["websocket"],
  });
}

