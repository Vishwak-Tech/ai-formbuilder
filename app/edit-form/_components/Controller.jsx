"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backgrounds } from "../_constants/backgrounds";
import { styles } from "../_constants/styles";
import StylePreview from "./StylePreview";

const themes = [
  {
    id: "light",
    name: "Light",
    colors: ["#FFFFFF", "#E5E7EB", "#111827"],
  },
  {
    id: "dark",
    name: "Dark",
    colors: ["#18181B", "#3F3F46", "#FFFFFF"],
  },
  {
    id: "neobrutalism",
    name: "Neo",
    colors: ["#FDE047", "#F97316", "#000000"],
  },
  {
    id: "modern",
    name: "Modern",
    colors: ["#2563EB", "#60A5FA", "#DBEAFE"],
  },
  {
    id: "forest",
    name: "Forest",
    colors: ["#166534", "#22C55E", "#DCFCE7"],
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: ["#EA580C", "#FB923C", "#FED7AA"],
  },
  {
    id: "candy",
    name: "Candy",
    colors: ["#EC4899", "#F472B6", "#FCE7F3"],
  },
  {
    id: "ocean",
    name: "Ocean",
    colors: ["#0891B2", "#22D3EE", "#CFFAFE"],
  },
  {
    id: "lavender",
    name: "Lavender",
    colors: ["#7C3AED", "#A78BFA", "#EDE9FE"],
  },
];

function Controller({
  selectedTheme,
  setSelectedTheme,
  selectedBackground,
  setSelectedBackground,
  selectedStyle,
  setSelectedStyle,
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-extrabold">Select Theme</h2>

      <div className="grid grid-cols-3 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setSelectedTheme(theme.id)}
            className={`
          rounded-xl border-2 p-2 transition-all duration-200
          ${
            selectedTheme === theme.id
              ? "border-black shadow-[4px_4px_0px_#000] scale-105"
              : "border-gray-300 hover:border-black hover:shadow-[3px_3px_0px_#000]"
          }
        `}
          >
            <div className="flex h-12 overflow-hidden rounded-md border border-black">
              {theme.colors.map((color) => (
                <div
                  key={color}
                  className="flex-1"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>

            <p className="mt-2 text-xs font-bold text-center">{theme.name}</p>
          </button>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-extrabold">Background</h2>

      <div className="grid grid-cols-3 gap-4">
        {backgrounds.map((bg) => (
          <button
            key={bg.id}
            onClick={() => setSelectedBackground(bg.id)}
            className={`
        h-16 rounded-xl border-2 transition-all
        ${bg.className}
        ${
          selectedBackground === bg.id
            ? "border-black shadow-[4px_4px_0px_#000] scale-105"
            : "border-gray-300 hover:border-black hover:shadow-[3px_3px_0px_#000]"
        }
      `}
          />
        ))}
      </div>

      <h2 className="mt-8 text-xl font-extrabold">Style</h2>

      <div className="grid grid-cols-3 gap-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`
        rounded-xl border-2 bg-white p-2 transition-all
        ${
          selectedStyle === style.id
            ? "border-black shadow-[4px_4px_0px_#000] scale-105"
            : "border-gray-300 hover:border-black hover:shadow-[3px_3px_0px_#000]"
        }
      `}
          >
            <StylePreview type={style.id} />

            <p className="mt-2 text-center text-xs font-bold">{style.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Controller;
