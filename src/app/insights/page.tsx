import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Academic insights, study guides, and expert advice from the Harnes 24/7 team.",
  alternates: { canonical: "https://harnes247.com/insights" },
};

export default function InsightsPage() {
  return (
    <main className="pt-[72px]">
      <section className="py-28 md:py-40 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel>Insights</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl mb-8">
              Expert advice for
              <br />
              <span className="italic text-foreground/60">ambitious students.</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[18px] text-foreground/60 max-w-2xl leading-relaxed">
              Guides, strategies, and insights from our network of academic
              specialists — coming soon.
            </p>
          </Reveal>
        </div>
      </section>
      <CTA />
    </main>
  );
}
