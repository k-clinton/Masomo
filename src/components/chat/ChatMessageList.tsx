import React, { useRef, useEffect } from "react";
import { Message } from "@/lib/chatService";
import { ChatMessage } from "./ChatMessage";
import { ChatSuggestions } from "./ChatSuggestions";
import { ChatTypingIndicator } from "./ChatTypingIndicator";

interface ChatMessageListProps {
  messages: Message[];
  isTyping: boolean;
  onSelectPrompt: (prompt: string) => void;
}

export function ChatMessageList({
  messages,
  isTyping,
  onSelectPrompt,
}: ChatMessageListProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const showSuggestions = messages.length === 1; // Only welcome message is present

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-background dark:bg-[#0a0a0a] min-h-[350px] scroll-smooth"
      style={{ scrollbarWidth: "thin" }}
    >
      <div className="max-w-[700px] mx-auto w-full">
        {/* Render message elements */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex w-full justify-start mb-4">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-foreground/30 font-medium mb-1 pl-1">
                Mersomo Advisor
              </span>
              <ChatTypingIndicator />
            </div>
          </div>
        )}

        {/* Suggested Questions */}
        {showSuggestions && (
          <div className="pt-6 border-t border-foreground/5 mt-8 animate-[fadeIn_0.5s_ease-out]">
            <ChatSuggestions onSelectPrompt={onSelectPrompt} />
          </div>
        )}
      </div>
    </div>
  );
}
