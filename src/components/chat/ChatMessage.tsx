import React from "react";
import { Message } from "@/lib/chatService";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isVisitor = message.sender === "visitor";

  // Format timestamp (e.g. 10:45 AM)
  const timeStr = message.timestamp.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-[fadeIn_0.3s_ease-out]",
        isVisitor ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] md:max-w-[65%] p-4 border transition-all duration-300 font-sans",
          isVisitor
            ? "bg-accent/10 border-accent/25 text-foreground rounded-none"
            : "bg-[#fafaf6] dark:bg-[#111111] border-foreground/5 text-foreground/80 rounded-none"
        )}
      >
        {/* Sender Label */}
        <span className="block text-[9px] uppercase tracking-wider text-foreground/30 font-medium mb-1">
          {isVisitor ? "You" : "Mersomo Advisor"}
        </span>

        {/* Message Text */}
        <p className="text-xs leading-relaxed whitespace-pre-line text-foreground select-text">
          {message.text}
        </p>

        {/* Timestamp */}
        <span className="block text-[8px] text-foreground/35 text-right mt-1.5 font-sans">
          {timeStr}
        </span>
      </div>
    </div>
  );
}
