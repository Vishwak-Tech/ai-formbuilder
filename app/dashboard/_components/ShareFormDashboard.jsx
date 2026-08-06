"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

import { Share2, Copy, ExternalLink, Download } from "lucide-react";

import { FaWhatsapp, FaLinkedin } from "react-icons/fa";

import QRCode from "react-qr-code";

function ShareFormDashboard({ formId }) {
  const [copied, setCopied] = useState(false);

  const formUrl = `${process.env.NEXT_PUBLIC_APP_URL}/aiform/${formId}`;

  const shareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(formUrl)}`, "_blank");
  };

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        formUrl,
      )}`,
      "_blank",
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(formUrl);

    setCopied(true);

    toast.add({
      title: "Success",
      description: "Link copied successfully!",
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = () => {
    const svg = document.getElementById("form-qr");

    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = `form-${formId}-qr.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <Dialog>
      <DialogTrigger
        className="flex items-center gap-2 rounded-lg border-4 border-black
  bg-lime-300 px-5 py-2 font-bold
  shadow-[4px_4px_0px_#000]
  transition-all duration-200
  hover:-translate-x-1 hover:-translate-y-1
  hover:shadow-[6px_6px_0px_#000]"
      >
        <Share2 size={18} />
        Share
      </DialogTrigger>

      <DialogContent className="max-w-md border-4 border-black bg-[#FFF8E7] p-5 shadow-[8px_8px_0px_#000]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-black uppercase">
            Share Your Form
          </DialogTitle>
        </DialogHeader>

        {/* QR Code */}

        <div className="flex justify-center">
          <div className="border-4 border-black bg-white p-3 shadow-[4px_4px_0px_#000]">
            <QRCode id="form-qr" value={formUrl} size={140} />
          </div>
        </div>

        {/* URL */}

        <input
          readOnly
          value={formUrl}
          className="mt-4 w-full border-4 border-black bg-white px-3 py-2 text-center text-xs font-semibold outline-none"
        />

        {/* Share Buttons */}

        <div className="mt-5 grid grid-cols-2 gap-3">
          {/* WhatsApp */}

          <button
            onClick={shareWhatsapp}
            className="flex h-20 flex-col items-center justify-center border-4 border-black
        bg-green-400 shadow-[4px_4px_0px_#000]
        transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none"
          >
            <FaWhatsapp className="text-3xl text-white" />
            <span className="mt-1 text-sm font-bold">WhatsApp</span>
          </button>

          {/* LinkedIn */}

          <button
            onClick={shareLinkedIn}
            className="flex h-20 flex-col items-center justify-center border-4 border-black
        bg-sky-500 text-white shadow-[4px_4px_0px_#000]
        transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none"
          >
            <FaLinkedin className="text-3xl" />
            <span className="mt-1 text-sm font-bold">LinkedIn</span>
          </button>

          {/* Copy */}

          <button
            onClick={copyLink}
            className="flex h-20 flex-col items-center justify-center border-4 border-black
        bg-yellow-300 shadow-[4px_4px_0px_#000]
        transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none"
          >
            <Copy size={28} />
            <span className="mt-1 text-sm font-bold">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>

          {/* Download QR */}

          <button
            onClick={downloadQR}
            className="flex h-20 flex-col items-center justify-center border-4 border-black
        bg-pink-300 shadow-[4px_4px_0px_#000]
        transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none"
          >
            <Download size={28} />
            <span className="mt-1 text-sm font-bold">Download QR</span>
          </button>
        </div>

        {/* Divider */}

        <div className="my-2 border-t-4 border-black" />

        {/* Open Form */}

        <a
          href={formUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border-4 border-black
      bg-cyan-400 py-3 text-base font-black
      shadow-[4px_4px_0px_#000]
      transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-none"
        >
          <ExternalLink size={20} />
          Open Form
        </a>
      </DialogContent>
    </Dialog>
  );
}

export default ShareFormDashboard;
