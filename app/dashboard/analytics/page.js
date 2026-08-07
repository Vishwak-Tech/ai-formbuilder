"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { forms, formResponses } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";

import {
  FileText,
  Users,
  Trophy,
  BarChart3,
  Palette,
  Sparkles,
} from "lucide-react";

function Analytics() {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState({
    totalForms: 0,
    totalResponses: 0,
    avgResponses: 0,
    topForm: null,
    forms: [],
    themeUsage: {},
    styleUsage: {},
  });

  useEffect(() => {
    if (user) {
      loadAnalytics();
    }
  }, [user]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);

      const userForms = await db
        .select()
        .from(forms)
        .where(
          eq(forms.createdBy, user.primaryEmailAddress.emailAddress)
        )
        .orderBy(desc(forms.createdAt));

      let totalResponses = 0;

      let topForm = null;

      const themeUsage = {};

      const styleUsage = {};

      const formsWithResponses = await Promise.all(
        userForms.map(async (form) => {
          const responses = await db
            .select()
            .from(formResponses)
            .where(eq(formResponses.formRef, form.id));

          totalResponses += responses.length;

          if (
            !topForm ||
            responses.length > topForm.responseCount
          ) {
            topForm = {
              title: form.formTitle,
              responseCount: responses.length,
            };
          }

          themeUsage[form.theme] =
            (themeUsage[form.theme] || 0) + 1;

          styleUsage[form.style] =
            (styleUsage[form.style] || 0) + 1;

          return {
            ...form,
            responseCount: responses.length,
          };
        })
      );

      setAnalytics({
        totalForms: userForms.length,
        totalResponses,
        avgResponses:
          userForms.length === 0
            ? 0
            : (
                totalResponses / userForms.length
              ).toFixed(1),
        topForm,
        forms: formsWithResponses.sort(
          (a, b) => b.responseCount - a.responseCount
        ),
        themeUsage,
        styleUsage,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <h2 className="text-center text-2xl font-black">
        Loading Analytics...
      </h2>
    );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-black uppercase">
          Analytics
        </h1>

        <p className="mt-2 text-gray-600">
          Insights into your AI forms and response activity.
        </p>
      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="border-4 border-black bg-cyan-300 p-5 shadow-[6px_6px_0px_#000]">
          <FileText size={28} />
          <p className="mt-3 text-sm font-bold uppercase">
            Total Forms
          </p>
          <h2 className="text-4xl font-black">
            {analytics.totalForms}
          </h2>
        </div>

        <div className="border-4 border-black bg-yellow-300 p-5 shadow-[6px_6px_0px_#000]">
          <Users size={28} />
          <p className="mt-3 text-sm font-bold uppercase">
            Responses
          </p>
          <h2 className="text-4xl font-black">
            {analytics.totalResponses}
          </h2>
        </div>

        <div className="border-4 border-black bg-pink-300 p-5 shadow-[6px_6px_0px_#000]">
          <BarChart3 size={28} />
          <p className="mt-3 text-sm font-bold uppercase">
            Avg / Form
          </p>
          <h2 className="text-4xl font-black">
            {analytics.avgResponses}
          </h2>
        </div>

        <div className="border-4 border-black bg-lime-300 p-5 shadow-[6px_6px_0px_#000]">
          <Trophy size={28} />
          <p className="mt-3 text-sm font-bold uppercase">
            Top Form
          </p>

          <h2 className="truncate text-xl font-black">
            {analytics.topForm?.title || "-"}
          </h2>

          <p className="font-bold">
            {analytics.topForm?.responseCount || 0} Responses
          </p>
        </div>

      </div>

      {/* Top Forms */}

      <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000]">

        <h2 className="mb-6 flex items-center gap-2 text-2xl font-black">
          <Trophy />
          Top Performing Forms
        </h2>

        <div className="space-y-4">

          {analytics.forms.map((form) => (

            <div
              key={form.id}
              className="flex items-center justify-between border-2 border-black p-4"
            >
              <div>

                <h3 className="font-black">
                  {form.formTitle}
                </h3>

                <p className="text-sm text-gray-600">
                  {form.responseCount} Responses
                </p>

              </div>

              <span className="border-2 border-black bg-yellow-300 px-3 py-1 font-black">
                #{analytics.forms.indexOf(form) + 1}
              </span>

            </div>

          ))}

        </div>

      </div>

      {/* Theme & Style */}

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000]">

          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black">
            <Palette />
            Theme Usage
          </h2>

          {Object.entries(analytics.themeUsage).map(
            ([theme, count]) => (
              <div
                key={theme}
                className="mb-3 flex justify-between border-b pb-2"
              >
                <span className="font-bold capitalize">
                  {theme}
                </span>

                <span>{count}</span>
              </div>
            )
          )}

        </div>

        <div className="border-4 border-black bg-white p-6 shadow-[8px_8px_0px_#000]">

          <h2 className="mb-4 flex items-center gap-2 text-2xl font-black">
            <Sparkles />
            Style Usage
          </h2>

          {Object.entries(analytics.styleUsage).map(
            ([style, count]) => (
              <div
                key={style}
                className="mb-3 flex justify-between border-b pb-2"
              >
                <span className="font-bold capitalize">
                  {style}
                </span>

                <span>{count}</span>
              </div>
            )
          )}

        </div>

      </div>

    </div>
  );
}

export default Analytics;