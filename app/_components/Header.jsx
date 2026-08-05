"use client";

import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { usePathname } from "next/navigation";

function Header() {
  const { isSignedIn } = useUser();
  const pathname = usePathname();

  // Hide header on public AI form pages
  const showHeader = !pathname.startsWith("/aiform");

  if (!showHeader) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b-4 border-black bg-[#FFF8E7]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_#000]">
              <Image
                src="/logo.svg"
                alt="FormCraft AI"
                width={32}
                height={32}
                priority
              />
            </div>

            <h1 className="text-2xl font-black uppercase tracking-tight">
              FormCraft{" "}
              <span className="inline-block rotate-[-2deg] border-4 border-black bg-yellow-300 px-2 py-1">
                AI
              </span>
            </h1>
          </Link>

          {/* Right Side */}
          {isSignedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  className="rounded-none border-4 border-black bg-yellow-300 px-6 py-6
                  font-black uppercase text-black shadow-[6px_6px_0_#000]
                  transition-all hover:-translate-x-1 hover:-translate-y-1
                  hover:shadow-[10px_10px_0_#000]
                  active:translate-x-1 active:translate-y-1 active:shadow-none"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Button>
              </Link>

              <div
                className="rounded-none border-4 border-black bg-yellow-300 p-1
                shadow-[4px_4px_0_#000]
                transition-all hover:-translate-x-1 hover:-translate-y-1
                hover:shadow-[8px_8px_0_#000]"
              >
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10 rounded-none",
                    },
                  }}
                />
              </div>
            </div>
          ) : (
            <Link href="/sign-in">
              <Button
                className="rounded-none border-4 border-black bg-yellow-300 px-6 py-6
                text-lg font-black uppercase text-black
                shadow-[6px_6px_0_#000]
                transition-all hover:-translate-x-1 hover:-translate-y-1
                hover:shadow-[10px_10px_0_#000]
                active:translate-x-1 active:translate-y-1 active:shadow-none"
              >
                Get Started →
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20" />
    </>
  );
}

export default Header;