import React from "react";
import { motion } from "framer-motion";

export function ChatTypingIndicator() {
  const dotVariants = {
    start: {
      y: "0%",
    },
    end: {
      y: "100%",
    },
  };

  const dotTransition = {
    duration: 0.5,
    repeat: Infinity,
    repeatType: "reverse" as const,
    ease: "easeInOut" as const,
  };

  return (
    <div className="flex items-center gap-1.5 px-4 py-3 bg-[#fafaf6] dark:bg-[#111111] border border-foreground/5 text-foreground max-w-[80px]">
      <div className="flex gap-1 h-2 items-center">
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-foreground/35 block"
          variants={dotVariants}
          initial="start"
          animate="end"
          transition={{
            ...dotTransition,
            delay: 0,
          }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-foreground/35 block"
          variants={dotVariants}
          initial="start"
          animate="end"
          transition={{
            ...dotTransition,
            delay: 0.15,
          }}
        />
        <motion.span
          className="w-1.5 h-1.5 rounded-full bg-foreground/35 block"
          variants={dotVariants}
          initial="start"
          animate="end"
          transition={{
            ...dotTransition,
            delay: 0.3,
          }}
        />
      </div>
    </div>
  );
}
