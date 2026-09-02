import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section
      id="cta"
      className="relative py-36 md:py-52 overflow-hidden"
      aria-label="Get started with Harnes 24/7"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1800&q=80&auto=format&fit=crop"
          alt="Atmospheric reading room an invitation to academic excellence"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 text-center">
        <Reveal>
          <p className="text-xs font-medium tracking-[0.25em] uppercase text-[#c5a059] mb-6">
            Let&apos;s work together
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-serif font-normal text-[clamp(42px,6vw,88px)] leading-[1.05] tracking-tight text-foreground max-w-3xl mx-auto mb-8">
            Ready to achieve
            <br />
            <span className="italic text-foreground/70">more?</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[17px] text-foreground/60 max-w-md mx-auto leading-relaxed mb-12">
            Tell us about your goals and we will design a programme around your
            specific needs.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#b38d47] text-[#0a0a0a] font-medium text-sm px-8 py-4 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              Start a Conversation
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm border border-foreground/20 hover:border-foreground/50 text-foreground/70 hover:text-foreground px-8 py-4 transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/50"
            >
              View our services
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
