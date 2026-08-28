import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We begin with a detailed conversation to understand the student's goals, current challenges, and academic context.",
  },
  {
    number: "02",
    title: "Strategy",
    description:
      "Together we design a personalised learning plan with clear objectives, timelines, and measurable outcomes.",
  },
  {
    number: "03",
    title: "Execution",
    description:
      "Expert tutors and specialists deliver structured sessions, adapting in real time to the student's evolving needs.",
  },
  {
    number: "04",
    title: "Refinement",
    description:
      "Regular reviews and feedback cycles keep the programme on track and continuously improving throughout the engagement.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-[#0d0d0d] border-t border-white/[0.04] dark"
      aria-label="Our Approach"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-20">
          <Reveal>
            <SectionLabel>Our Approach</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading>
              A process designed
              <br />
              around <span className="italic text-foreground/60">you.</span>
            </SectionHeading>
          </Reveal>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.12}>
              <div className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%+16px)] right-0 h-px bg-white/[0.08] w-full" />
                )}
                <p className="text-[clamp(48px,5vw,72px)] font-serif font-normal text-[#c5a059]/20 leading-none mb-6 tracking-tight">
                  {step.number}
                </p>
                <h3 className="font-serif text-[22px] font-normal text-foreground mb-3 leading-snug">
                  {step.title}
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
