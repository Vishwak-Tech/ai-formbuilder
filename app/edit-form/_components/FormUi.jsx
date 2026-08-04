"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FieldEdit from "./FieldEdit";
import { themes } from "../_constants/themes";
import { styleClasses } from "../_constants/styleClasses";

function FormUi({
  jsonForm,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedStyle,
}) {
  const theme = themes[selectedTheme] || themes.light;
  const style =
    styleClasses[selectedStyle] || styleClasses.neobrutalism;

  return (
    <div
      className={`w-full max-w-2xl p-8 transition-all duration-300
      ${theme.container}
      ${style.container}`}
    >
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-center">
        {jsonForm?.formTitle}
      </h1>

      <p className={`mt-3 mb-8 text-center ${theme.label}`}>
        {jsonForm?.description}
      </p>

      {/* Fields */}
      <div className="space-y-6">
        {jsonForm?.fields?.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start justify-between gap-4 border-b pb-5"
          >
            <div className="flex-1 space-y-2">
              <label
                className={`flex items-center font-bold ${theme.label}`}
              >
                {field.label}
                {field.required && (
                  <span className="ml-1 text-red-500">*</span>
                )}
              </label>

              {/* Text Inputs */}
              {["text", "email", "number", "tel", "date"].includes(
                field.type
              ) && (
                <Input
                  className={`${theme.input} ${style.input}`}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <Textarea
                  className={`${theme.textarea} ${style.textarea}`}
                  rows={4}
                  placeholder={field.placeholder}
                />
              )}

              {/* Select */}
              {field.type === "select" && (
                <select
                  className={`w-full p-2 ${theme.select} ${style.select}`}
                >
                  <option value="">
                    {field.placeholder || `Select ${field.label}`}
                  </option>

                  {field.options?.map((option, i) => (
                    <option key={i} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}

              {/* Radio */}
              {field.type === "radio" && (
                <div className="space-y-2">
                  {field.options?.map((option, i) => (
                    <label
                      key={i}
                      className={`flex items-center gap-2 ${theme.label}`}
                    >
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
                    {field.options.map((option, i) => (
                      <label
                        key={i}
                        className={`flex items-center gap-2 ${theme.label}`}
                      >
                        <input type="checkbox" />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  <label
                    className={`flex items-center gap-2 ${theme.label}`}
                  >
                    <input type="checkbox" />
                    {field.label}
                  </label>
                ))}
            </div>

            <FieldEdit
              field={field}
              onUpdate={(value) => onFieldUpdate(value, index)}
              deleteField={() => deleteField(index)}
            />
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        className={`mt-8 w-full px-4 py-3 font-bold transition-all duration-200
        ${theme.button}
        ${style.button}`}
      >
        Submit
      </button>
    </div>
  );
}

export default FormUi;