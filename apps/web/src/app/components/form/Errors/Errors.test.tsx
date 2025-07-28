import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import Errors from "./Errors";

describe("Errors", () => {
  test("It should match a snapshot when rendered by default with no errors", () => {
    const { baseElement } = render(<Errors errors={[]} />);
    expect(baseElement).toMatchSnapshot();
  });

  test("It should match a snapshot when rendered by default with errors", () => {
    const { baseElement } = render(<Errors errors={["test"]} />);
    expect(baseElement).toMatchSnapshot();
  });
});
