"use client";

import Link from "next/link";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Crown } from "lucide-react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { eq } from "drizzle-orm";

function SideNav() {
  const { user } = useUser();
  const [totalForms, setTotalForms] = useState(0);

  const maxFreeForms = 5;
  const percentage =
  maxFreeForms > 0
    ? Math.min((totalForms / maxFreeForms) * 100, 100)
    : 0;

  const remainingForms = Math.max(
    maxFreeForms - totalForms,
    0
  );

  useEffect(() => {
    if (user) {
      getTotalForms();
    }
  }, [user]);

  const getTotalForms = async () => {
  try {
    const result = await db
      .select()
      .from(forms)
      .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress));

    setTotalForms(result.length);
  } catch (error) {
    console.error("Failed to fetch forms:", error);
  }
};

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
          <h3 className="text-sm font-black uppercase tracking-wide">
            Free Plan
          </h3>

          <span className="border-2 border-black bg-yellow-300 px-2 py-1 text-xs font-black">
            {totalForms} / {maxFreeForms}
          </span>
        </div>

        <Progress value={percentage} className="h-3 border-2 border-black" />

        <p className="mt-4 text-center text-sm font-bold">
          You&apos;ve created <span className="text-yellow-600">{totalForms}</span>{" "}
          of your <span className="text-yellow-600">{maxFreeForms}</span> free
          AI forms.
        </p>

        <p className="mt-2 text-center text-xs leading-5 text-gray-700">
          Unlock unlimited AI forms, advanced analytics, premium themes, custom
          branding, and priority support.
        </p>

        <button
          className="mt-5 flex w-full items-center justify-center gap-2
    border-4 border-black
    bg-yellow-300
    py-3
    font-black
    uppercase
    shadow-[4px_4px_0px_#000]
    transition-all duration-200
    hover:bg-yellow-400
    hover:translate-x-1
    hover:translate-y-1
    hover:shadow-none"
        >
          <Crown size={18} />
          Upgrade to Pro
        </button>
      </div>
    </aside>
  );
}

export default SideNav;
