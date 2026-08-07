"use client";

import Link from "next/link";
import {
  Sparkles,
  Palette,
  Send,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Sparkles,
    title: "Describe Your Idea",
    description:
      "Simply explain the form you need in plain English. AI instantly generates a complete form with smart, relevant fields.",
    color: "bg-yellow-50",
    iconBg: "bg-yellow-300",
  },
  {
    number: "02",
    icon: Palette,
    title: "Customize Everything",
    description:
      "Edit questions, change themes, backgrounds, and styles while previewing every change in real time.",
    color: "bg-cyan-50",
    iconBg: "bg-cyan-300",
  },
  {
    number: "03",
    icon: Send,
    title: "Publish & Collect",
    description:
      "Share your form using a public link, collect responses instantly, and manage submissions from your dashboard.",
    color: "bg-green-50",
    iconBg: "bg-green-300",
  },
];

function HowItWorks() {
  return (
    <section className="bg-[#FFF8E7] py-24">
      <div className="mx-auto max-w-7xl px-6">

        {/* Badge */}

        <div className="flex justify-center">
          <div
            className="border-4 border-black
            bg-yellow-300
            px-6
            py-2
            font-black
            uppercase
            shadow-[4px_4px_0px_#000]"
          >
            ⚡ How It Works
          </div>
        </div>

        {/* Heading */}

        <h2
          className="mt-8
          text-center
          text-5xl
          font-black
          uppercase
          leading-tight
          md:text-7xl"
        >
          Build Beautiful Forms
          <br />

          <span
            className="mt-3
            inline-block
            rotate-[-2deg]
            border-4
            border-black
            bg-cyan-300
            px-5
            py-2
            shadow-[5px_5px_0px_#000]"
          >
            In Under 60 Seconds
          </span>
        </h2>

        {/* Description */}

        <p
          className="mx-auto
          mt-8
          max-w-3xl
          text-center
          text-lg
          leading-8
          text-gray-700"
        >
          Turn a simple prompt into a fully functional AI-powered form.
          Customize every detail, publish instantly, and start collecting
          responses — all without writing a single line of code.
        </p>
        {/* Cards */}

        <div className="mt-20 grid gap-8 md:grid-cols-3">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className={`
                  group
                  relative
                  cursor-pointer
                  border-4
                  border-black
                  ${step.color}
                  p-8
                  shadow-[8px_8px_0px_#000]
                  transition-all
                  duration-200
                  hover:-translate-x-2
                  hover:-translate-y-2
                  hover:shadow-[14px_14px_0px_#000]
                `}
              >
                {/* Top */}

                <div className="flex items-center justify-between">

                  <div
                    className="
                    border-4
                    border-black
                    bg-yellow-300
                    px-4
                    py-2
                    font-black
                    shadow-[4px_4px_0px_#000]"
                  >
                    {step.number}
                  </div>

                  <div
                    className={`
                    ${step.iconBg}
                    border-4
                    border-black
                    p-3
                    shadow-[4px_4px_0px_#000]
                    transition-transform
                    duration-200
                    group-hover:scale-110
                    group-hover:rotate-6`}
                  >
                    <Icon className="h-10 w-10" />
                  </div>

                </div>

                {/* Title */}

                <h3 className="mt-8 text-3xl font-black uppercase">
                  {step.title}
                </h3>

                {/* Divider */}

                <div className="mt-4 mb-5 h-1 w-20 bg-yellow-300 border border-black"></div>

                {/* Description */}

                <p className="leading-8 text-gray-700">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

        {/* CTA */}

        <div className="mt-24 text-center">

          <h3 className="text-3xl font-black uppercase">
            Ready to build your first AI form?
          </h3>

          <p className="mt-3 text-gray-700">
            Join developers, startups, and students creating forms in seconds.
          </p>

          <Link
            href="/dashboard"
            className="
            mt-8
            inline-flex
            items-center
            gap-3
            border-4
            border-black
            bg-yellow-300
            px-10
            py-5
            text-xl
            font-black
            uppercase
            shadow-[8px_8px_0px_#000]
            transition-all
            hover:translate-x-1
            hover:translate-y-1
            hover:shadow-none"
          >
            Create Your First AI Form

            <ArrowRight size={22} />
          </Link>

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;