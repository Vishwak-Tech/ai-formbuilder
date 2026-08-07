"use client";

import {
  ArrowRight,
  FileText,
  Headphones,
  Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function SubscriptionActions() {
  return (
    <section className="mt-8 grid gap-6 lg:grid-cols-[1fr_340px]">
      {/* Action Buttons */}

      <div className="rounded-2xl border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000]">
        <h2 className="text-xl font-black">
          Subscription Actions
        </h2>

        <p className="mt-2 text-sm text-gray-600">
          Manage your FormCraft Pro subscription and billing.
        </p>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button
            className="
            border-4
            border-black
            bg-black
            px-6
            py-6
            font-black
            text-white
            shadow-[4px_4px_0px_#000]
            transition-all
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[6px_6px_0px_#000]"
          >
            Manage Subscription
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <Button
            disabled
            variant="outline"
            className="
            border-4
            border-black
            px-6
            py-6
            font-black
            opacity-100"
          >
            <FileText className="mr-2 h-4 w-4" />
            Billing History
            <span className="ml-2 text-xs">
              (Soon)
            </span>
          </Button>
        </div>
      </div>

      {/* Support */}

      <div className="rounded-2xl border-4 border-black bg-cyan-300 p-6 shadow-[8px_8px_0px_#000]">
        <div className="flex items-center gap-3">
          <div className="rounded-xl border-2 border-black bg-white p-2">
            <Headphones className="h-5 w-5" />
          </div>

          <h2 className="text-lg font-black">
            Need Help?
          </h2>
        </div>

        <p className="mt-4 text-sm leading-6">
          Our support team is here to help with
          subscriptions, billing, and technical issues.
        </p>

        <div className="mt-6 flex items-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-3">
          <Mail className="h-4 w-4" />

          <span className="text-sm font-bold">
            support@formcraft.dev
          </span>
        </div>

        <p className="mt-3 text-xs text-gray-700">
          Average response time: within 24 hours.
        </p>
      </div>
    </section>
  );
}

export default SubscriptionActions;