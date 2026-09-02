import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const differentiators = [
  {
    number: "01",
    title: "Expert matched tutors",
    description:
      "Every student is paired with a specialist who has direct experience in their subject area and academic level.",
  },
  {
    number: "02",
    title: "Personalised pathways",
    description:
      "We design bespoke learning plans around each student's goals, timeline, and learning style not a one-size template.",
  },
  {
    number: "03",
    title: "Results you can measure",
    description:
      "Clear milestones, regular feedback, and transparent progress reports so students and parents always know where they stand.",
  },
  {
    number: "04",
    title: "A network that cares",
    description:
      "We are academics, educators, and mentors who are genuinely invested in the long term success of every student we support.",
  },
];

export function WhyHarnes247() {
  return (
    <section
      id="why-harnes-247"
      className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-background border-t border-black/[0.04]"
      aria-label="Why Harnes 24/7"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20 md:mb-28">
          <Reveal>
            <SectionLabel>Why Harnes 24/7</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading>
              The standard your
              <br />
              education{" "}
              <span className="italic text-foreground/60">deserves.</span>
            </SectionHeading>
          </Reveal>
        </div>

        {/* Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.08]">
          {differentiators.map((item, i) => (
            <Reveal key={item.number} delay={i * 0.1}>
              <div className="bg-[#fafaf6] p-8 md:p-10 h-full group hover:bg-white transition-colors duration-300">
                <p className="text-xs font-medium tracking-[0.15em] text-[#c5a059] mb-6">
                  {item.number}
                </p>
                <h3 className="font-serif text-[22px] font-normal text-foreground mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
