import {RoomOptions} from "../types/room";
import {nanoid} from "nanoid/non-secure";
import {LocalMemory, PathPermission, PermissionType, Safebox, SafeboxAgent} from "safebox";
import {defaultRoom, roomSchema} from "../models/room";

export default class Room {
  private static rooms: Map<string, Room> = new Map<string, Room>();

  public readonly id: string;

  private readonly safebox: Safebox

  public constructor(options: RoomOptions) {
    this.id = Room.getUniqueId(options.roomIdLength);

    Room.rooms.set(this.id, this);

    this.safebox = new Safebox(roomSchema, new LocalMemory(), defaultRoom);
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
    this.safebox.create(["users", joinerId], {});
    return this.safebox.getAgent(
      new PathPermission(
        ["users", joinerId],
        PermissionType.GET,
        PermissionType.MUTATE
      ),
      new PathPermission(
        ["users"],
        PermissionType.GET
      )
    );
  }
}