import { vi } from "vitest";

export const mockPush = vi.fn();

const routerMock = {
  route: "/",
  pathname: "/",
  query: {},
  asPath: "/",
  push: mockPush,
};

export default routerMock;
