/*
Koa Loader
==========

Bootstrap a the koa instance.
This includes middleware.
 */

import * as Koa from "koa";
import * as Router from "@koa/router";

import env from "../config/environment";

const app = new Koa();
const router = new Router({
  sensitive: true,
  methods: ["get"],
  prefix: `/${env.INSTANCE_ID}`
});

app.proxy = env.BEHIND_PROXY;

app.use(router.routes());

app.listen(env.HTTP_PORT);

export { app, router };
