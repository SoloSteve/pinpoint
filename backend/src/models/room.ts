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
          icon: {
            type: "string",
            maxLength: 3
          },
          latency: {
            type: "integer",
            minimum: 0,
            maximum: 5000,
          },
          focus: {
            type: "boolean"
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
    },
    waypoints: {
      type: "object",
      additionalProperties: {
        type: "object",
        properties: {
          name: {
            type: "string",
            maxLength: 30
          },
          iconId: {
            type: "string",
            maxLength: 3
          },
          position: {
            type: "object",
            required: ["lat", "lng"],
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