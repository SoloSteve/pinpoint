import {RoomOptions} from "../types/room";
import {nanoid} from "nanoid/non-secure";
import {LocalMemory, Path, PathPermission, PermissionType, Safebox, SafeboxAgent} from "safebox";
import {defaultRoom, roomSchema} from "../models/room";
import logger from "../loaders/logger";

export default class Room {
  private static rooms: Map<string, Room> = new Map<string, Room>();

  public readonly id: string;

  private readonly safebox: Safebox
  private roomDeletionTimeoutId: NodeJS.Timeout | undefined;
  private readonly roomDeletionTimeoutLength: number;

  public constructor(options: RoomOptions) {
    this.id = Room.getUniqueId(options.roomIdLength);
    this.roomDeletionTimeoutLength = options.roomDeletionTimeoutLength;

    Room.rooms.set(this.id, this);

    this.safebox = new Safebox(roomSchema, new LocalMemory(), defaultRoom);
    this.checkAndStartRoomDeletionCountdown();
  }

  public static get(id: string): Room | null {
    return Room.rooms.get(id) || null;
  }

  private static getUniqueId(length: number): string {
    let id;
    do {
      id = nanoid(length);
    } while (Room.rooms.has(id));
    return id;
  }

  public joinRoom(joinerId: string): SafeboxAgent {
    this.safebox.set(["users", joinerId], {});
    clearTimeout(<NodeJS.Timeout>this.roomDeletionTimeoutId);
    return this.safebox.getAgent(
      new PathPermission(
        ["users", joinerId],
        PermissionType.GET,
        PermissionType.SET,
      ),
      new PathPermission(
        ["users"],
        PermissionType.GET
      )
    );
  }

  public leaveRoom(leaverId: string): Path {
    const userPath = ["users", leaverId];
    this.safebox.delete(userPath);
    this.checkAndStartRoomDeletionCountdown();
    return userPath;
  }

  private checkAndStartRoomDeletionCountdown() {
    if (Object.keys(this.safebox.get(["users"])).length === 0) {
      this.roomDeletionTimeoutId = setTimeout(() => {
        if (Object.keys(this.safebox.get(["users"])).length === 0) {
          Room.rooms.delete(this.id);
          logger.info("Deleted Empty Room", {roomId: this.id});
        }
      }, this.roomDeletionTimeoutLength);
    }
  }
}