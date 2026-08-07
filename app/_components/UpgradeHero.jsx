"use client";

import { Crown, Sparkles } from "lucide-react";

function ProSection() {
  return (
    <section className="bg-[#FFF8E7] px-6 py-24">
      <div className="mx-auto max-w-6xl">

        {/* Badge */}

        <div className="mx-auto mb-6 w-fit rotate-[-2deg] border-4 border-black bg-yellow-300 px-5 py-2 shadow-[6px_6px_0px_#000]">
          <div className="flex items-center gap-2 font-black uppercase">
            <Sparkles size={18} />
            FormCraft Pro
          </div>
        </div>

        {/* Heading */}

        <h2 className="mx-auto max-w-4xl text-center text-4xl font-black uppercase leading-tight md:text-6xl">
          Build Forms
          <span className="mx-2 inline-block -rotate-2 border-4 border-black bg-pink-300 px-3 py-1">
            Without Limits
          </span>
        </h2>

        {/* Description */}

        <p className="mx-auto mt-8 max-w-2xl text-center text-lg leading-8 text-gray-700">
          Unlock unlimited AI-generated forms, premium themes,
          analytics, branding, AI templates and priority support.
        </p>

        {/* Features */}

        <div className="mt-14 grid gap-6 md:grid-cols-3">

          <div className="border-4 border-black bg-cyan-300 p-6 shadow-[8px_8px_0px_#000]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center border-4 border-black bg-white">
              🚀
            </div>

            <h3 className="text-xl font-black uppercase">
              Unlimited Forms
            </h3>

            <p className="mt-3 text-sm leading-6">
              Create unlimited AI-powered forms for any use case.
            </p>
          </div>

          <div className="border-4 border-black bg-yellow-300 p-6 shadow-[8px_8px_0px_#000]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center border-4 border-black bg-white">
              📊
            </div>

            <h3 className="text-xl font-black uppercase">
              Analytics
            </h3>

            <p className="mt-3 text-sm leading-6">
              Understand responses with powerful insights and reports.
            </p>
          </div>

          <div className="border-4 border-black bg-lime-300 p-6 shadow-[8px_8px_0px_#000]">
            <div className="mb-4 flex h-12 w-12 items-center justify-center border-4 border-black bg-white">
              🎨
            </div>

            <h3 className="text-xl font-black uppercase">
              Premium Themes
            </h3>

            <p className="mt-3 text-sm leading-6">
              Customize every form with beautiful premium designs.
            </p>
          </div>

        </div>

        {/* CTA */}

        <div className="mt-16 text-center">

          <button
            className="inline-flex items-center gap-3 border-4 border-black
            bg-yellow-300 px-10 py-5 text-xl font-black uppercase
            shadow-[8px_8px_0px_#000]
            transition-all
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none"
          >
            <Crown size={22} />
            Explore Pro
          </button>

        </div>

      </div>
    </section>
  );
}

export default ProSection;