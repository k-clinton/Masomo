import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Story() {
  return (
    <section
      id="story"
      className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-[#fafaf6] border-t border-black/[0.04]"
      aria-label="Our Story"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left: Content */}
          <div>
            <Reveal>
              <SectionLabel>Our Story</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading className="mb-10">
                Education is the
                <br />
                <span className="italic text-foreground/60">
                  great equaliser.
                </span>
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[17px] text-foreground/60 leading-relaxed mb-6 max-w-lg">
                Harnes 24/7 was founded on a simple but powerful belief: that
                exceptional academic support should not be a privilege of the
                few. We set out to build a network of dedicated educators and
                subject experts who could give every student the attention,
                guidance, and rigour they need to succeed.
              </p>
              <p className="text-[16px] text-foreground/50 leading-relaxed mb-6 max-w-lg">
                From our earliest days, we have been committed to matching
                students with the right specialist not just any tutor and
                to holding ourselves accountable to measurable, meaningful
                outcomes.
              </p>
              <p className="text-[16px] text-foreground/50 leading-relaxed max-w-lg">
                Today, we continue to grow that mission: building a community
                where academic ambition is nurtured, potential is realised, and
                every student leaves better equipped for the path ahead.
              </p>
            </Reveal>
          </div>

          {/* Right: Image stack */}
          <Reveal direction="left" delay={0.15}>
            <div className="grid grid-cols-2 gap-4 md:gap-6">
              <div className="relative aspect-[3/4] col-span-2">
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&q=80&auto=format&fit=crop"
                  alt="Students collaborating in a study session"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=80&auto=format&fit=crop"
                  alt="Tutor reviewing student work"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
              <div className="relative aspect-square">
                <Image
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=80&auto=format&fit=crop"
                  alt="Student achieving academic success"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="eager"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
