import { vi } from "vitest";

const authContextMock = {
  signed: true,
  user: undefined,
  checkCurrentAuthUser: vi.fn(),
  signIn: vi.fn(),
  signOut: vi.fn(),
  isAdmin: false
};

export default authContextMock;