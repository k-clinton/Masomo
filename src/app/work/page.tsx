import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Explore Mersomo's selected programmes and case studies — from Oxford preparation to postgraduate dissertation support.",
  alternates: { canonical: "https://mersomo.com/work" },
};

const projectImages: Record<string, string> = {
  "oxford-distinction":
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80&auto=format&fit=crop",
  "stem-accelerator":
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=900&q=80&auto=format&fit=crop",
  "dissertation-success":
    "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=900&q=80&auto=format&fit=crop",
  "international-foundation":
    "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=1200&q=80&auto=format&fit=crop",
};

export default function WorkPage() {
  return (
    <main className="pt-[72px]">
      {/* Hero */}
      <section className="py-28 md:py-40 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1400px] mx-auto">
          <Reveal>
            <SectionLabel>Selected Work</SectionLabel>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl mb-8">
              Programmes that
              <br />
              <span className="italic text-foreground/60">deliver results.</span>
            </SectionHeading>
          </Reveal>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 px-6 md:px-10 xl:px-16">
        <div className="max-w-[1400px] mx-auto space-y-20 md:space-y-28">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={0.05}>
              <article
                id={project.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
                  i % 2 === 1 ? "lg:[direction:rtl]" : ""
                }`}
              >
                <div className={`relative aspect-[4/3] ${i % 2 === 1 ? "lg:[direction:ltr]" : ""}`}>
                  <Image
                    src={projectImages[project.id]}
                    alt={`${project.title} — Mersomo programme`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className={i % 2 === 1 ? "lg:[direction:ltr]" : ""}>
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[#c5a059] mb-4">
                    {project.category}
                  </p>
                  <h2 className="font-serif text-[clamp(28px,3vw,44px)] font-normal text-foreground mb-5 leading-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <CTA />
    </main>
  );
}
