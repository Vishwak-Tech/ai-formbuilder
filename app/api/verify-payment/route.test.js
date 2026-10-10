
import { beforeEach, afterEach, describe, expect, test, vi } from "vitest";
import crypto from "crypto";

const {
  mockFindFirst,
  mockInsertValues,
  mockUpdateSet,
  mockUpdateWhere,
  mockInsert,
  mockUpdate,
} = vi.hoisted(() => ({
  mockFindFirst: vi.fn(),
  mockInsertValues: vi.fn(),
  mockUpdateSet: vi.fn(),
  mockUpdateWhere: vi.fn(),
  mockInsert: vi.fn(),
  mockUpdate: vi.fn(),
}));

vi.mock("@/configs", () => ({
  db: {
    query: {
      subscriptions: {
        findFirst: mockFindFirst,
      },
    },
    insert: mockInsert,
    update: mockUpdate,
  },
}));

vi.mock("@/configs/schema", () => ({
  subscriptions: {
    clerkUserId: "clerkUserId",
  },
}));

import { POST } from "./route";

const TEST_SECRET = "test-secret";

function signPayment(orderId, paymentId) {
  return crypto
    .createHmac("sha256", TEST_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");
}

function createRequest(overrides = {}) {
  const orderId = "order_test_123";
  const paymentId = "payment_test_123";

  const body = {
    razorpay_order_id: orderId,
    razorpay_payment_id: paymentId,
    razorpay_signature: signPayment(orderId, paymentId),
    clerkUserId: "user_test_123",
    email: "test@example.com",
    plan: "PRO_MONTHLY",
    ...overrides,
  };

  return new Request("http://localhost/api/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/verify-payment", () => {
  const originalSecret = process.env.RAZORPAY_KEY_SECRET;

  beforeEach(() => {
    vi.clearAllMocks();

    process.env.RAZORPAY_KEY_SECRET = TEST_SECRET;

    mockFindFirst.mockResolvedValue(undefined);
    mockInsertValues.mockResolvedValue(undefined);
    mockUpdateWhere.mockResolvedValue(undefined);

    mockInsert.mockReturnValue({
      values: mockInsertValues,
    });

    mockUpdate.mockReturnValue({
      set: mockUpdateSet,
    });

    mockUpdateSet.mockReturnValue({
      where: mockUpdateWhere,
    });
  });

  afterEach(() => {
    if (originalSecret === undefined) {
      delete process.env.RAZORPAY_KEY_SECRET;
    } else {
      process.env.RAZORPAY_KEY_SECRET = originalSecret;
    }
  });

  test("returns 400 for an invalid payment signature", async () => {
    const response = await POST(
      createRequest({ razorpay_signature: "invalid-signature" }),
    );

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      success: false,
      message: "Payment verification failed",
    });

    expect(mockFindFirst).not.toHaveBeenCalled();
    expect(mockInsert).not.toHaveBeenCalled();
  });

  test("creates a subscription for a new user", async () => {
    const response = await POST(createRequest());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      success: true,
      message: "Payment verified successfully",
    });

    expect(mockFindFirst).toHaveBeenCalledTimes(1);
    expect(mockInsert).toHaveBeenCalledTimes(1);

    expect(mockInsertValues).toHaveBeenCalledWith(
      expect.objectContaining({
        clerkUserId: "user_test_123",
        email: "test@example.com",
        plan: "PRO",
        billingCycle: "MONTHLY",
        status: "ACTIVE",
        isActive: true,
        razorpayOrderId: "order_test_123",
        razorpayPaymentId: "payment_test_123",
        expiryDate: expect.any(Date),
      }),
    );

    expect(mockUpdate).not.toHaveBeenCalled();
  });

  test("updates an existing subscription", async () => {
    mockFindFirst.mockResolvedValue({
      clerkUserId: "user_test_123",
    });

    const response = await POST(createRequest());

    expect(response.status).toBe(200);
    expect(mockUpdate).toHaveBeenCalledTimes(1);

    expect(mockUpdateSet).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "test@example.com",
        plan: "PRO",
        billingCycle: "MONTHLY",
        status: "ACTIVE",
        isActive: true,
      }),
    );

    expect(mockUpdateWhere).toHaveBeenCalledTimes(1);
    expect(mockInsert).not.toHaveBeenCalled();
  });

  test("sets yearly billing for a yearly plan", async () => {
    const response = await POST(
      createRequest({ plan: "PRO_YEARLY" }),
    );

    expect(response.status).toBe(200);

    expect(mockInsertValues).toHaveBeenCalledWith(
      expect.objectContaining({
        billingCycle: "YEARLY",
        expiryDate: expect.any(Date),
      }),
    );

    const insertedData = mockInsertValues.mock.calls[0][0];
    const expectedExpiry = new Date();
    expectedExpiry.setFullYear(expectedExpiry.getFullYear() + 1);

    expect(insertedData.expiryDate.getFullYear()).toBe(
      expectedExpiry.getFullYear(),
    );
  });

  test("returns 500 when the database lookup fails", async () => {
    mockFindFirst.mockRejectedValue(new Error("Database unavailable"));

    const response = await POST(createRequest());

    expect(response.status).toBe(500);
    expect(await response.json()).toEqual({
      success: false,
      message: "Internal Server Error",
    });
  });
});
