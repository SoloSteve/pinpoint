/*
Environment Configuration
=========================

Contains configurations that are related to the specific environment
running the project instance.
 */

import * as dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (dotenv.config().error) {
  console.warn("Could not find .env file");
}

/**
 * Global Server Environment Config.
 * =================================
 *
 * This config object contains dynamic values based on the type of environment
 * the project is run in.
 *
 * This object's keys are the names of the environment value keys
 * and the object's values are the default value that will be set if the
 * corresponding key does not exist in the environment.
 */
const env: { [key: string]: any } = {
  NODE_ENV: "development",
  BEHIND_PROXY: false,
  INSTANCE_ID: "dev",
  HTTP_PORT: 8040,
  APP_URL: "http://localhost:8080",
};

// Get from ENV or use default value
// ENV variables are parsed JSON style
Object.entries(env).forEach(([key, value]) => {
  let environmentValue = process.env[key];

  if (environmentValue === undefined) {
    return value;
  }

  try {
    value = JSON.parse(environmentValue);
  } catch (e) {
    console.warn(`Unable to parse '${key}=${environmentValue}'`);
    value = environmentValue;
  }
  env[key] = value;
});

// Log the resulting env
Object.entries(env).forEach(([key, value]) =>
  console.log(`ENV: ${key}=${JSON.stringify(value)}`)
);

export default env;
