import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4";
  size?: "xl" | "lg" | "md";
}

export function SectionHeading({
  children,
  className,
  as: Tag = "h2",
  size = "lg",
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "font-serif font-normal tracking-tight text-foreground leading-[1.1]",
        {
          "text-[clamp(48px,6vw,88px)]": size === "xl",
          "text-[clamp(36px,4.5vw,64px)]": size === "lg",
          "text-[clamp(28px,3vw,44px)]": size === "md",
        },
        className
      )}
    >
      {children}
    </Tag>
  );
}
