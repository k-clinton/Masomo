import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Harnes 24/7, a premium academic support network dedicated to helping students achieve their full potential.",
  alternates: { canonical: "https://harnes247.com/about" },
};

export default function AboutPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="relative py-28 md:py-40 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel>About Harnes 24/7</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl mb-8">
              Dedicated to academic
              <br />
              <span className="italic text-foreground/60">excellence.</span>
            </SectionHeading>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-[18px] text-foreground/60 max-w-2xl leading-relaxed">
              Harnes 24/7 is a premium academic support network connecting ambitious
              students with expert tutors and subject specialists across all
              levels of education.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 md:py-40 px-6 md:px-10 xl:px-16">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">
          <Reveal>
            <div className="relative aspect-[4/5] max-w-lg">
              <Image
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=900&q=80&auto=format&fit=crop"
                alt="Premium library, Harnes 24/7's commitment to academic excellence"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <SectionLabel>Our Mission</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading className="mb-8">
                Education is the
                <br />
                great equaliser.
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-5 text-[16px] text-foreground/60 leading-relaxed max-w-lg">
                <p>
                  We believe every student, regardless of background,
                  institution, or prior attainment deserves access to the
                  highest quality academic guidance. Harnes 24/7 was founded to make
                  that belief a reality.
                </p>
                <p>
                  Our network of dedicated educators and subject experts delivers
                  personalised, rigorous support designed to unlock each
                  student&apos;s full academic potential. We hold ourselves
                  accountable to measurable outcomes, not just effort.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3} className="mt-10">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-sm text-[#c5a059] hover:text-[#b38d47] transition-colors duration-300 group"
              >
                Start a conversation
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-[#fafaf6] border-y border-black/[0.04]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel>Our Values</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading className="mb-20 max-w-xl">
              What we stand for.
            </SectionHeading>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {[
              { title: "Rigour", body: "We hold every programme to high academic standards because your goals deserve more than a surface level response." },
              { title: "Personalisation", body: "No two students are the same. Every learning plan is built specifically around individual needs, goals, and timelines." },
              { title: "Accountability", body: "Clear milestones, honest feedback, and transparent progress reporting always." },
            ].map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <h3 className="font-serif text-[28px] font-normal text-foreground mb-4">{v.title}</h3>
                <p className="text-sm text-foreground/50 leading-relaxed">{v.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
