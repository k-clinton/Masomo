import type { Metadata } from "next";
import { QuoteFlow } from "@/components/quote/QuoteFlow";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Calculate your premium academic support program cost instantly. Tailored tutoring, essays, and online class assistance quotes from Mersomo.",
  alternates: { canonical: "https://mersomo.com/get-a-quote" },
};

export default function GetAQuotePage() {
  return (
    <main>
      {/* Editorial Header */}
      <section className="py-20 md:py-28 px-6 md:px-10 xl:px-16 border-b border-black/[0.06] bg-[#fafaf6] dark:bg-[#0a0a0a]">
        <div className="max-w-[1400px] mx-auto text-left">
          <Reveal>
            <SectionLabel>Pricing Calculator</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl leading-tight text-white">
              Structure your
              <br />
              <span className="italic text-white/70">academic support plan.</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm text-white/80 max-w-lg leading-relaxed font-sans">
              Enter your course parameters to calculate a transparent price range for our academic services. Adjust components to fit your study schedule and requirements.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Quote Flow Container */}
      <section className="py-20 px-6 md:px-10 xl:px-16 bg-background">
        <div className="max-w-[1400px] mx-auto">
          <Reveal delay={0.1}>
            <QuoteFlow />
          </Reveal>
        </div>
      </section>
    </main>
  );
}
