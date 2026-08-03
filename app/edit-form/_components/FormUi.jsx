"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FieldEdit from "./FieldEdit";

function FormUi({ jsonForm }) {
  return (
    <div className="w-full max-w-2xl rounded-xl border-4 border-black bg-white p-8 shadow-[6px_6px_0px_#000]">
      <h1 className="text-3xl font-extrabold text-center">
        {jsonForm?.formTitle}
      </h1>

      <p className="mt-3 mb-8 text-center text-gray-600">
        {jsonForm?.description}
      </p>

      <div className="space-y-6">
        {jsonForm?.fields?.map((field) => (
          <div
            key={field.id}
            className="flex items-start justify-between gap-4 border-b border-gray-200 pb-5"
          >
            <div className="flex-1 space-y-2">
              <label className="font-bold flex items-center">
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>

              {/* Text / Email / Number / Tel / Date */}
              {["text", "email", "number", "tel", "date"].includes(
                field.type,
              ) && <Input type={field.type} placeholder={field.placeholder} />}

              {/* Textarea */}
              {field.type === "textarea" && (
                <Textarea placeholder={field.placeholder} rows={4} />
              )}

              {/* Select */}
              {field.type === "select" && (
                <select className="w-full rounded-md border border-black p-2">
                  <option value="" disabled>
                    {field.placeholder || `Select ${field.label}`}
                  </option>

                  {field.options?.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {/* Radio */}
              {field.type === "radio" && (
                <div className="space-y-2">
                  {field.options?.map((option, index) => (
                    <label key={index} className="flex items-center gap-2">
                      <input type="radio" name={field.id} />
                      {option}
                    </label>
                  ))}
                </div>
              )}

              {/* Checkbox */}
              {field.type === "checkbox" &&
                (field.options ? (
                  <div className="space-y-2">
                    {field.options.map((option, index) => (
                      <label key={index} className="flex items-center gap-2">
                        <input type="checkbox" />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    {field.label}
                  </label>
                ))}
            </div>

            <FieldEdit field={field} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FormUi;
