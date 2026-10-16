"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { subscriptions } from "@/configs/schema";
import { and, eq, gt } from "drizzle-orm";

import PricingCard from "./_components/PricingCard";
import SubscriptionDashboard from "./SubscriptionDashboard";

export default function UpgradePage() {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [isPro, setIsPro] = useState(false);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    if (!user) return;

    const checkSubscription = async () => {
      try {
        const result = await db
          .select()
          .from(subscriptions)
          .where(
            and(
              eq(subscriptions.clerkUserId, user.id),
              eq(subscriptions.status, "ACTIVE"),
              eq(subscriptions.isActive, true),
              gt(subscriptions.expiryDate, new Date()),
            ),
          );

        if (result.length > 0) {
          setSubscription(result[0]);
          setIsPro(true);
        } else {
          setSubscription(null);
          setIsPro(false);
        }
      } catch (error) {
        console.error("Subscription Error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [user]);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <h2 className="text-2xl font-black">Loading Subscription...</h2>
      </div>
    );
  }

  return isPro ? (
    <SubscriptionDashboard subscription={subscription} />
  ) : (
    <PricingCard />
  );
}
