
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

    await middleware(
      { protect: mockProtect },
      { nextUrl: { pathname: "/dashboard" } },
    );

    expect(mockIsProtectedRoute).toHaveBeenCalledWith(
      expect.objectContaining({
        nextUrl: { pathname: "/dashboard" },
      }),
    );
    expect(mockProtect).toHaveBeenCalledTimes(1);
  });

  test("protects nested dashboard routes", async () => {
    mockIsProtectedRoute.mockReturnValue(true);

    await middleware(
      { protect: mockProtect },
      { nextUrl: { pathname: "/dashboard/analytics" } },
    );

    expect(mockProtect).toHaveBeenCalledTimes(1);
  });

  test("does not protect public routes", async () => {
    mockIsProtectedRoute.mockReturnValue(false);

    await middleware(
      { protect: mockProtect },
      { nextUrl: { pathname: "/sign-in" } },
    );

    expect(mockProtect).not.toHaveBeenCalled();
  });
});
