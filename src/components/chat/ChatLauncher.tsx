"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ChatLauncher() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  // Don't show launcher on the chat page itself or inside the get-a-quote flow
  const shouldHide = pathname === "/chat" || pathname === "/get-a-quote";

  useEffect(() => {
    if (shouldHide) {
      setVisible(false);
      return;
    }

    // Delay showing launcher to create a premium subtle entrance animation after page mount
    const timer = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(timer);
  }, [shouldHide, pathname]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 15 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40"
        >
          <Link
            href="/chat"
            className="flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-accent-foreground h-12 md:h-14 px-4 md:px-6 shadow-xl border border-accent/20 transition-all duration-300 rounded-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent group"
            aria-label="Chat with us"
          >
            <MessageSquare size={16} className="stroke-[2.25] group-hover:scale-110 transition-transform duration-300" />
            
            {/* Desktop Label */}
            <span className="hidden md:inline text-xs font-semibold uppercase tracking-wider font-sans select-none">
              Chat with us
            </span>

            {/* Mobile Tooltip/Label */}
            <span className="md:hidden sr-only">Chat with us</span>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
