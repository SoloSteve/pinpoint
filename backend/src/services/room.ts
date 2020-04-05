import {RoomOptions} from "../types/room";
import {nanoid} from "nanoid/non-secure";

export default class Room {
  private static rooms: Map<string, Room> = new Map<string, Room>();

  public readonly id: string;


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
      id = nanoid(length);
    } while (Room.rooms.has(id));
    return id;
  }
}