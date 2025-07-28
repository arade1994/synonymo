import { describe, expect, test, vi } from "vitest";

import mockClient, { mockPost } from "@/mocks/buildClient.mock";
import routerMock, { mockPush } from "@/mocks/router.mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SynonymsPage from "./page";

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
}));

vi.mock("@/api/buildClient", () => {
  return {
    default: () => mockClient,
  };
});

describe("SynonymsPage", () => {
  test("It should render and match a snapshot by default", () => {
    const { baseElement } = render(<SynonymsPage />);

    expect(baseElement).toMatchSnapshot();
  });

  test("It should render the home link", () => {
    render(<SynonymsPage />);

    const homeLink = screen.getByTestId("homeLink");

    expect(homeLink).toBeDefined();
  });

  test("It should render the word input", async () => {
    render(<SynonymsPage />);

    const wordInput = screen.getByTestId("wordInput");
    expect(wordInput).toBeDefined();

    await userEvent.click(wordInput);
    await userEvent.type(wordInput, "happy");
  });

  test("It should render the synonym input", async () => {
    render(<SynonymsPage />);

    const synonymInput = screen.getByTestId("synonymInput");
    expect(synonymInput).toBeDefined();

    await userEvent.click(synonymInput);
    await userEvent.type(synonymInput, "joyful");
  });

  test("It should call the post method with the correct arguments", async () => {
    render(<SynonymsPage />);

    const wordInput = screen.getByTestId("wordInput");
    const synonymInput = screen.getByTestId("synonymInput");
    const addSynonymButton = screen.getByTestId("addSynonymButton");

    await userEvent.click(wordInput);
    await userEvent.type(wordInput, "happy");
    await userEvent.click(synonymInput);
    await userEvent.type(synonymInput, "joyful");
    await userEvent.click(addSynonymButton);

    expect(mockPost).toHaveBeenCalledWith("/api/synonyms", {
      word: "happy",
      synonym: "joyful",
    });
    expect(mockPush).toHaveBeenCalledWith("/");
  });
});
