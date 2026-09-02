"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 1, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || !isHome
            ? "bg-[#f5f5f0]/80 backdrop-blur-xl border-b border-black/[0.06]"
            : "bg-transparent dark"
        }`}
      >
        <nav
          className="max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 h-[72px] flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            className="font-serif text-2xl tracking-tight text-foreground hover:text-[#c5a059] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
            aria-label="Harnes 24/7 Home"
          >
            Harnes 24/7
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-foreground/70 hover:text-foreground transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059] rounded"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/get-a-quote"
              className="text-sm font-semibold bg-[#c5a059] hover:bg-[#b38d47] text-white px-5 py-2.5 transition-all duration-300 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-foreground p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <Menu size={22} />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col dark"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/[0.06]">
              <Link
                href="/"
                onClick={() => setMenuOpen(false)}
                className="font-serif text-2xl tracking-tight text-foreground"
              >
                Harnes 24/7
              </Link>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-foreground p-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                aria-label="Close navigation menu"
              >
                <X size={22} />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-10 py-16">
              <ul className="space-y-2" role="list">
                {siteConfig.navigation.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.1 + i * 0.07,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="block text-[clamp(36px,8vw,56px)] font-serif font-normal text-foreground hover:text-[#c5a059] transition-colors duration-300 leading-tight py-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="mt-12"
              >
                <Link
                  href="/get-a-quote"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex text-sm font-semibold bg-[#c5a059] hover:bg-[#b38d47] text-white px-6 py-3 transition-all duration-300 shadow-sm"
                >
                  Get a Quote
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
