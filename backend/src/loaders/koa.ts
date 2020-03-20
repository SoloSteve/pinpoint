/*
Koa Loader
==========

Bootstrap a the koa instance.
This includes middleware.
 */

import * as Koa from "koa";
import * as Router from "@koa/router";

import env from "../config/environment";


export default (app: Koa): Router => {
  const router = new Router({
    sensitive: true,
    methods: ["get"],
    prefix: env.NODE_ENV == "development" ? undefined : `/${env.INSTANCE_ID}`,
  });

  app.proxy = env.BEHIND_PROXY;

  return router;
};
