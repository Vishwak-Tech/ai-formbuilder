"use client";

import Link from "next/link";
import { LibraryBig, LineChart, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

function SideNav() {
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
        <Button
          className="mb-5 w-full rounded-none border-4 border-black bg-yellow-300 py-6 font-black 
        uppercase text-black shadow-[6px_6px_0_#000] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_#000]"
        >
          + Create Form
        </Button>

        <Progress value={66.7} className="h-3 border-2 border-black" />

        <p className="mt-3 text-center text-sm font-bold">
          You&apos;ve used 2 of your 3 free forms.
        </p>

        <p className="mt-2 text-center text-xs text-gray-700">
          Upgrade to Pro for unlimited AI forms and premium features.
        </p>
      </div>
    </aside>
  );
}

export default SideNav;
