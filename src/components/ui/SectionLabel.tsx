import { cn } from "@/lib/utils";

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "text-xs font-medium tracking-[0.2em] uppercase text-[#c5a059] mb-4",
        className
      )}
    >
      {children}
    </p>
  );
}
