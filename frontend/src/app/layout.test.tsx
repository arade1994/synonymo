import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import RootLayout from "./layout";

describe("RootLayout", () => {
  test("It should render and match a snapshot by default", () => {
    const { baseElement } = render(
      <RootLayout>
        <div></div>
      </RootLayout>
    );

    expect(baseElement).toMatchSnapshot();
  });
});
