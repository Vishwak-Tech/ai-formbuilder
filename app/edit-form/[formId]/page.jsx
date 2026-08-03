"use client";

import React, { useEffect, useState } from "react";
import { eq, and } from "drizzle-orm";
import { db } from "@/configs";
import { forms } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import FormUi from "../_components/FormUi";

function EditForm() {
  const params = useParams();
  const { user } = useUser();

  const [jsonForm, setJsonForm] = useState(null);
  const router = useRouter();

  console.log(params);
  const formId = Number(params.formId);

  useEffect(() => {
    user && GetFormData();
  }, [user]);

  const GetFormData = async () => {
    const result = await db
      .select()
      .from(forms)
      .where(
        and(
          eq(forms.id, formId),
          eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress),
        ),
      );

    if (result.length === 0) {
      console.log("Form not found");
      return;
    }

    const formData = result[0];
    const parsedJson = JSON.parse(formData.jsonForm);
    console.log(parsedJson);
    setJsonForm(parsedJson);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 border-4 border-black bg-yellow-300 px-5 py-2 font-bold shadow-[4px_4px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controller Panel */}
        <div className="rounded-xl border-4 border-black bg-cyan-300 p-6 shadow-[6px_6px_0px_#000]">
          <h2 className="mb-5 text-2xl font-extrabold">🎛️ Controller</h2>

          <p className="font-medium text-black">
            Form customization options will appear here.
          </p>
        </div>

        {/* Form Preview */}
        <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000] lg:col-span-2">
          <div className="mb-5 flex items-center justify-between border-b-4 border-black pb-4">
            <h2 className="text-2xl font-extrabold">Live Preview</h2>

            <span className="rounded-lg border-4 border-black bg-lime-300 px-3 py-1 font-bold shadow-[3px_3px_0px_#000]">
              Preview
            </span>
          </div>

          <div className="flex min-h-162.5 items-start justify-center rounded-lg border-4 border-dashed border-black bg-[#FFFDF5] p-8">
            <FormUi jsonForm={jsonForm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
