import { describe, expect, test, vi } from "vitest";

import mockClient, { mockGet } from "@/mocks/buildClient.mock";
import routerMock from "@/mocks/router.mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SearchSynonymsPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

vi.mock("@/api/buildClient", () => {
  return {
    default: () => mockClient,
  };
});

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

  test("It should render the word input", async () => {
    render(<SearchSynonymsPage />);

    const wordInput = screen.getByTestId("wordInput");
    expect(wordInput).toBeDefined();

    await userEvent.click(wordInput);
    await userEvent.type(wordInput, "happy");
  });

  test("It should render the search button", async () => {
    render(<SearchSynonymsPage />);

    const searchButton = screen.getByTestId("searchSynonymButton");
    expect(searchButton).toBeDefined();
  });

  test("It should call the get method with the correct arguments", async () => {
    render(<SearchSynonymsPage />);

    const wordInput = screen.getByTestId("wordInput");
    const searchButton = screen.getByTestId("searchSynonymButton");

    await userEvent.click(wordInput);
    await userEvent.type(wordInput, "happy");
    await userEvent.click(searchButton);

    expect(mockGet).toHaveBeenCalledWith("/api/synonyms/happy");
  });
});
