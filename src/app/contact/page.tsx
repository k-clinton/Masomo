import type { Metadata } from "next";
import { Contact } from "@/components/sections/Contact";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Mersomo. Tell us about your academic goals and we will design a programme tailored to you.",
  alternates: { canonical: "https://mersomo.com/contact" },
};

export default function ContactPage() {
  return (
    <main className="pt-[72px]">
      <section className="py-28 md:py-36 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel>Get in touch</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl">
              Ready to begin your
              <br />
              <span className="italic text-foreground/60">academic journey?</span>
            </SectionHeading>
          </Reveal>
        </div>
      </section>
      <Contact />
    </main>
  );
}
