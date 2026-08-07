"use client";

import {
  Sparkles,
  FileText,
  BarChart3,
  Palette,
  BadgeCheck,
  ShieldCheck,
  Zap,
  Infinity,
} from "lucide-react";

function IncludedFeatures() {
  const features = [
    {
      title: "Unlimited AI Forms",
      icon: Infinity,
      color: "bg-yellow-300",
    },
    {
      title: "Unlimited Responses",
      icon: FileText,
      color: "bg-cyan-300",
    },
    {
      title: "Advanced Analytics",
      icon: BarChart3,
      color: "bg-pink-300",
    },
    {
      title: "Premium Themes",
      icon: Palette,
      color: "bg-lime-300",
    },
    {
      title: "Remove Branding",
      icon: BadgeCheck,
      color: "bg-orange-300",
    },
    {
      title: "Priority Support",
      icon: ShieldCheck,
      color: "bg-violet-300",
    },
    {
      title: "Future Pro Features",
      icon: Sparkles,
      color: "bg-emerald-300",
    },
    {
      title: "Faster AI Generation",
      icon: Zap,
      color: "bg-red-300",
    },
  ];

  return (
    <section className="mb-8">
      <div className="mb-5">
        <h2 className="text-2xl font-black">
          Included Features
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Everything included with your FormCraft Pro subscription.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border-4
              border-black
              bg-white
              p-4
              shadow-[6px_6px_0px_#000]
              transition-all
              duration-200
              hover:-translate-x-1
              hover:-translate-y-1
              hover:shadow-[10px_10px_0px_#000]
            "
          >
            <div
              className={`rounded-xl border-2 border-black p-2 ${feature.color}`}
            >
              <feature.icon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold">
                {feature.title}
              </p>

              <span className="text-xs text-green-600 font-semibold">
                Included
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default IncludedFeatures;