import { beforeEach, describe, expect, test, vi } from "vitest";

const { mockCreate } = vi.hoisted(() => {
  const mockCreate = vi.fn();

  return {
    mockCreate,
  };
});

vi.mock("@/lib/razorpay", () => ({
  razorpay: {
    orders: {
      create: mockCreate,
    },
  },
}));

import { POST } from "./route";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/create-order", () => {
  test("returns 400 when an invalid plan is selected", async () => {
    const request = new Request(
      "http://localhost/api/create-order",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plan: "INVALID_PLAN",
        }),
      },
    );

    const response = await POST(request);

    expect(response.status).toBe(400);

    const data = await response.json();

    expect(data).toEqual({
      error: "Invalid plan selected",
    });
    expect(mockCreate).not.toHaveBeenCalled();
  });
  test("creates a monthly Pro order successfully", async () => {
  mockCreate.mockResolvedValue({
    id: "order_test_123",
    amount: 29900,
    currency: "INR",
  });

  const request = new Request(
    "http://localhost/api/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: "PRO_MONTHLY",
      }),
    },
  );

  const response = await POST(request);

  expect(response.status).toBe(200);

  const data = await response.json();

  expect(data).toEqual({
    id: "order_test_123",
    amount: 29900,
    currency: "INR",
  });

  expect(mockCreate).toHaveBeenCalledWith(
    expect.objectContaining({
      amount: 29900,
      currency: "INR",
      payment_capture: true,
    }),
  );
});
test("creates a yearly Pro order successfully", async () => {
  mockCreate.mockResolvedValue({
    id: "order_yearly_123",
    amount: 299900,
    currency: "INR",
  });

  const request = new Request(
    "http://localhost/api/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: "PRO_YEARLY",
      }),
    },
  );

  const response = await POST(request);

  expect(response.status).toBe(200);

  const data = await response.json();

  expect(data).toEqual({
    id: "order_yearly_123",
    amount: 299900,
    currency: "INR",
  });

  expect(mockCreate).toHaveBeenCalledWith(
    expect.objectContaining({
      amount: 299900,
      currency: "INR",
      payment_capture: true,
    }),
  );
});
test("returns 500 when Razorpay order creation fails", async () => {
  mockCreate.mockRejectedValue(
    new Error("Razorpay API failed"),
  );

  const request = new Request(
    "http://localhost/api/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: "PRO_MONTHLY",
      }),
    },
  );

  const response = await POST(request);

  expect(response.status).toBe(500);

  const data = await response.json();

  expect(data).toEqual({
    error: "Unable to create order",
  });
});
});