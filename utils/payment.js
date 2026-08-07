export async function startRazorpayPayment({
  plan,
  user,
  onSuccess,
  onFailure,
}) {
  try {
    // Create Razorpay Order
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...response,
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        plan,
      }),
    });

    const order = await res.json();

    if (!order.id) {
      throw new Error("Unable to create payment order.");
    }
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,

      amount: order.amount,

      currency: order.currency,

      name: "FormCraft",

      description: "FormCraft Pro Subscription",

      image: "/logo.png",

      order_id: order.id,

      prefill: {
        name: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
      },

      theme: {
        color: "#FACC15",
      },

      handler: async function (response) {
        try {
          const verify = await fetch("/api/verify-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(response),
          });

          const result = await verify.json();

          if (!verify.ok || !result.success) {
            throw new Error(result.message || "Payment verification failed.");
          }

          console.log("✅ Payment Verified");

          if (onSuccess) {
            onSuccess(response);
          }
        } catch (error) {
          console.error(error);

          if (onFailure) {
            onFailure(error);
          }
        }
      },

      modal: {
        ondismiss() {
          console.log("Payment Cancelled");

          if (onFailure) {
            onFailure("Payment Cancelled");
          }
        },
      },
    };

    if (!window.Razorpay) {
      throw new Error("Razorpay SDK failed to load.");
    }
    const razorpay = new window.Razorpay(options);

    razorpay.open();
  } catch (error) {
    console.error(error);

    if (onFailure) {
      onFailure(error);
    }
  }
}
