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

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onCreateForm = async () => {
    if (!userInput?.trim()) return;

    setLoading(true);

    try {
      const prompt = `
You are an expert AI Form Designer.

Generate a professional, production-ready form based on the following request.

USER REQUEST:
"${userInput}"

Return ONLY a valid JSON array.

Each field must follow this structure:

{
  "id": "snake_case_id",
  "label": "Human Readable Label",
  "type": "text | email | number | tel | date | textarea | select | radio | checkbox",
  "required": true,
  "placeholder": "Helpful placeholder",
  "options": ["Option 1", "Option 2"]
}

IMPORTANT RULES:

- Return ONLY JSON.
- Never return markdown.
- Never explain anything.
- Never include comments.
- Generate between 10 and 20 meaningful fields.
- Think like a senior Product Designer.
- Build forms used in real-world SaaS products.
- Avoid duplicate or unnecessary fields.
- Choose the most appropriate field type.

FIELD RULES:

- id must be unique and snake_case.
- label must be user-friendly.
- required must always be boolean.
- placeholder should exist for:
  - text
  - email
  - number
  - tel
  - textarea
- placeholder should NOT exist for:
  - select
  - radio
  - checkbox
  - date
- options should ONLY exist for:
  - select
  - radio
  - checkbox with multiple choices
- A single agreement checkbox must NOT contain options.

Examples of forms you can generate:

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

Return ONLY the JSON array.
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = (await response.text()).trim();

      const formSchema = JSON.parse(text);
      console.log(formSchema);

      const res = await db.insert(forms).values({
        formTitle: formSchema.formTitle,
        jsonForm: JSON.stringify(formSchema),
        createdBy: user?.primaryEmailAddress?.emailAddress,
      }) .returning({ id: forms.id });

      console.log(res);
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>+ Create Form</Button>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new form</DialogTitle>
            <DialogDescription>
              <Textarea
                className="my-2"
                placeholder="Write Description of Your Form"
                onChange={(event) => setUserInput(event.target.value)}
              />
              <div className="flex gap-2 my-3 justify-end">
                <Button
                  onClick={() => setOpenDialog(false)}
                  varient="destructive"
                >
                  Cancel
                </Button>
                <Button onClick={onCreateForm} disabled={loading}>
                  {loading ? "Generating..." : "Generate Form"}
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
