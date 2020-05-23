import Room from "../services/room";
import {defaultRoomOptions} from "../config/room";
import env from "../config/environment";
import * as HttpStatus from "http-status-codes";
import * as Router from "@koa/router";

export default (router: Router) => {
  router.get("/create", (context) => {
    let room = new Room(defaultRoomOptions);

    context.redirect(`/room/${env.INSTANCE_ID}-${room.id}`);
    context.body = room.id;
  });

  router.get("/room/:roomId", (context) => {
    let roomId: string | undefined = context.params["roomId"];

    if (roomId === undefined) {
      context.throw("No ID given", HttpStatus.BAD_REQUEST);
      return;
    }

    let roomUID = roomId.substring(roomId.indexOf("-") + 1);
    let room = Room.get(roomUID);

    if (room === null) {
      context.status = 404;
      context.body = "Room does not exist";
      return;
    }

    context.cookies.set("roomId", roomId, {
      httpOnly: false,
      overwrite: true
    });

    context.redirect(env.APP_URL);
  });
}