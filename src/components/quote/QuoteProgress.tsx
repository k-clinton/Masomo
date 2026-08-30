import React from "react";

interface QuoteProgressProps {
  currentStep: number;
  totalSteps: number;
}

export function QuoteProgress({ currentStep, totalSteps }: QuoteProgressProps) {
  const percentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="w-full mb-8" aria-label="Progress bar">
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-xs font-medium uppercase tracking-wider text-foreground/40">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-semibold text-accent font-sans">
          {percentage}% Complete
        </span>
      </div>
      <div 
        className="h-[2px] w-full bg-foreground/10 overflow-hidden"
        role="progressbar"
        aria-valuenow={percentage}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div 
          className="h-full bg-accent transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
