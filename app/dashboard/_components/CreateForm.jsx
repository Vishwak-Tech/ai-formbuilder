"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { model } from "@/configs/AiModal";
import { useUser } from "@clerk/nextjs";
import { forms } from "@/configs/schema";
import { db } from "@/configs";
import { useRouter } from "next/navigation";

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const route = useRouter();

  const onCreateForm = async () => {
    if (!userInput?.trim()) return;

    setLoading(true);

    try {
      const prompt = `
You are an expert AI Form Designer.

Generate a professional, production-ready form based on the following request.

USER REQUEST:
"${userInput}"

Return ONLY valid JSON.

The JSON must have exactly this structure:

{
  "formTitle": "Meaningful Form Title",
  "description": "Short description of the form",
  "fields": [
    {
      "id": "snake_case_id",
      "label": "Human Readable Label",
      "type": "text",
      "required": true,
      "placeholder": "Helpful placeholder"
    }
  ]
}

FIELD OBJECT RULES:

{
  "id": "snake_case_id",
  "label": "Human Readable Label",
  "type": "text | email | number | tel | date | textarea | select | radio | checkbox",
  "required": true,
  "placeholder": "Helpful placeholder",
  "options": ["Option 1", "Option 2"]
}

IMPORTANT RULES:

- Return ONLY valid JSON.
- Never return markdown.
- Never return explanations.
- Never include comments.
- formTitle must always exist.
- description must always exist.
- fields must always be an array.
- Generate between 10 and 20 meaningful fields.
- Think like a senior Product Designer.
- Build forms used in real-world SaaS products.
- Avoid duplicate or unnecessary fields.
- Choose the most appropriate field type.

FIELD RULES:

- id must be unique and snake_case.
- label must be user-friendly.
- required must always be a boolean (true or false).
- placeholder is required only for:
  - text
  - email
  - number
  - tel
  - textarea
- Do NOT include placeholder for:
  - select
  - radio
  - checkbox
  - date
- options must ONLY exist for:
  - select
  - radio
  - checkbox with multiple choices
- A single agreement checkbox must NOT contain an options array.

Examples of forms:

- Student Registration
- Job Application
- Employee Onboarding
- Customer Feedback
- Event Registration
- Conference Registration
- Hospital Patient Registration
- Medical History
- Scholarship Application
- Loan Application
- Property Rental
- Insurance Claim
- Hotel Booking
- Travel Booking
- Restaurant Reservation
- Course Enrollment
- Survey
- Hackathon Registration

Return ONLY valid JSON matching the required structure.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = (await response.text()).trim();

      const formSchema = JSON.parse(text);
      console.log(formSchema);

      const res = await db
        .insert(forms)
        .values({
          formTitle: formSchema.formTitle,
          jsonForm: JSON.stringify(formSchema),
          createdBy: user?.primaryEmailAddress?.emailAddress,
        })
        .returning({ id: forms.id });

      console.log("New Form ID", res[0].id);
      if (res[0].id) {
        route.push("/edit-form/" + res[0].id);
      }
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button
        onClick={() => setOpenDialog(true)}
        className="
    h-14 border-4 border-black bg-yellow-300 px-8 text-base font-black
    uppercase tracking-wide text-black shadow-[6px_6px_0px_#000] transition-all duration-200
    hover:bg-yellow-400 hover:translate-x-1 hover:translate-y-1 hover:shadow-none
    active:translate-x-0.5 active:translate-y-0.5"
      >
        Create Form
      </Button>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="border-4 border-black bg-white shadow-[8px_8px_0px_#000] rounded-xl max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-extrabold text-black">
              Create New Form
            </DialogTitle>

            <DialogDescription className="mt-3 text-black">
              <p className="mb-4 font-medium">
                Describe the form you want AI to generate.
              </p>

              <Textarea
                className="min-h-45 resize-none border-4 border-black bg-yellow-100 text-black placeholder:text-gray-600 font-medium shadow-[4px_4px_0px_#000] focus-visible:ring-0 focus-visible:outline-none"
                placeholder="Example: Create an internship application form with personal details, education, skills, resume upload, and availability..."
                onChange={(event) => setUserInput(event.target.value)}
              />

              <div className="flex justify-end gap-4 mt-6">
                <Button
                  onClick={() => setOpenDialog(false)}
                  variant="outline"
                  className="border-4 border-black bg-red-300 text-black font-bold shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
                >
                  Cancel
                </Button>

                <Button
                  onClick={onCreateForm}
                  disabled={loading}
                  className="border-4 border-black bg-lime-300 text-black font-bold shadow-[4px_4px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all disabled:opacity-70"
                >
                  {loading ? "Generating..." : "✨ Generate Form"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
