"use client";

import {
  CalendarDays,
  CreditCard,
  Crown,
  ShieldCheck,
} from "lucide-react";

function SubscriptionStats({subscription}) {
  const stats = [
  {
    title: "Plan",
    value: subscription.plan,
    icon: Crown,
    color: "bg-yellow-300",
  },
  {
    title: "Status",
    value: subscription.status,
    icon: ShieldCheck,
    color: "bg-green-300",
  },
  {
    title: "Billing",
    value: subscription.billingCycle,
    icon: CreditCard,
    color: "bg-cyan-300",
  },
  {
    title: "Renewal",
    value: new Date(
      subscription.expiryDate
    ).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
    icon: CalendarDays,
    color: "bg-pink-300",
  },
];

  return (
    <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => (
        <div
          key={item.title}
          className="
            rounded-2xl
            border-4
            border-black
            bg-white
            p-5
            shadow-[6px_6px_0px_#000]
            transition-all
            duration-200
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[10px_10px_0px_#000]
          "
        >
          <div className="flex items-center justify-between">
            <div
              className={`rounded-xl border-2 border-black p-2 ${item.color}`}
            >
              <item.icon className="h-5 w-5" />
            </div>

            <p className="text-xs font-bold uppercase text-gray-500">
              {item.title}
            </p>
          </div>

          <h2 className="mt-5 text-xl font-black">
            {item.value}
          </h2>
        </div>
      ))}
    </section>
  );
}


export default SubscriptionStats;