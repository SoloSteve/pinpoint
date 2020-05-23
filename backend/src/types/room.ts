import {JSONSchema4} from "json-schema";
import {Socket} from "socket.io";
import {SafeboxAgent} from "safebox";

export interface AgentBasedSocket extends Socket {
  agent?: SafeboxAgent;
}

export interface RoomOptions {
  roomIdLength: number;
}

export interface socketJoinRoomData {
  roomId: string;
}

export const socketJoinRoomSchema: JSONSchema4 = {
  type: "object",
  required: ["roomId"],
  properties: {
    roomId: {
      type: "string"
    }
  }
}