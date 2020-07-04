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
      format: winston.format.simple(),
      level: "debug"
    })
  );
} else {
  transports.push(
    new winston.transports.Console({
      format: winston.format.simple(),
      level: "info"
    })
  );
}

export default winston.createLogger({
  transports
});
