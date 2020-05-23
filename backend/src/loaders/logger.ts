/*
Logger
======

Instantiates the logger with the configurations
corresponding to the environment.
 */

import * as winston from "winston";
import env from "../config/environment";

const transports = [];
if (env.NODE_ENV === "development") {
  transports.push(
    new winston.transports.Console({
      format: winston.format.cli(),
      level: "debug"
    })
  );
}

export default winston.createLogger({
  transports
});
