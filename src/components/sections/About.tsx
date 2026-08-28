import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  return (
    <section
      id="about"
      className="relative py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-background"
      aria-label="About Mersomo"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Images */}
          <Reveal direction="left" className="order-2 lg:order-1">
            <div className="relative">
              {/* Primary image */}
              <div className="relative aspect-[4/5] w-full max-w-md">
                <Image
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=900&q=80&auto=format&fit=crop"
                  alt="Student writing at desk — focused academic work"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              {/* Secondary accent image */}
              <div className="absolute -bottom-8 -right-6 md:-right-12 w-48 md:w-64 aspect-[4/3] border-4 border-background">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop"
                  alt="Tutor and student in a one-on-one session"
                  fill
                  sizes="(max-width: 768px) 192px, 256px"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <Reveal>
              <SectionLabel>About Mersomo</SectionLabel>
            </Reveal>

            <Reveal delay={0.1}>
              <SectionHeading className="mb-8">
                Built for students
                <br />
                who{" "}
                <span className="italic text-foreground/70">
                  refuse to settle.
                </span>
              </SectionHeading>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-foreground/60 text-[17px] leading-relaxed mb-6 max-w-lg">
                Mersomo is a premium academic support network connecting
                ambitious students with expert tutors and subject specialists.
                We believe that every student — regardless of background or
                circumstance — deserves access to the highest quality academic
                guidance.
              </p>
              <p className="text-foreground/50 text-[16px] leading-relaxed mb-10 max-w-lg">
                From secondary school to postgraduate research, our tailored
                approach ensures that every student we work with is empowered
                to achieve — and exceed — their academic potential.
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm text-[#c5a059] hover:text-[#b38d47] transition-colors duration-300 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
              >
                Learn more about us
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
