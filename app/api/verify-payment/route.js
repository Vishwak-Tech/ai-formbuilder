import { NextResponse } from "next/server";
import crypto from "crypto";
import { eq } from "drizzle-orm";

import { getDb } from "@/configs";
import { subscriptions } from "@/configs/schema";

export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      clerkUserId,
      email,
      plan,
    } = await req.json();

    // Verify Razorpay Signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment verification failed",
        },
        { status: 400 }
      );
    }

    // Calculate Expiry Date
    const expiryDate = new Date();

    if (plan === "PRO_MONTHLY") {
      expiryDate.setMonth(expiryDate.getMonth() + 1);
    } else if (plan === "PRO_YEARLY") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    }

    // Check Existing Subscription
    const db = getDb();
    const existingSubscription = await db.query.subscriptions.findFirst({
      where: eq(subscriptions.clerkUserId, clerkUserId),
    });

    const billingCycle =
      plan === "PRO_MONTHLY" ? "MONTHLY" : "YEARLY";

    if (existingSubscription) {
      // Renew Existing Subscription
      await db
        .update(subscriptions)
        .set({
          email,
          plan: "PRO",
          billingCycle,
          status: "ACTIVE",
          razorpayOrderId: razorpay_order_id,
          razorpayPaymentId: razorpay_payment_id,
          startDate: new Date(),
          expiryDate,
          isActive: true,
        })
        .where(eq(subscriptions.clerkUserId, clerkUserId));
    } else {
      // Create New Subscription
      await db.insert(subscriptions).values({
        clerkUserId,
        email,
        plan: "PRO",
        billingCycle,
        status: "ACTIVE",
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        startDate: new Date(),
        expiryDate,
        isActive: true,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Verify Payment Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}