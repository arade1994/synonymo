import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import SearchSynonymsPage from "./page";

describe("SearchSynonymsPage", () => {
  test("It should render and match a snapshot by default", () => {
    const { baseElement } = render(<SearchSynonymsPage />);

    expect(baseElement).toMatchSnapshot();
  });

  test("It should render the home link", () => {
    render(<SearchSynonymsPage />);

    const homeLink = screen.getByTestId("homeLink");

    expect(homeLink).toBeDefined();
  });
});
