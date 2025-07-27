import { describe, expect, test } from "vitest";

import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("HomePage", () => {
  test("It should render and match a snapshot by default", () => {
    const { baseElement } = render(<Home />);

    expect(baseElement).toMatchSnapshot();
  });

  test("It should render links for adding and searching synonyms", () => {
    render(<Home />);

    const addSynonymsLink = screen.getByTestId("addSynonymsLink");
    const searchSynonymsLink = screen.getByTestId("searchSynonymsLink");

    expect(addSynonymsLink).toBeDefined();
    expect(addSynonymsLink.innerHTML).toEqual("Add Synonyms");
    expect(searchSynonymsLink).toBeDefined();
    expect(searchSynonymsLink.innerHTML).toEqual("Search Synonyms");
  });
});
