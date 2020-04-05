import {JSONSchema4} from "json-schema";

export const roomSchema: JSONSchema4 = {
  type: "object",
  required: ["users"],
  properties: {
    users: {
      type: "object",
    }
  }
};