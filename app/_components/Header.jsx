import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b-4 border-black bg-[#FFF8E7]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="border-4 border-black bg-white p-2 shadow-[4px_4px_0px_#000]">
            <Image
              src="/logo.svg"
              alt="FormCraft AI"
              width={32}
              height={32}
              priority
            />
          </div>

          <h1 className="text-2xl font-black uppercase tracking-tight">
            FormCraft{" "}
            <span className="inline-block rotate-[-2deg] border-4 border-black bg-yellow-300 px-2 py-1">
              AI
            </span>
          </h1>
        </Link>

        {/* CTA */}
        <Button className="rounded-none border-4 border-black bg-yellow-300 px-6 py-6 text-lg font-black uppercase text-black shadow-[6px_6px_0px_#000] transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
          Get Started →
        </Button>
      </div>
    </header>
  );
}

export default Header;

// {/* Navigation */}
{
  /* <nav className="hidden items-center gap-8 text-lg font-bold md:flex"> */
}
{
  /* <Link href="#" className="hover:underline"> */
}
{
  /* Features */
}
{
  /* </Link> */
}
{
  /* <Link href="#" className="hover:underline"> */
}
{
  /* Pricing */
}
{
  /* </Link> */
}
{
  /* <Link href="#" className="hover:underline"> */
}
{
  /* Templates */
}
{
  /* </Link> */
}
{
  /* <Link href="#" className="hover:underline"> */
}
{
  /* Contact */
}
{
  /* </Link> */
}
{
  /* </nav> */
}
