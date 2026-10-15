
import { beforeEach, describe, expect, test, vi } from "vitest";

const { mockProtect, mockIsProtectedRoute } = vi.hoisted(() => ({
  mockProtect: vi.fn(),
  mockIsProtectedRoute: vi.fn(),
}));

vi.mock("@clerk/nextjs/server", () => ({
  clerkMiddleware: (callback) => callback,
  createRouteMatcher: () => mockIsProtectedRoute,
}));

import middleware from "./middleware";

describe("Clerk middleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockProtect.mockResolvedValue(undefined);
  });

  test("protects the dashboard route", async () => {
    mockIsProtectedRoute.mockReturnValue(true);

    const auth = Object.assign(vi.fn(), {
      protect: mockProtect,
    });

    await middleware(auth, {
      nextUrl: { pathname: "/dashboard" },
    });

    expect(mockIsProtectedRoute).toHaveBeenCalled();
    expect(mockProtect).toHaveBeenCalledTimes(1);
  });

  test("protects nested dashboard routes", async () => {
    mockIsProtectedRoute.mockReturnValue(true);

    const auth = Object.assign(vi.fn(), {
      protect: mockProtect,
    });

    await middleware(auth, {
      nextUrl: { pathname: "/dashboard/analytics" },
    });

    expect(mockProtect).toHaveBeenCalledTimes(1);
  });

  test("does not protect public routes", async () => {
    mockIsProtectedRoute.mockReturnValue(false);

    const auth = Object.assign(vi.fn(), {
      protect: mockProtect,
    });

    await middleware(auth, {
      nextUrl: { pathname: "/sign-in" },
    });

    expect(mockProtect).not.toHaveBeenCalled();
  });
});
