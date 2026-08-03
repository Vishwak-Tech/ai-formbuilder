import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function FieldEdit({ field, onUpdate, index, deleteField }) {
  const [label, setLabel] = useState(field.label);
  const [placeholder, setPlaceholder] = useState(field.placeholder || "");

  return (
    <div className="flex flex-col gap-3 items-center">
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-2 rounded-lg border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_#000]
            hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            title="Edit Field"
          >
            <Edit className="h-4 w-4 text-black" />
          </button>
        </PopoverTrigger>

        <PopoverContent className="w-80">
          <h2 className="font-bold text-lg mb-4">Edit Field</h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium">Label Name</label>

              <Input value={label} onChange={(e) => setLabel(e.target.value)} />
            </div>

            <div>
              <label className="text-xs font-medium">Placeholder</label>

              <Input
                value={placeholder}
                onChange={(e) => setPlaceholder(e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full mt-4"
            onClick={() =>
              onUpdate(
                {
                  label,
                  placeholder,
                },
                index,
              )
            }
          >
            Save
          </Button>
        </PopoverContent>
      </Popover>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button
            className="p-2 rounded-lg border-2 border-black bg-red-300 shadow-[2px_2px_0px_#000]
      hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
            title="Delete Field"
          >
            <Trash2 className="h-4 w-4 text-black" />
          </button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this field?</AlertDialogTitle>

            <AlertDialogDescription>
              This field will be permanently removed from the form.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => deleteField()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default FieldEdit;
