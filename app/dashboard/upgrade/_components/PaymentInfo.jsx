"use client";

import { CreditCard, Receipt, Hash, CalendarDays } from "lucide-react";

function PaymentInfo({subscription}) {
  const paymentDetails = [
    {
      label: "Provider",
      value: "Razorpay",
      icon: CreditCard,
      color: "bg-cyan-300",
    },
    {
      label: "Payment ID",
      value: subscription.razorpayPaymentId,
      icon: Receipt,
      color: "bg-yellow-300",
    },
    {
      label: "Order ID",
      value: subscription.razorpayOrderId,
      icon: Hash,
      color: "bg-pink-300",
    },
    {
      label: "Subscribed On",
      value: new Date(subscription.createdAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
      icon: CalendarDays,
      color: "bg-lime-300",
    },
  ];

  return (
    <section className="mb-8">
      <div className="mb-5">
        <h2 className="text-2xl font-black">Payment Information</h2>

        <p className="mt-1 text-sm text-gray-600">
          Details of your latest successful subscription payment.
        </p>
      </div>

      <div
        className="
        rounded-2xl
        border-4
        border-black
        bg-white
        p-6
        shadow-[8px_8px_0px_#000]"
      >
        <div className="divide-y-2 divide-black">
          {paymentDetails.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between py-4"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`rounded-xl border-2 border-black p-2 ${item.color}`}
                >
                  <item.icon className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase text-gray-500">
                    {item.label}
                  </p>

                  <p className="mt-1 font-black">{item.value}</p>
                </div>
              </div>

              <span className="rounded-lg border-2 border-black bg-gray-100 px-3 py-1 text-xs font-bold">
                Verified
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PaymentInfo;
