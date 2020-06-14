import {JSONSchema4} from "json-schema";
import {Socket} from "socket.io";
import {SafeboxAgent} from "safebox";

export interface AgentBasedSocket extends Socket {
  agent?: SafeboxAgent;
  roomId?: string;
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

export interface socketChangeSingleData {
  path: string[];
  value: any;
  change: string;
}

export const socketChangeSingleDataSchema: JSONSchema4 = {
  type: "object",
  required: ["path", "value", "change"],
  properties: {
    path: {
      type: "array",
      items: {

        type: "string"
      }
    },
    value: {
      type: ["array", "boolean", "null", "number", "object", "string"]
    },
    change: {
      type: "string"
    }
  }
}