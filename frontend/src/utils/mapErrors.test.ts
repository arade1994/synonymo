import { describe, expect, test } from "vitest";

import { type IApiError, mapErrors } from "./mapErrors";

describe("mapErrors", () => {
  test("It should return an empty object if no errors are provided", () => {
    const errors: IApiError[] = [];
    const result = mapErrors(errors);
    expect(result).toEqual({});
  });

  test("It should return an object with the correct errors", () => {
    const errors: IApiError[] = [
      { field: "word", message: "Word is required" },
      { field: "synonym", message: "Synonym is required" },
    ];
    const result = mapErrors(errors);
    expect(result).toEqual({
      word: ["Word is required"],
      synonym: ["Synonym is required"],
    });
  });
});
