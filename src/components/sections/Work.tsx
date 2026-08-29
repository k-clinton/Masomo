import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

const projectImages: Record<string, string> = {
  "oxford-distinction":
    "https://res.cloudinary.com/dyysl5jbc/image/upload/v1787996099/Mersomo-LLC_vj9aqe.jpg",
  "stem-accelerator":
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80&auto=format&fit=crop",
  "dissertation-success":
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80&auto=format&fit=crop",
  "international-foundation":
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80&auto=format&fit=crop",
};

export function Work() {
  return (
    <section
      id="work"
      className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-background border-t border-black/[0.04]"
      aria-label="Selected Work"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div>
            <Reveal>
              <SectionLabel>Selected Work</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading>Programmes that deliver.</SectionHeading>
            </Reveal>
          </div>
          <Reveal delay={0.2} direction="left">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-300 group"
            >
              View all programmes
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </Reveal>
        </div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {/* Large project */}
          <Reveal className="md:col-span-7" delay={0}>
            <ProjectCard project={projects[0]} images={projectImages} aspectClass="aspect-[16/10]" />
          </Reveal>

          {/* Two stacked smaller */}
          <div className="md:col-span-5 flex flex-col gap-5 md:gap-6">
            <Reveal delay={0.1}>
              <ProjectCard project={projects[1]} images={projectImages} aspectClass="aspect-[4/3]" />
            </Reveal>
            <Reveal delay={0.15}>
              <ProjectCard project={projects[2]} images={projectImages} aspectClass="aspect-[4/3]" />
            </Reveal>
          </div>

          {/* Wide bottom */}
          <Reveal className="md:col-span-12" delay={0.2}>
            <ProjectCard project={projects[3]} images={projectImages} aspectClass="aspect-[21/9]" wide />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  images: Record<string, string>;
  aspectClass: string;
  wide?: boolean;
}

function ProjectCard({ project, images, aspectClass, wide }: ProjectCardProps) {
  return (
    <Link href={`/work#${project.id}`} className="group block overflow-hidden relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]">
      <div className={`relative ${aspectClass} overflow-hidden`}>
        <Image
          src={images[project.id]}
          alt={`${project.title} — Mersomo programme`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

        {/* Content */}
        <div className={`absolute bottom-0 left-0 right-0 p-6 md:p-8 ${wide ? "md:flex md:items-end md:justify-between" : ""}`}>
          <div>
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c5a059] mb-2">
              {project.category}
            </p>
            <h3 className="font-serif text-[clamp(18px,2vw,26px)] font-normal text-foreground leading-snug">
              {project.title}
            </h3>
          </div>
          {wide && (
            <p className="text-sm text-foreground/50 max-w-xs mt-3 md:mt-0 leading-relaxed hidden md:block">
              {project.description}
            </p>
          )}
          <div className="mt-3 md:mt-0 flex items-center gap-2 text-xs text-foreground/50 group-hover:text-[#c5a059] transition-colors duration-300">
            <span>View</span>
            <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}
