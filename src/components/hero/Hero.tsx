"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[680px] max-h-[1100px] flex items-end overflow-hidden dark"
      aria-label="Hero — Mersomo Premium Academic Support"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: imageY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1800&q=80&auto=format&fit=crop"
          alt="Student studying in a beautiful library — Mersomo academic support"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 xl:px-16 pb-20 md:pb-28 w-full"
        style={{ y: textY }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          variants={itemVariants}
          className="text-xs font-medium tracking-[0.25em] uppercase text-[#c5a059] mb-6"
        >
          Premium Academic Support
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-serif font-normal text-[clamp(48px,7vw,100px)] leading-[1.05] tracking-tight text-foreground max-w-4xl mb-8"
        >
          Where academic
          <br />
          <em className="italic not-italic text-foreground/80">excellence</em>{" "}
          begins.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-[clamp(16px,1.5vw,20px)] text-foreground/60 max-w-md leading-relaxed mb-10"
        >
          Expert tutoring, essay support, and dissertation guidance — tailored
          to help every student reach their full potential.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#b38d47] text-[#0a0a0a] font-medium text-sm px-7 py-3.5 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
          >
            Start a Project
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm text-foreground/60 hover:text-foreground transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
          >
            Explore services
          </Link>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 right-8 md:right-16 z-10 hidden md:flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 [writing-mode:vertical-lr]">
          Scroll
        </p>
        <motion.div
          className="w-px h-12 bg-gradient-to-b from-foreground/30 to-transparent"
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
          style={{ originY: 0 }}
        />
      </motion.div>
    </section>
  );
}
