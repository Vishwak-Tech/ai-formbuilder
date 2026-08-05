"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { eq } from "drizzle-orm";

import { db } from "@/configs";
import { forms } from "@/configs/schema";
import FormUi from "@/app/edit-form/_components/FormUi";
import { backgrounds } from "@/app/edit-form/_constants/backgrounds";
import Image from "next/image";
import Link from "next/link";

function LiveAiForm() {
  const params = useParams();

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (params?.formId) {
      GetFormData();
    }
  }, [params]);

  const GetFormData = async () => {
    try {
      const result = await db
        .select()
        .from(forms)
        .where(eq(forms.id, Number(params.formId)));

      console.log(result);

      if (result.length > 0) {
        const form = result[0];

        setFormData({
          ...form,
          jsonForm: JSON.parse(form.jsonForm),
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const currentBackground =
    backgrounds.find((bg) => bg.id === formData?.background)?.className ||
    "bg-white";

  return (
    <>
      <div
        className={`min-h-screen ${currentBackground} flex items-center justify-center p-10`}
      >
        <FormUi
          jsonForm={formData?.jsonForm}
          selectedTheme={formData?.theme}
          selectedStyle={formData?.style}
          editable={false}
        />
      </div>

      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 flex items-center justify-center
  h-14 w-14 rounded-full border-4 border-black bg-yellow-300
  shadow-[4px_4px_0px_#000] transition-all
  hover:scale-105 hover:-translate-y-1"
      >
        <Image src="/logo.svg" width={28} height={28} alt="FormCraft AI" />
      </Link>
    </>
  );
}

export default LiveAiForm;
