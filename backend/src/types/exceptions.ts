export class WebsocketValidationError extends Error {
  public readonly errorCode: number;

  constructor(code: number, ...params: any) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, WebsocketValidationError);
    }

    this.name = "WebsocketValidationError";
    this.errorCode = code;
  }
}

export class RoomDoesNotExistError extends WebsocketValidationError {
  constructor() {
    super(404);
    this.name = "RoomDoesNotExistError";
  }
}