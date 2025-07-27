import { vi } from "vitest";

export const mockPost = vi.fn();

const mockClient = {
  post: mockPost,
};

export default mockClient;
