import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay";

export async function POST(req) {
  try {
    const { plan } = await req.json();

    let amount = 0;

    switch (plan) {
      case "PRO_MONTHLY":
        amount = 29900; // ₹299 in paise
        break;

      case "PRO_YEARLY":
        amount = 299900; // ₹2999 in paise
        break;

      default:
        return NextResponse.json(
          { error: "Invalid plan selected" },
          { status: 400 }
        );
    }

    const razorpay = getRazorpay();
    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: true,
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to create order" },
      { status: 500 }
    );
  }
}