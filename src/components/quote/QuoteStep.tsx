import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface QuoteStepProps {
  title: string;
  description?: string;
  onNext: () => void;
  onBack?: () => void;
  canNext: boolean;
  nextLabel?: string;
  children: React.ReactNode;
  errorMessage?: string;
  showActions?: boolean;
}

export function QuoteStep({
  title,
  description,
  onNext,
  onBack,
  canNext,
  nextLabel = "Next",
  children,
  errorMessage,
  showActions = true,
}: QuoteStepProps) {
  // Allow advancing with Enter key (if active focus isn't textarea/button)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && canNext) {
      const activeEl = document.activeElement;
      const tagName = activeEl?.tagName.toLowerCase();
      if (tagName !== "textarea" && tagName !== "button") {
        e.preventDefault();
        onNext();
      }
    }
  };

  return (
    <div onKeyDown={handleKeyDown} className="flex flex-col h-full">
      {/* Step Header */}
      <div className="mb-8">
        <h3 className="font-serif text-[clamp(24px,3vw,32px)] font-semibold text-foreground leading-tight tracking-tight mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-sm md:text-base text-foreground/85 leading-relaxed max-w-2xl font-sans font-medium">
            {description}
          </p>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 min-h-[220px] mb-8 font-sans">
        {children}
      </div>

      {/* Validation Message */}
      {errorMessage && (
        <div className="text-xs text-red-500 font-semibold mb-4 flex items-center gap-1.5" role="alert">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse" />
          {errorMessage}
        </div>
      )}

      {/* Actions */}
      {showActions && <div className="flex items-center justify-between border-t border-foreground/15 pt-6 mt-auto">
        {onBack ? (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2 border-foreground/20 hover:border-foreground/40 text-foreground text-xs uppercase tracking-wider rounded-none font-semibold h-11 px-5"
          >
            <ArrowLeft size={12} />
            Back
          </Button>
        ) : (
          <div /> // spacer
        )}

        <Button
          type="button"
          onClick={onNext}
          disabled={!canNext}
          variant="premium"
          className="flex items-center gap-2 text-xs uppercase tracking-wider rounded-none font-semibold h-11 px-6 bg-accent hover:bg-accent-hover text-accent-foreground border-none disabled:opacity-30 disabled:bg-foreground/10 disabled:text-foreground/40"
        >
          {nextLabel}
          <ArrowRight size={12} />
        </Button>
      </div>}
    </div>
  );
}
