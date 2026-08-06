"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";

import Link from "next/link";
import { Pencil, Eye, BarChart3, Share2 } from "lucide-react";
import { toast } from "@/components/ui/toast";
import ShareFormDialog from "./ShareFormDialog";

const shareForm = async (id) => {
  const url = `${window.location.origin}/aiform/${id}`;

  try {
    await navigator.clipboard.writeText(url);

    toast.add({
      title: "Link Copied!",
      description: "Form link copied to clipboard.",
    });
  } catch (error) {
    console.error(error);

    toast.add({
      title: "Error",
      description: "Unable to copy link.",
    });
  }
};

function FormList() {
  const { user } = useUser();
  const [formList, setFormList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getFormList();
    }
  }, [user]);

  const getFormList = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(forms)
        .where(eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(forms.id));

      setFormList(result);
    } catch (error) {
      console.error("Failed to fetch forms:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-8 text-center text-lg font-bold">Loading forms...</div>
    );
  }

  if (formList.length === 0) {
    return (
      <div className="mt-8 rounded-xl border-4 border-black bg-yellow-100 p-8 text-center shadow-[6px_6px_0px_#000]">
        <h2 className="text-2xl font-black">No Forms Found</h2>

        <p className="mt-3 text-gray-700">
          Create your first AI-generated form to get started.
        </p>
      </div>
    );
  }
  return (
    <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {formList.map((form) => (
        <div
          key={form.id}
          className="group flex flex-col justify-between border-4 border-black bg-white shadow-[8px_8px_0px_#000]
        transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_#000]"
        >
          {/* Top Accent */}
          <div className="border-b-4 border-black bg-yellow-300 px-5 py-3">
            <h2 className="truncate text-xl font-black uppercase">
              {form.formTitle}
            </h2>
          </div>

          {/* Body */}
          <div className="space-y-5 p-5">
            <div className="flex flex-wrap gap-2">
              <span className="border-2 border-black bg-cyan-300 px-3 py-1 text-xs font-black uppercase">
                {form.theme}
              </span>

              <span className="border-2 border-black bg-pink-300 px-3 py-1 text-xs font-black uppercase">
                {form.style}
              </span>

              <span className="border-2 border-black bg-lime-300 px-3 py-1 text-xs font-black uppercase">
                {form.background}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="font-bold">Created</span>
                <span>
                  {new Date(form.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-bold">Status</span>

                <span className="border-2 border-black bg-green-300 px-2 font-black">
                  LIVE
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-4 border-black">
            {/* Top Actions */}

            <div className="grid grid-cols-3">
              <Link
                href={`/edit-form/${form.id}`}
                className="flex items-center justify-center gap-2 border-r-4 border-black bg-cyan-200 py-3 font-black transition-all hover:bg-cyan-300"
              >
                <Pencil size={18} />
                Edit
              </Link>

              <Link
                href={`/aiform/${form.id}`}
                target="_blank"
                className="flex items-center justify-center gap-2 border-r-4 border-black bg-yellow-200 py-3 font-black transition-all hover:bg-yellow-300"
              >
                <Eye size={18} />
                Preview
              </Link>

              <Link
                href={`/dashboard/responses/${form.id}`}
                className="flex items-center justify-center gap-2 bg-pink-200 py-3 font-black transition-all hover:bg-pink-300"
              >
                <BarChart3 size={18} />
                Responses
              </Link>
            </div>

            {/* Share */}
            <ShareFormDialog formId={form.id} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormList;
