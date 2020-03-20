import {RoomOptions} from "../types/room";
import nanoId = require("nanoid/non-secure");

export default class Room {
  private static rooms: Map<string, Room> = new Map<string, Room>();

  public readonly id: string;

  // private readonly users: Map<string, undefined> = new Map<string, undefined>();

  public constructor(options: RoomOptions) {
    this.id = Room.getUniqueId(options.roomIdLength);

    Room.rooms.set(this.id, this);
  }

  public static get(id: string): Room | null {
    return Room.rooms.get(id) || null;
  }

  private static getUniqueId(length: number): string {
    let id;
    do {
      id = nanoId(length);
    } while (Room.rooms.has(id));
    return id;
  }
}