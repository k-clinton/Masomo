import type { Metadata } from "next";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/sections/CTA";

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
          <div className="divide-y divide-black/[0.06]">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.08}>
                <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-8 md:gap-12 items-start">
                  <span className="font-serif text-[clamp(40px,4vw,56px)] font-normal text-[#c5a059]/30 leading-none">
                    {service.number}
                  </span>
                  <div>
                    <h2 className="font-serif text-[clamp(24px,2.5vw,36px)] font-normal text-foreground mb-4">
                      {service.name}
                    </h2>
                    <p className="text-sm text-foreground/50 leading-relaxed max-w-md">
                      {service.description}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {service.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-3 text-sm text-foreground/50">
                        <span className="w-1 h-1 rounded-full bg-[#c5a059] mt-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
