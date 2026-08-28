import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-6 text-center py-40">
      <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#c5a059] mb-6">
        404
      </p>
      <h1 className="font-serif text-[clamp(36px,5vw,64px)] font-normal text-foreground mb-6 leading-tight">
        Page not found.
      </h1>
      <p className="text-sm text-foreground/50 max-w-sm mb-10 leading-relaxed">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#b38d47] text-[#0a0a0a] font-medium text-sm px-7 py-3.5 transition-all duration-300"
      >
        Return home
      </Link>
    </main>
  );
}
