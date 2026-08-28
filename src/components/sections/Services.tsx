"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const serviceImages: Record<string, string> = {
  "academic-tutoring":
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
  "essay-writing":
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80&auto=format&fit=crop",
  "dissertation-thesis":
    "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80&auto=format&fit=crop",
  "exam-preparation":
    "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80&auto=format&fit=crop",
  "language-support":
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=800&q=80&auto=format&fit=crop",
};

export function Services() {
  const [activeId, setActiveId] = useState<string>(services[0].id);

  return (
    <section
      id="services"
      className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-[#fafaf6] border-t border-black/[0.04]"
      aria-label="Our Services"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <Reveal>
              <SectionLabel>Our Services</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading>What we do</SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.2} direction="left">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 group"
            >
              All services
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Service list + image */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-0 items-start">
          {/* Services list */}
          <div className="divide-y divide-black/[0.06]">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.07}>
                <div
                  className={`group py-8 cursor-pointer transition-all duration-300 ${
                    activeId === service.id
                      ? "opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                  onMouseEnter={() => setActiveId(service.id)}
                  onClick={() => setActiveId(service.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      setActiveId(service.id);
                  }}
                  aria-label={`View ${service.name} service`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-baseline gap-4 mb-3">
                        <span className="text-xs font-medium tracking-[0.15em] text-[#c5a059]">
                          {service.number}
                        </span>
                        <h3 className="font-serif text-[clamp(22px,2.5vw,32px)] font-normal text-foreground">
                          {service.name}
                        </h3>
                      </div>
                      {activeId === service.id && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-sm text-foreground/50 leading-relaxed max-w-lg lg:hidden"
                        >
                          {service.description}
                        </motion.p>
                      )}
                      <p className="text-sm text-foreground/50 leading-relaxed max-w-lg mt-2 hidden lg:block">
                        {service.description}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className={`mt-2 flex-shrink-0 transition-all duration-300 ${
                        activeId === service.id
                          ? "text-[#c5a059] translate-x-0"
                          : "text-foreground/20 -translate-x-2"
                      }`}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Active image — desktop only */}
          <div className="hidden lg:block sticky top-28 ml-12">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeId}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Image
                    src={serviceImages[activeId]}
                    alt={`${services.find((s) => s.id === activeId)?.name} — Mersomo service`}
                    fill
                    sizes="420px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
