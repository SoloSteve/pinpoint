import {JSONSchema4} from "json-schema";

export const roomSchema: JSONSchema4 = {
  type: "object",
  required: ["users"],
  properties: {
    users: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: {
            type: "string",
            minLength: 2,
            maxLength: 25
          },
          icon: {},
          latency: {
            type: "integer",
            minimum: 0,
            maximum: 5000,
          },
          connection: {
            type: "number",
            minimum: 0,
            maximum: 2
          },
          gps: {
            type: "number",
            minimum: 0,
            maximum: 3
          },
          magnetometer: {
            type: "number",
            minimum: 0,
            maximum: 3
          },
          position: {
            type: "object",
            required: ["lat", "lng", "accuracy"],
            properties: {
              lat: {
                type: "number",
                minimum: -90,
                maximum: 90
              },
              lng: {
                type: "number",
                minimum: -180,
                maximum: 180
              },
              accuracy: {
                type: "number",
                minimum: 0
              },
              heading: {
                type: ["number", "null"],
                minimum: 0,
                maximum: 359
              },
              speed: {
                type: ["number", "null"],
                minimum: 0
              },
              altitudeAccuracy: {
                type: ["number", "null"],
                minimum: 0
              }
            }
          }
        }
      }
    }
  }
};

export const defaultRoom = {
  users: {}
}