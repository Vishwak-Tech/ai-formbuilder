import { Edit, Trash2 } from "lucide-react";
import React from "react";

function FieldEdit({ field }) {
  return (
    <div className="flex flex-col gap-3 items-center">
      <button
        className="p-2 rounded-lg border-2 border-black bg-yellow-300 shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
        title="Edit Field"
      >
        <Edit className="h-4 w-4 text-black" />
      </button>

      <button
        className="p-2 rounded-lg border-2 border-black bg-red-300 shadow-[2px_2px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
        title="Delete Field"
      >
        <Trash2 className="h-4 w-4 text-black" />
      </button>
    </div>
  );
}

export default FieldEdit;