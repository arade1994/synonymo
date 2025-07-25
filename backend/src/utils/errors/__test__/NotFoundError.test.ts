import { CustomError } from "../CustomError";
import { NotFoundError } from "../NotFoundError";

describe("NotFoundError", () => {
  let error: NotFoundError;

  beforeEach(() => {
    error = new NotFoundError();
  });

  test("should be an instance of Error, CustomError and NotFoundError", () => {
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(CustomError);
    expect(error).toBeInstanceOf(NotFoundError);
  });

  test("should have correct statusCode", () => {
    expect(error.statusCode).toBe(404);
  });

  test("should have the correct message", () => {
    expect(error.message).toBe("Route not found");
  });

  test("should return correct serialized error structure", () => {
    expect(error.serializeErrors()).toEqual([{ message: "Not Found" }]);
  });

  test("should set the prototype correctly", () => {
    expect(Object.getPrototypeOf(error)).toBe(NotFoundError.prototype);
  });
});
