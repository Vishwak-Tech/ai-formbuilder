import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { Bot, Sparkles, FileText, Zap } from "lucide-react";

export const metadata = {
  title: "Sign In",
  description:
    "Sign in to your FormCraft account to create, manage and share AI-powered forms.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-[#FFF8E7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* LEFT SIDE */}
        <section className="relative hidden lg:flex flex-col justify-center bg-[#FFD54A] border-r-4 border-black px-16">
          {/* Sticker */}
          {/* <div className="absolute top-8 right-8 rotate-6 border-4 border-black bg-pink-400 px-5 py-2 font-black shadow-[6px_6px_0_0_#000]"> */}
            {/* AI POWERED ⚡ */}
          {/* </div> */}

          {/* Logo */}
          <div className="flex items-center gap-4 mb-12">
            <div className="h-16 w-16 flex items-center justify-center bg-white border-4 border-black shadow-[6px_6px_0_0_#000]">
              <Bot size={34} />
            </div>

            <div>
              <h1 className="text-4xl font-black">FormCraft AI</h1>

              <p className="font-semibold">AI Form Builder</p>
            </div>
          </div>

          {/* Heading */}
          <h2 className="text-6xl font-black leading-none">
            BUILD
            <br />
            SMART
            <br />
            FORMS
          </h2>

          <p className="mt-8 max-w-lg text-lg font-medium">
            Generate surveys, registrations, quizzes and feedback forms in
            seconds using Artificial Intelligence.
          </p>

          {/* Features */}
          <div className="mt-10 space-y-4">
            <div className="flex items-center gap-4 bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              <Sparkles />
              <span className="font-bold">AI Form Generation</span>
            </div>

            <div className="flex items-center gap-4 bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              <FileText />
              <span className="font-bold">Beautiful Templates</span>
            </div>

            <div className="flex items-center gap-4 bg-white border-4 border-black p-4 shadow-[6px_6px_0_0_#000]">
              <Zap />
              <span className="font-bold">Instant Sharing</span>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <h1 className="text-4xl font-black">FormCraft AI</h1>

              <p className="font-semibold">AI Form Builder</p>
            </div>

            <div className="border-4 border-black bg-white p-8 shadow-[10px_10px_0_0_#000]">
              <h2 className="text-4xl font-black text-center">
                FormCraft AI
              </h2>

              <p className="text-center mt-2 mb-8 text-gray-600">
                Sign in to continue.
              </p>

              <SignIn
                appearance={{
                  elements: {
                    rootBox: "w-full",
                    card: "shadow-none border-0 bg-transparent",
                    header: "hidden",
                    headerTitle: "hidden",
                    headerSubtitle: "hidden",
                    footer: "hidden",

                    formFieldInput:
                      "border-4 border-black rounded-none focus:ring-0 focus:border-black",

                    formButtonPrimary:
                      "!bg-yellow-400 !text-black border-4 border-black rounded-none font-black shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all",

                    socialButtonsBlockButton:
                      "border-4 border-black rounded-none shadow-[4px_4px_0_0_#000] bg-white",

                    formFieldLabel: "font-bold",

                    dividerText: "font-bold",

                    footerActionLink: "font-bold text-blue-600",
                  },
                }}
              />
            </div>

            <p className="text-center mt-8 font-semibold">
              <Link href="/" className="underline">
                ← Back to Home
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
