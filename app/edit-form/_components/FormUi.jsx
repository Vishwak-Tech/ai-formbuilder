"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FieldEdit from "./FieldEdit";
import { themes } from "../_constants/themes";
import { styleClasses } from "../_constants/styleClasses";
import { toast } from "@/components/ui/toast";
import { db } from "@/configs";
import { formResponses } from "@/configs/schema";
import { and, eq } from "drizzle-orm";

function FormUi({
  jsonForm,
  formId,
  onFieldUpdate,
  deleteField,
  selectedTheme,
  selectedStyle,
  editable = true,
}) {
  const theme = themes[selectedTheme] || themes.light;
  const style = styleClasses[selectedStyle] || styleClasses.neobrutalism;

  const [formData, setFormData] = useState({});

  const handleInputChange = (fieldId, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldId]: value,
    }));
  };
  const handleSubmit = async () => {
    // Validate required fields
    const missingFields = jsonForm.fields.filter((field) => {
      if (!field.required) return false;

      const value = formData[field.id];

      if (Array.isArray(value)) return value.length === 0;

      return value === undefined || value === "" || value === false;
    });

    if (missingFields.length > 0) {
      toast.add({
        title: "Missing Required Field",
        description: `Please fill "${missingFields[0].label}".`,
      });
      return;
    }

    try {
      // Automatically find the email field
      const emailField = jsonForm.fields.find(
        (field) => field.type === "email",
      );

      const userEmail = emailField ? formData[emailField.id] : null;

      // Prevent duplicate submissions (only if email exists)
      if (userEmail) {
        const existingResponse = await db
          .select()
          .from(formResponses)
          .where(
            and(
              eq(formResponses.formRef, formId),
              eq(formResponses.userEmail, userEmail),
            ),
          );

        if (existingResponse.length > 0) {
          toast.add({
            title: "Already Submitted",
            description: "This email has already submitted the form.",
          });

          return;
        }
      }

      // Save response
      await db.insert(formResponses).values({
        formRef: formId,
        userEmail,
        jsonResponse: JSON.stringify(formData),
      });

      toast.add({
        title: "Submission Successfull",
        description: "Your response has been submitted successfully.",
      });

      // Clear form
      setFormData({});
    } catch (error) {
      console.error(error);

      toast.add({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
      });
    }
  };

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
              <label className={`flex items-center font-bold ${theme.label}`}>
                {field.label}
                {field.required && <span className="ml-1 text-red-500">*</span>}
              </label>

              {/* Text Inputs */}
              {["text", "email", "number", "tel", "date"].includes(
                field.type,
              ) && (
                <Input
                  className={`${theme.input} ${style.input}`}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  required={field.required}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {/* Textarea */}
              {field.type === "textarea" && (
                <Textarea
                  className={`${theme.textarea} ${style.textarea}`}
                  rows={4}
                  placeholder={field.placeholder}
                  value={formData[field.id] || ""}
                  required={field.required}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
                />
              )}

              {/* Select */}
              {field.type === "select" && (
                <select
                  className={`w-full p-2 ${theme.select} ${style.select}`}
                  value={formData[field.id] || ""}
                  onChange={(e) => handleInputChange(field.id, e.target.value)}
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
                      <input
                        type="radio"
                        name={field.id}
                        value={option}
                        checked={formData[field.id] === option}
                        required={field.required}
                        onChange={(e) =>
                          handleInputChange(field.id, e.target.value)
                        }
                      />
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
                        <input
                          type="checkbox"
                          checked={
                            formData[field.id]?.includes(option) || false
                          }
                          onChange={(e) => {
                            const current = formData[field.id] || [];

                            if (e.target.checked) {
                              handleInputChange(field.id, [...current, option]);
                            } else {
                              handleInputChange(
                                field.id,
                                current.filter((item) => item !== option),
                              );
                            }
                          }}
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                ) : (
                  <label className={`flex items-center gap-2 ${theme.label}`}>
                    <input
                      type="checkbox"
                      checked={formData[field.id] || false}
                      required={field.required}
                      onChange={(e) =>
                        handleInputChange(field.id, e.target.checked)
                      }
                    />
                    {field.label}
                  </label>
                ))}
            </div>

            {editable && (
              <FieldEdit
                field={field}
                onUpdate={(value) => onFieldUpdate(value, index)}
                deleteField={() => deleteField(index)}
              />
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        className={`mt-8 w-full px-4 py-3 font-bold transition-all duration-200
        ${theme.button}
        ${style.button}`}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
}

export default FormUi;
