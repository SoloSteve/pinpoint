import {RoomOptions} from "../types/room";

export const defaultRoomOptions: RoomOptions = {
  roomIdLength: 6,
  roomDeletionTimeoutLength: 2 * 60 * 1000, // 2 minutes
};