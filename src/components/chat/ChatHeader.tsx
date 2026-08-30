import React from "react";
import Link from "next/link";
import { MessageSquare, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ChatHeaderProps {
  onClear: () => void;
  showClear?: boolean;
}

export function ChatHeader({ onClear, showClear = true }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between border-b border-foreground/10 px-4 py-3.5 bg-[#fafaf6] dark:bg-[#111111]">
      <div className="flex items-center gap-3">
        {/* Animated Brand Symbol/Avatar */}
        <div className="relative w-8 h-8 bg-accent flex items-center justify-center text-accent-foreground select-none">
          <MessageSquare size={14} className="stroke-[1.75]" />
          <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-[#fafaf6] dark:ring-[#111111]" />
        </div>

        <div>
          <Link
            href="/"
            className="font-serif text-sm font-semibold tracking-tight hover:text-accent transition-colors duration-200"
          >
            Mersomo Assistant
          </Link>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-foreground/45 font-sans leading-none font-medium">
              Replies in a few
            </span>
          </div>
        </div>
      </div>

      {showClear && (
        <Button
          type="button"
          variant="ghost"
          onClick={onClear}
          className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-foreground/40 hover:text-accent font-medium h-auto p-2 bg-transparent shadow-none"
          aria-label="Restart chat"
        >
          <RotateCcw size={10} />
          Reset Chat
        </Button>
      )}
    </div>
  );
}
