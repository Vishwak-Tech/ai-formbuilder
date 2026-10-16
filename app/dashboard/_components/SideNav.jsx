"use client";

import Link from "next/link";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { forms, subscriptions } from "@/configs/schema";
import { eq, and, gt } from "drizzle-orm";
import { Button } from "@/components/ui/button";

function SideNav() {
  const { user } = useUser();
  const [totalForms, setTotalForms] = useState(0);
  const [isPro, setIsPro] = useState(false);

  const maxFreeForms = 5;
  const percentage =
    maxFreeForms > 0 ? Math.min((totalForms / maxFreeForms) * 100, 100) : 0;

  const remainingForms = Math.max(maxFreeForms - totalForms, 0);

  useEffect(() => {
    if (!user) return;

    const loadSideNavData = async () => {
      try {
        const [formResult, subscriptionResult] = await Promise.all([
          db
            .select()
            .from(forms)
            .where(eq(forms.createdBy, user.primaryEmailAddress?.emailAddress)),
          db
            .select()
            .from(subscriptions)
            .where(
              and(
                eq(subscriptions.clerkUserId, user.id),
                eq(subscriptions.status, "ACTIVE"),
                eq(subscriptions.isActive, true),
                gt(subscriptions.expiryDate, new Date()),
              ),
            ),
        ]);

        setTotalForms(formResult.length);
        setIsPro(subscriptionResult.length > 0);
      } catch (error) {
        console.error("Failed to fetch side navigation data:", error);
      }
    };

    loadSideNavData();
  }, [user]);

  const menuList = [
    {
      id: 1,
      name: "My Forms",
      icon: LibraryBig,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Responses",
      icon: MessageSquare,
      path: "/dashboard/responses",
    },
    {
      id: 3,
      name: "Analytics",
      icon: LineChart,
      path: "/dashboard/analytics",
    },
    {
      id: 4,
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
  ];

  return (
    <aside className="fixed left-0 top-20 flex h-[calc(100vh-80px)] w-72 flex-col border-r-4 border-black bg-[#FFF8E7]">
      {/* Navigation */}
      <nav className="flex-1 space-y-4 p-6">
        {menuList.map((menu) => (
          <Link
            key={menu.id}
            href={menu.path}
            className="flex items-center gap-4 border-4 border-black bg-white px-5 py-4 
            font-black uppercase shadow-[6px_6px_0_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:bg-yellow-300 
            hover:shadow-[10px_10px_0_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
          >
            <menu.icon size={22} />
            <span>{menu.name}</span>
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t-4 border-black bg-[#FFF8E7] p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-black uppercase">
            {isPro ? "Pro Plan" : "Free Plan"}
          </h3>

          {isPro ? (
            <span className="border-2 border-black bg-green-300 px-2 py-1 text-xs font-black">
              UNLIMITED
            </span>
          ) : (
            <span className="border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black">
              {totalForms} / {maxFreeForms}
            </span>
          )}
        </div>

        <Progress
          value={isPro ? 100 : percentage}
          className="h-3 border-2 border-black"
        />

        <p className="mt-4 text-center text-sm font-bold">
          {isPro ? (
            <>
              <span className="text-green-600">Unlimited AI Forms</span>{" "}
              unlocked.
            </>
          ) : (
            <>
              You&apos;ve created{" "}
              <span className="text-yellow-600">{totalForms}</span> of your{" "}
              <span className="text-yellow-600">{maxFreeForms}</span> free AI
              forms.
            </>
          )}
        </p>

        <p className="mt-2 text-center text-xs leading-5 text-gray-700">
          {isPro
            ? "Thank you for supporting FormCraft. Enjoy all premium features."
            : "Unlock unlimited AI forms, advanced analytics, premium themes, custom branding, and priority support."}
        </p>

        {isPro ? (
          <Button
            disabled
            className="mt-5 w-full border-4 border-black bg-green-400 font-black text-black"
          >
            <Crown size={18} />
            Pro Active
          </Button>
        ) : (
          <Link href="/dashboard/upgrade">
            <Button
              className="mt-5 w-full border-4 border-black bg-yellow-300 font-black text-black
      shadow-[4px_4px_0px_#000]
      transition-all
      hover:translate-x-1
      hover:translate-y-1
      hover:shadow-none"
            >
              <Crown size={18} />
              Upgrade to Pro
            </Button>
          </Link>
        )}
      </div>
    </aside>
  );
}

export default SideNav;
