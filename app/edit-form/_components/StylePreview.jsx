"use client";

function StylePreview({ type }) {
  switch (type) {
    case "neobrutalism":
      return (
        <div className="flex h-10 items-center rounded-none border-2 border-black bg-yellow-300 px-2 shadow-[2px_2px_0px_#000]">
          <div className="h-2 w-8 bg-black"></div>
        </div>
      );

    case "rounded":
      return (
        <div className="flex h-10 items-center rounded-xl border bg-white px-2 shadow">
          <div className="h-2 w-8 rounded-full bg-gray-400"></div>
        </div>
      );

    case "minimal":
      return (
        <div className="flex h-10 items-end px-2">
          <div className="h-[2px] w-full bg-gray-500"></div>
        </div>
      );

    case "modern":
      return (
        <div className="flex h-10 items-center rounded-lg border border-blue-300 bg-blue-50 px-2 shadow-sm">
          <div className="h-2 w-8 rounded bg-blue-500"></div>
        </div>
      );

    case "borderless":
      return (
        <div className="flex h-10 items-center rounded-lg bg-gray-100 px-2">
          <div className="h-2 w-8 rounded bg-gray-500"></div>
        </div>
      );

    case "glass":
      return (
        <div className="flex h-10 items-center rounded-xl border border-white/40 bg-white/40 px-2 backdrop-blur-md">
          <div className="h-2 w-8 rounded bg-white"></div>
        </div>
      );

    case "paper":
      return (
        <div className="flex h-10 items-center rounded border bg-amber-50 px-2">
          <div className="h-2 w-8 bg-amber-700"></div>
        </div>
      );

    case "material":
      return (
        <div className="flex h-10 items-center rounded-md bg-white px-2 shadow-md">
          <div className="h-2 w-8 rounded bg-indigo-500"></div>
        </div>
      );

    case "retro":
      return (
        <div className="flex h-10 items-center rounded-none border-2 border-dashed border-black bg-lime-200 px-2">
          <div className="h-2 w-8 bg-black"></div>
        </div>
      );

    default:
      return null;
  }
}

export default StylePreview;