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

function CreateForm() {
  const [openDialog, setOpenDialog] = useState(false);
  const [userInput, setUserInput] = useState();

  const onCreateForm = async () => {
    if (!userInput.trim()) return;

    try {
      const prompt = `
      ${userInput}

      Return ONLY valid JSON.

The JSON must contain exactly:

{
  "formTitle": "",
  "description": "",
  "sections": [
    {
      "sectionTitle": "",
      "fields": []
    }
  ],
  "submitButton": {
    "label": ""
  }
}

Do not include markdown.
Do not include explanations.
    `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const json = await response.text();

      const formSchema = JSON.parse(json);

      console.log(formSchema);
    } catch (error) {
      console.error("Gemini Error:", error);
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
                <Button onClick={onCreateForm}>Create</Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateForm;
