
import { beforeEach, describe, expect, test, vi } from "vitest";

const {
  mockFindFirst,
  mockAnd,
  mockEq,
  mockGt,
} = vi.hoisted(() => ({
  mockFindFirst: vi.fn(),
  mockAnd: vi.fn((...conditions) => ({
    type: "and",
    conditions,
  })),
  mockEq: vi.fn((column, value) => ({
    type: "eq",
    column,
    value,
  })),
  mockGt: vi.fn((column, value) => ({
    type: "gt",
    column,
    value,
  })),
}));

vi.mock("@/configs", () => ({
  db: {
    query: {
      subscriptions: {
        findFirst: mockFindFirst,
      },
    },
  },
}));

vi.mock("@/configs/schema", () => ({
  subscriptions: {
    clerkUserId: "clerkUserId",
    status: "status",
    isActive: "isActive",
    expiryDate: "expiryDate",
  },
}));

vi.mock("drizzle-orm", () => ({
  and: mockAnd,
  eq: mockEq,
  gt: mockGt,
}));

import { getUserSubscription, isProUser } from "./subscription";

describe("getUserSubscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns the user's active subscription", async () => {
    const subscription = {
      clerkUserId: "user_123",
      status: "ACTIVE",
      isActive: true,
      expiryDate: new Date("2027-01-01"),
    };

    mockFindFirst.mockResolvedValue(subscription);

    const result = await getUserSubscription("user_123");

    expect(result).toEqual(subscription);
    expect(mockFindFirst).toHaveBeenCalledTimes(1);
  });

  test("queries by user, active status, enabled flag, and future expiry", async () => {
    mockFindFirst.mockResolvedValue(undefined);

    await getUserSubscription("user_123");

    expect(mockEq).toHaveBeenCalledWith("clerkUserId", "user_123");
    expect(mockEq).toHaveBeenCalledWith("status", "ACTIVE");
    expect(mockEq).toHaveBeenCalledWith("isActive", true);

    expect(mockGt).toHaveBeenCalledWith(
      "expiryDate",
      expect.any(Date),
    );

    expect(mockAnd).toHaveBeenCalledTimes(1);
    expect(mockAnd.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        type: "eq",
        column: "clerkUserId",
        value: "user_123",
      }),
    );
    expect(mockAnd.mock.calls[0]).toHaveLength(4);
  });

  test("returns undefined when no qualifying subscription exists", async () => {
    mockFindFirst.mockResolvedValue(undefined);

    const result = await getUserSubscription("user_123");

    expect(result).toBeUndefined();
  });

  test("throws when the database query fails", async () => {
    mockFindFirst.mockRejectedValue(new Error("Database unavailable"));

    await expect(getUserSubscription("user_123")).rejects.toThrow(
      "Database unavailable",
    );
  });
});

describe("isProUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("returns true when a subscription exists", async () => {
    mockFindFirst.mockResolvedValue({
      clerkUserId: "user_123",
      status: "ACTIVE",
      isActive: true,
    });

    await expect(isProUser("user_123")).resolves.toBe(true);
  });

  test("returns false when no subscription exists", async () => {
    mockFindFirst.mockResolvedValue(undefined);

    await expect(isProUser("user_123")).resolves.toBe(false);
  });
  
test("propagates database errors when checking Pro status", async () => {
  mockFindFirst.mockRejectedValue(new Error("Database unavailable"));

  await expect(isProUser("user_123")).rejects.toThrow(
    "Database unavailable",
  );
});

});
