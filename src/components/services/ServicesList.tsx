"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { services } from "@/data/services";
import { Reveal } from "@/components/ui/Reveal";

export function ServicesList() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="divide-y divide-black/[0.06]">
      {services.map((service, i) => {
        const isExpanded = expandedId === service.id;

        return (
          <Reveal
            key={service.id}
            delay={i * 0.08}
            className="max-md:!opacity-100"
          >
            <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-[120px_1fr_1fr] gap-8 md:gap-12 items-start">
              <span className="font-serif text-[clamp(40px,4vw,56px)] font-normal text-[#c5a059]/30 leading-none">
                {service.number}
              </span>
              <div>
                <button
                  type="button"
                  className="w-full flex items-start justify-between gap-6 text-left md:cursor-default"
                  onClick={() => setExpandedId(isExpanded ? null : service.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`${service.id}-details`}
                >
                  <h2 className="font-serif text-[clamp(24px,2.5vw,36px)] font-normal text-foreground">
                    {service.name}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-2xl font-light leading-none text-[#c5a059] md:hidden"
                  >
                    {isExpanded ? "×" : "+"}
                  </span>
                </button>

                <p className="mt-4 hidden text-sm text-foreground/50 leading-relaxed max-w-md md:block">
                  {service.description}
                </p>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={`${service.id}-details`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden md:hidden"
                    >
                      <p className="mt-4 text-sm text-foreground/50 leading-relaxed max-w-md">
                        {service.description}
                      </p>
                      <ul className="mt-5 space-y-2">
                        {service.details.map((detail) => (
                          <li
                            key={detail}
                            className="flex items-start gap-3 text-sm text-foreground/50"
                          >
                            <span className="w-1 h-1 rounded-full bg-[#c5a059] mt-2 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <ul className="hidden space-y-2 md:block">
                {service.details.map((detail) => (
                  <li
                    key={detail}
                    className="flex items-start gap-3 text-sm text-foreground/50"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#c5a059] mt-2 flex-shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}