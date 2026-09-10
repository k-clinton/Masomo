import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/sections/CTA";
import { ServicesList } from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Harnes 24/7's academic support services: tutoring, essay writing, dissertation guidance, exam preparation, and language support.",
  alternates: { canonical: "https://harnes247.com/services" },
};

export default function ServicesPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="py-28 md:py-40 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel>Our Services</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl mb-8">
              Everything you need
              <br />
              <span className="italic text-foreground/60">to excel.</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[18px] text-foreground/60 max-w-2xl leading-relaxed">
              Our services are designed to meet students wherever they are and
              take them exactly where they need to go.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Services list */}
      <section className="py-28 px-6 md:px-10 xl:px-16">
        <div className="max-w-[1400px] mx-auto">
          <ServicesList />
        </div>
      </section>

      <CTA />
    </main>
  );
}
