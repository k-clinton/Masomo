import React from "react";
import { SUGGESTED_PROMPTS } from "@/lib/chatService";
import { MessageSquare } from "lucide-react";

interface ChatSuggestionsProps {
  onSelectPrompt: (prompt: string) => void;
}

export function ChatSuggestions({ onSelectPrompt }: ChatSuggestionsProps) {
  return (
    <div className="space-y-4 max-w-md mx-auto my-6 text-center">
      <p className="text-xs uppercase tracking-wider text-foreground/85 font-semibold font-sans">
        Suggested questions to get started:
      </p>
      <div className="grid grid-cols-1 gap-2.5">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            type="button"
            onClick={() => onSelectPrompt(prompt)}
            className="flex items-center justify-between text-left p-4 border border-foreground/20 bg-secondary hover:border-accent/60 hover:bg-accent/[0.05] text-xs font-medium text-foreground transition-all duration-300 rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent group"
          >
            <span className="font-sans text-foreground/90 group-hover:text-accent font-medium">
              {prompt}
            </span>
            <MessageSquare size={13} className="text-foreground/50 group-hover:text-accent transition-colors duration-300" />
          </button>
        ))}
      </div>
    </div>
  );
}
