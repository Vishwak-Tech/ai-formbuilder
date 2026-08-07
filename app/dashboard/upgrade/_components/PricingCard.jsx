"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Check, Crown, X } from "lucide-react";
import { startRazorpayPayment } from "@/utils/payment";

function PricingCard() {
  const { user } = useUser();

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* FREE PLAN */}

      <div className="overflow-hidden rounded-2xl border-4 border-black bg-white shadow-[8px_8px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000]">
        <div className="border-b-4 border-black bg-gray-100 p-5">
          <p className="text-sm font-black uppercase">Current Plan</p>

          <h2 className="mt-2 text-3xl font-black">FREE</h2>

          <p className="mt-1 text-lg font-bold">
            ₹0 <span className="text-base font-normal">Forever</span>
          </p>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Up to 5 AI Forms</span>
          </div>

          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Unlimited Responses</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <X size={18} />
            <span>Analytics</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <X size={18} />
            <span>Premium Themes</span>
          </div>

          <div className="flex items-center gap-3 text-gray-400">
            <X size={18} />
            <span>Custom Branding</span>
          </div>

          <div className="mt-6 rounded-xl border-4 border-black bg-gray-100 py-3 text-center font-black">
            Current Plan
          </div>
        </div>
      </div>

      {/* PRO PLAN */}

      <div className="relative overflow-hidden rounded-2xl border-4 border-black bg-yellow-300 shadow-[8px_8px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000]">
        <div className="absolute right-5 top-5 rounded-full border-2 border-black bg-pink-300 px-3 py-1 text-xs font-black uppercase">
          Most Popular
        </div>

        <div className="border-b-4 border-black p-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border-2 border-black bg-white p-2">
              <Crown size={22} />
            </div>

            <div>
              <p className="text-sm font-black uppercase">FormCraft Pro</p>

              <h2 className="text-5xl font-black">₹299</h2>

              <p className="font-semibold">Per Month</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Unlimited AI Forms</span>
          </div>

          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Unlimited Responses</span>
          </div>

          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Advanced Analytics</span>
          </div>

          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Premium Themes</span>
          </div>

          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Remove Branding</span>
          </div>

          <div className="flex items-center gap-3">
            <Check size={18} />
            <span>Priority Support</span>
          </div>

          <Button
            onClick={() =>
              startRazorpayPayment({
                plan: "PRO_MONTHLY",
                user,
                onSuccess: (payment) => console.log(payment),
                onFailure: () => console.log("Payment Cancelled"),
              })
            }
            className="mt-4 w-full border-4 border-black bg-black py-6 text-lg font-black text-white shadow-[4px_4px_0px_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
          >
            Upgrade with Razorpay
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PricingCard;
