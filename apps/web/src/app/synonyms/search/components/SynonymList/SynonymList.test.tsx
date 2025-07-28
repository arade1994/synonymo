import { describe, expect, test } from "vitest";

import { render } from "@testing-library/react";

import SynonymList from "./SynonymList";

describe("SynonymList", () => {
  test("It should match a snapshot when rendered by default with no items", () => {
    const { baseElement } = render(<SynonymList items={[]} word="test" />);
    expect(baseElement).toMatchSnapshot();
  });

  test("It should match a snapshot when rendered by default with items", () => {
    const { baseElement } = render(
      <SynonymList items={["test2"]} word="test" />
    );
    expect(baseElement).toMatchSnapshot();
  });
});
