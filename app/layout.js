import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toast";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL
  ),

  title: {
    default: "FormCraft",
    template: "%s | FormCraft",
  },

  description:
    "Build AI-powered forms in seconds with FormCraft. Generate forms using AI, customize them visually, collect responses, and manage everything from one dashboard.",

  keywords: [
    "AI Form Builder",
    "FormCraft",
    "Forms",
    "Survey",
    "Gemini AI",
    "Next.js",
    "React",
    "No Code",
    "AI",
    "Form Generator",
    "Feedback Form",
    "Online Forms",
  ],

  authors: [
    {
      name: "Vishwak",
    },
  ],

  creator: "Vishwak",
  publisher: "FormCraft",
  applicationName: "FormCraft",
  category: "Productivity",

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full bg-[#FFF8E7]">
          <Header />
          <Toaster />
          {children}

          <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        </body>
      </html>
    </ClerkProvider>
  );
}