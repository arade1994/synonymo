import { vi } from "vitest";

export const mockPost = vi.fn();
export const mockGet = vi.fn();

const mockClient = {
  post: mockPost,
  get: mockGet,
};

export default mockClient;
