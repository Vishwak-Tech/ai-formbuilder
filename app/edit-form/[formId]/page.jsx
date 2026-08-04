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
import { toast } from "@/components/ui/toast";
import Controller from "../_components/Controller";
import { backgrounds } from "../_constants/backgrounds";

function EditForm() {
  const params = useParams();
  const { user } = useUser();

  const [jsonForm, setJsonForm] = useState(null);
  const router = useRouter();
  const [record, setRecord] = useState(null);

  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedBackground, setSelectedBackground] = useState("none");
  const [selectedStyle, setSelectedStyle] = useState("neobrutalism");

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
    setRecord(result[0]);
    const parsedJson = JSON.parse(formData.jsonForm);
    console.log(parsedJson);
    setJsonForm(parsedJson);

    setSelectedTheme(formData.theme || "light");
    setSelectedBackground(formData.background || "none");
    setSelectedStyle(formData.style || "neobrutalism");
  };

  const saveForm = async (updatedData = {}) => {
    if (!record) return;

    try {
      await db
        .update(forms)
        .set({
          jsonForm: JSON.stringify(updatedData.jsonForm ?? jsonForm),
          theme: updatedData.theme ?? selectedTheme,
          background: updatedData.background ?? selectedBackground,
          style: updatedData.style ?? selectedStyle,
        })
        .where(
          and(
            eq(forms.id, record.id),
            eq(forms.createdBy, user?.primaryEmailAddress?.emailAddress),
          ),
        );

      toast.add({
        title: "Success",
        description: "Form updated successfully.",
      });
    } catch (error) {
      console.error("Failed to update form:", error);
    }
  };

  const changeTheme = (theme) => {
    setSelectedTheme(theme);

    saveForm({
      theme,
    });
  };

  const changeBackground = (background) => {
    setSelectedBackground(background);

    saveForm({
      background,
    });
  };

  const changeStyle = (style) => {
    setSelectedStyle(style);

    saveForm({
      style,
    });
  };

  const onFieldUpdate = (value, index) => {
    const updatedForm = {
      ...jsonForm,
      fields: [...jsonForm.fields],
    };

    updatedForm.fields[index] = {
      ...updatedForm.fields[index],
      ...value,
    };

    setJsonForm(updatedForm);

    saveForm({
      jsonForm: updatedForm,
    });
  };

  const deleteField = (indexToRemove) => {
    const updatedForm = {
      ...jsonForm,
      fields: jsonForm.fields.filter((_, index) => index !== indexToRemove),
    };

    setJsonForm(updatedForm);

    saveForm({
      jsonForm: updatedForm,
    });
  };

  const currentBackground =
    backgrounds.find((bg) => bg.id === selectedBackground)?.className ||
    "bg-white";

  return (
    <div className="min-h-screen bg-[#FFF8E7] p-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2 border-4 border-black bg-yellow-300 px-5 py-2 
        font-bold shadow-[4px_4px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
      >
        <ArrowLeft className="h-5 w-5" />
        Back
      </button>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Controller Panel */}
        <div className="controller-scroll h-[calc(100vh-140px)] overflow-y-auto rounded-xl border-4 border-black bg-cyan-100 p-6 shadow-[6px_6px_0px_#000]">
          <Controller
            selectedTheme={selectedTheme}
            setSelectedTheme={changeTheme}
            selectedBackground={selectedBackground}
            setSelectedBackground={changeBackground}
            selectedStyle={selectedStyle}
            setSelectedStyle={changeStyle}
          />
        </div>

        {/* Form Preview */}
        <div className="rounded-xl border-4 border-black bg-white p-6 shadow-[6px_6px_0px_#000] lg:col-span-2">
          <div className="mb-5 flex items-center justify-between border-b-4 border-black pb-4">
            <h2 className="text-2xl font-extrabold">Live Preview</h2>

            <span className="rounded-lg border-4 border-black bg-lime-300 px-3 py-1 font-bold shadow-[3px_3px_0px_#000]">
              Preview
            </span>
          </div>

          <div
            className={`flex min-h-162.5 items-start justify-center rounded-lg border-4 border-dashed border-black p-8 transition-all duration-500 ${currentBackground}`}
          >
            <FormUi
              jsonForm={jsonForm}
              selectedTheme={selectedTheme}
              selectedStyle={selectedStyle}
              onFieldUpdate={onFieldUpdate}
              deleteField={deleteField}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
