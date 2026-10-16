"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/configs";
import { forms, formResponses } from "@/configs/schema";
import { desc, eq } from "drizzle-orm";
import { exportResponsesToExcel } from "@/utils/exportToExcel";
import { toast } from "@/components/ui/toast";

import {
  FileSpreadsheet,
  Calendar,
  Users,
  FileText,
  Download,
} from "lucide-react";


function Responses() {
  const { user } = useUser();

  const [formsList, setFormsList] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  if (!user) return;

  const getFormList = async () => {
    try {
      setLoading(true);

      const result = await db
        .select()
        .from(forms)
        .where(
          eq(forms.createdBy, user.primaryEmailAddress?.emailAddress)
        )
        .orderBy(desc(forms.createdAt));

      // Attach response count to every form
      const formsWithResponses = await Promise.all(
        result.map(async (form) => {
          const responses = await db
            .select()
            .from(formResponses)
            .where(eq(formResponses.formRef, form.id));

          return {
            ...form,
            responseCount: responses.length,
          };
        })
      );

      setFormsList(formsWithResponses);
    } catch (error) {
      console.error("Failed to fetch forms and responses:", error);
    } finally {
      setLoading(false);
    }
  };

  getFormList();
}, [user]);

  const handleExport = async (formId, formTitle) => {
    try {
      const result = await db
        .select()
        .from(formResponses)
        .where(eq(formResponses.formRef, formId));

      if (result.length === 0) {
        toast.add({
          title: "No Responses",
          description: "This form hasn't received any responses yet.",
        });
        return;
      }

      exportResponsesToExcel(result, formTitle);

      toast.add({
        title: "Export Successful",
        description: "Excel file downloaded successfully.",
      });
    } catch (error) {
      console.error(error);

      toast.add({
        title: "Export Failed",
        description: "Something went wrong.",
      });
    }
  };

  if (loading) {
    return (
      <div className="mt-10 text-center text-xl font-black">
        Loading Responses...
      </div>
    );
  }

  const totalResponses = formsList.reduce(
    (sum, form) => sum + form.responseCount,
    0,
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-black uppercase tracking-tight">
          Responses
        </h1>

        <p className="mt-2 max-w-2xl text-gray-600">
          Export responses collected from your AI-generated forms in Excel
          (.xlsx) format with a single click.
        </p>
      </div>

      {/* Empty */}

      {formsList.length === 0 && (
        <div className="rounded-xl border-4 border-black bg-yellow-100 p-10 text-center shadow-[8px_8px_0px_#000]">
          <FileText size={60} className="mx-auto mb-5" />

          <h2 className="text-2xl font-black">No Forms Found</h2>

          <p className="mt-3">
            Create your first form to start collecting responses.
          </p>
        </div>
      )}

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {formsList.map((form) => (
          <div
            key={form.id}
            className="border-4 border-black bg-white shadow-[8px_8px_0px_#000]
            transition-all duration-200
            hover:-translate-x-1
            hover:-translate-y-1
            hover:shadow-[12px_12px_0px_#000]"
          >
            {/* Header */}

            <div className="border-b-4 border-black bg-yellow-300 p-4">
              <h2 className="truncate text-xl font-black uppercase">
                {form.formTitle}
              </h2>
            </div>

            {/* Body */}

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Calendar size={18} />

                <span>
                  {new Date(form.createdAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users size={18} />

                  <span className="font-bold">Responses</span>
                </div>

                <span className="border-2 border-black bg-cyan-300 px-3 py-1 font-black">
                  {form.responseCount}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileSpreadsheet size={18} />

                  <span className="font-bold">Export</span>
                </div>

                <span className="border-2 border-black bg-green-300 px-3 py-1 text-sm font-black">
                  XLSX
                </span>
              </div>
            </div>

            {/* Footer */}

            <button
              onClick={() => handleExport(form.id, form.formTitle)}
              className="flex w-full items-center justify-center gap-3
              border-t-4 border-black
              bg-lime-300
              py-4
              text-lg
              font-black
              uppercase
              transition-all
              hover:bg-lime-400"
            >
              <Download size={22} />
              Export Excel
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Responses;
