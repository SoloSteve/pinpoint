import {Server, Socket} from "socket.io";
import {JSONSchema4} from "json-schema"
import logger from "../loaders/logger";
import {AgentBasedSocket, socketJoinRoomData, socketJoinRoomSchema} from "../types/room";
import Room from "../services/room";
import {WebsocketValidationError} from "../types/exceptions";
import {BaseSafeboxError} from "safebox";
import * as Ajv from "ajv";
import {BAD_REQUEST} from "http-status-codes";

const validator = new Ajv();

function endpoint<T>(socket: Socket, endpoint: string, schema: JSONSchema4, callback: (data: T) => void) {
  socket.on(endpoint, (data) => {
    if (!validator.validate(schema, data)) {
      socket.emit("exception", {
        endpoint,
        error: {
          message: "Invalid data",
          errorCode: BAD_REQUEST
        }
      });
      return;
    }

    try {
      callback(data as T);
    } catch (error) {
      if (error instanceof WebsocketValidationError || error instanceof BaseSafeboxError) {
        socket.emit("exception", {
          endpoint,
          error
        });
        logger.info("Encountered user error", {
          endpoint,
          id: socket.id,
          error,
        })
      } else {
        socket.emit("exception", {
          endpoint,
          error: "Internal Error"
        });
        logger.warn("Encountered unexpected error on endpoint", {
          endpoint,
          data,
          id: socket.id,
          // @ts-ignore
          roomData: socket.agent?.get(),
          error
        });
      }
    }
  });
}

export default (wss: Server) => {
  wss.on("connect", (socket: AgentBasedSocket) => {
    logger.debug("Socket Connected", {
      id: socket.id,
      ipAddr: socket.handshake.headers["x-real-ip"]
    });
    socket.on("disconnect", (reason) => {
      logger.debug("Socket Disconnected", {
        id: socket.id,
        reason,
      });
      socket.leaveAll();
      socket.agent = undefined;
    });

    endpoint<socketJoinRoomData>(socket, "join", socketJoinRoomSchema, (data) => {
      let roomUID = data.roomId.substring(data.roomId.indexOf("-") + 1);
      const room = Room.get(roomUID);

      if (socket.rooms.hasOwnProperty("roomId")) {
        throw new WebsocketValidationError(400, "Already Joined Room");
      }
      if (room === null) {
        throw new WebsocketValidationError(400, "Room does not exist");
      }

      socket.agent = room.joinRoom(socket.id);

      const everything = socket.agent.get();

      socket.emit("room-data", everything);
    });
  });
}