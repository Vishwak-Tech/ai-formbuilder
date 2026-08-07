"use client";

import Link from "next/link";
import { Crown, Heart } from "lucide-react";

import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

function Footer() {
  return (
    <footer className="border-t-4 border-black bg-yellow-300">
      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Top Section */}

        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1fr]">
          {/* Brand */}

          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-xl border-4 border-black bg-white p-3 shadow-[4px_4px_0px_#000]">
                <Image
                  src="/logo.svg"
                  alt="FormCraft Logo"
                  width={24}
                  height={24}
                  className="h-6 w-6 object-contain"
                  priority
                />
              </div>

              <div>
                <h2 className="text-2xl font-black">FormCraft</h2>

                <span className="text-xs font-bold uppercase tracking-wider">
                  AI Form Builder
                </span>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-gray-800">
              Build beautiful AI-powered forms in seconds. Collect responses,
              analyze insights, and automate your workflow effortlessly.
            </p>

            <div className="mt-6 inline-flex rounded-xl border-4 border-black bg-white px-4 py-2 text-sm font-black shadow-[4px_4px_0px_#000]">
              🚀 Version 1.0.0
            </div>
          </div>

          {/* Product */}

          <div>
            <h3 className="mb-5 text-lg font-black uppercase">Product</h3>

            <div className="space-y-3 text-sm font-semibold">
              <Link
                href="/dashboard"
                className="block transition hover:translate-x-1"
              >
                Dashboard
              </Link>

              <Link
                href="/dashboard"
                className="block transition hover:translate-x-1"
              >
                Templates
              </Link>

              <Link
                href="/dashboard/upgrade"
                className="block transition hover:translate-x-1"
              >
                Pricing
              </Link>

              <Link
                href="/dashboard"
                className="block transition hover:translate-x-1"
              >
                AI Forms
              </Link>
            </div>
          </div>

          {/* Resources */}

          <div>
            <h3 className="mb-5 text-lg font-black uppercase">Resources</h3>

            <div className="space-y-3 text-sm font-semibold">
              <Link href="#" className="block transition hover:translate-x-1">
                Documentation
              </Link>

              <Link href="#" className="block transition hover:translate-x-1">
                Changelog
              </Link>

              <Link href="#" className="block transition hover:translate-x-1">
                Roadmap
              </Link>

              <Link href="#" className="block transition hover:translate-x-1">
                Help Center
              </Link>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="mb-5 text-lg font-black uppercase">Company</h3>

            <div className="space-y-3 text-sm font-semibold">
              <Link href="#" className="block transition hover:translate-x-1">
                About
              </Link>

              <Link href="#" className="block transition hover:translate-x-1">
                Contact
              </Link>

              <Link href="#" className="block transition hover:translate-x-1">
                Privacy Policy
              </Link>

              <Link href="#" className="block transition hover:translate-x-1">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Connect */}

          <div>
            <h3 className="mb-5 text-lg font-black uppercase">Connect</h3>

            <div className="flex gap-3">
              <a
                href="https://github.com/Vishwak-Tech"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-4 border-black bg-white p-3 shadow-[4px_4px_0px_#000] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
              >
                <FaGithub className="h-5 w-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/vishwak-koleti-tech"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-4 border-black bg-white p-3 shadow-[4px_4px_0px_#000] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border-4 border-black bg-white p-3 shadow-[4px_4px_0px_#000] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
            </div>

            <div className="mt-6 rounded-xl border-4 border-black bg-lime-300 px-4 py-3 shadow-[4px_4px_0px_#000]">
              <p className="text-xs font-black uppercase">System Status</p>

              <p className="mt-1 text-sm font-bold">All Systems Operational</p>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t-4 border-black pt-8 text-sm font-bold lg:flex-row">
          <p>© {new Date().getFullYear()} FormCraft. All rights reserved.</p>

          <p className="flex items-center gap-2">
            Made with
            <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            by <span className="font-black">Vishwak</span>
          </p>

          <p className="rounded-lg border-2 border-black bg-white px-3 py-1">
            Built with Next.js • Gemini • Clerk • Neon • Razorpay
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
