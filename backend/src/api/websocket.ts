import {Server} from "socket.io";
import logger from "../loaders/logger";
import {socketJoinRoomData} from "../types/room";

export default (wss: Server) => {
  wss.on("connect", (socket) => {
    logger.debug("Socket Connected", {
      id: socket.id,
      ipAddr: socket.handshake.headers["x-real-ip"]
    });
    socket.on("disconnect", (reason) => {
      logger.debug("Socket Disconnected", {
        id: socket.id,
        reason,
      });
    });

    socket.on("join", (data: socketJoinRoomData) => {
      if (!data.hasOwnProperty("roomId")) {

      }
    });
  });
}