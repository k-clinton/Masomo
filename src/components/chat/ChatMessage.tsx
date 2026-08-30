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
          "max-w-[75%] md:max-w-[65%] p-4 border transition-all duration-300 font-sans shadow-sm",
          isVisitor
            ? "bg-accent/20 border-accent/40 text-foreground rounded-none"
            : "bg-secondary border-foreground/15 text-foreground rounded-none"
        )}
      >
        {/* Sender Label */}
        <span className="block text-[10px] uppercase tracking-wider text-[#c5a059] font-semibold mb-1">
          {isVisitor ? "You" : "Mersomo Advisor"}
        </span>

        {/* Message Text */}
        <p className="text-xs md:text-sm leading-relaxed whitespace-pre-line text-foreground font-medium select-text">
          {message.text}
        </p>

        {/* Timestamp */}
        <span className="block text-[9px] text-foreground/75 text-right mt-1.5 font-sans font-medium">
          {timeStr}
        </span>
      </div>
    </div>
  );
}
