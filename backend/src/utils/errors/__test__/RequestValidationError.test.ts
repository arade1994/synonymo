import type { ValidationError } from "express-validator";

import { RequestValidationError } from "../RequestValidationError";

describe("RequestValidationError", () => {
  test("should set the status code to 400", () => {
    const err = new RequestValidationError([]);
    expect(err.statusCode).toBe(400);
  });

  test("should inherit from Error and CustomError", () => {
    const err = new RequestValidationError([]);
    expect(err).toBeInstanceOf(Error);
    expect(err).toBeInstanceOf(RequestValidationError);
  });

  test("should have the correct default message", () => {
    const err = new RequestValidationError([]);
    expect(err.message).toBe("Request is not valid");
  });

  test("should serialize field errors correctly", () => {
    const mockErrors: ValidationError[] = [
      { type: "field", msg: "Invalid email", path: "email", location: "body" },
      {
        type: "field",
        msg: "Password too short",
        path: "password",
        location: "body",
      },
    ];

    const err = new RequestValidationError(mockErrors);

    expect(err.serializeErrors()).toEqual([
      { message: "Invalid email", field: "email" },
      { message: "Password too short", field: "password" },
    ]);
  });

  test("should serialize non-field errors correctly", () => {
    const mockErrors: ValidationError = {
      type: "unknown_fields",
      msg: "Something went wrong",
      path: "",
      location: "body",
    } as unknown as ValidationError;
    const err = new RequestValidationError([mockErrors]);

    expect(err.serializeErrors()).toEqual([
      { message: "Something went wrong" },
    ]);
  });

  test("should set prototype chain correctly", () => {
    const err = new RequestValidationError([]);
    expect(Object.getPrototypeOf(err)).toBe(RequestValidationError.prototype);
  });
});
