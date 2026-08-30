import React from "react";
import { cn } from "@/lib/utils";

interface QuoteOptionProps {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
  className?: string;
  icon?: React.ReactNode;
}

export function QuoteOption({
  selected,
  onClick,
  title,
  description,
  className,
  icon,
}: QuoteOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full text-left p-5 border text-foreground transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent relative overflow-hidden",
        selected
          ? "border-accent bg-accent/[0.04] text-foreground"
          : "border-foreground/10 bg-transparent hover:border-foreground/30 hover:bg-foreground/[0.01]",
        className
      )}
      aria-pressed={selected}
    >
      {selected && (
        <div className="absolute top-0 right-0 w-3 h-3 bg-accent" style={{ clipPath: "polygon(100% 0, 0 0, 100% 100%)" }} />
      )}
      <div className="flex items-start gap-4">
        {icon && (
          <div className={cn(
            "flex-shrink-0 mt-0.5 transition-colors duration-300",
            selected ? "text-accent" : "text-foreground/40"
          )}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-serif text-base font-normal tracking-tight">{title}</h4>
          {description && (
            <p className="mt-1.5 text-xs text-foreground/50 leading-relaxed font-sans">{description}</p>
          )}
        </div>
      </div>
    </button>
  );
}
