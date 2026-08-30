import React, { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChatComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatComposer({ onSend, disabled }: ChatComposerProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text);
    setText("");
    
    // Reset height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter sends message, Shift+Enter adds newline
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize composer height
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(120, textarea.scrollHeight)}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    return () => textarea.removeEventListener("input", adjustHeight);
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-3 border-t border-foreground/15 p-4 bg-background"
    >
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question about our pricing, timelines, or subjects..."
          className="w-full bg-secondary border border-foreground/20 focus:border-accent outline-none py-3 pl-4 pr-12 text-sm text-foreground placeholder:text-foreground/60 transition-all duration-300 resize-none font-sans font-medium min-h-[46px] max-h-[120px] rounded-none focus-visible:ring-1 focus-visible:ring-accent"
          style={{ height: "auto" }}
          disabled={disabled}
          aria-label="Write a message"
        />
      </div>
      <Button
        type="submit"
        disabled={!text.trim() || disabled}
        variant="premium"
        size="icon"
        className="flex-shrink-0 w-[46px] h-[46px] bg-accent hover:bg-accent-hover text-accent-foreground rounded-none border-none disabled:opacity-30 disabled:bg-foreground/10 disabled:text-foreground/40 flex items-center justify-center transition-all duration-300"
        aria-label="Send message"
      >
        <Send size={15} />
      </Button>
    </form>
  );
}
