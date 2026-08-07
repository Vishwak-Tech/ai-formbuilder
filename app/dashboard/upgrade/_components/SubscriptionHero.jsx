"use client";

import { Crown, BadgeCheck } from "lucide-react";

function SubscriptionHero({subscription}) {
  return (
    <section
      className="
      mb-8
      rounded-2xl
      border-4
      border-black
      bg-lime-300
      p-6
      shadow-[8px_8px_0px_#000]"
    >
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <div className="rounded-xl border-4 border-black bg-white p-3">
            <Crown className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-2xl font-black">{subscription.plan}</h1>

            <p className="mt-1 text-sm text-gray-800">
              Your {subscription.billingCycle.toLowerCase()} subscription is active. and all premium features are unlocked.
            </p>
          </div>
        </div>

        {/* Right Badge */}
        <div
          className="
          flex
          items-center
          gap-2
          rounded-xl
          border-4
          border-black
          bg-white
          px-4
          py-2
          shadow-[4px_4px_0px_#000]"
        >
          <BadgeCheck className="h-5 w-5 text-green-600" />

          <span className="text-sm font-black uppercase">{subscription.status}</span>
        </div>
      </div>
    </section>
  );
}

export default SubscriptionHero;
