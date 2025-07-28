import { describe, expect, test, vi } from "vitest";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Input from "./Input";

const mockOnChange = vi.fn();

describe("Input", () => {
  test("It should match a snapshot when rendered by default", () => {
    const { baseElement } = render(
      <Input
        errors={[]}
        id="test"
        placeholder="test"
        type="text"
        value="test"
        onChange={mockOnChange}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  test("It should update the value when the input is changed", async () => {
    render(
      <Input
        errors={[]}
        id="test"
        placeholder="test"
        type="text"
        value="test"
        onChange={mockOnChange}
      />
    );

    const input = screen.getByTestId("test");
    expect(input).toBeDefined();
    await userEvent.type(input, "test2");
    expect(mockOnChange).toHaveBeenCalled();
  });
});
