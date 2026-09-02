import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyHarnes247 } from "@/components/sections/WhyHarnes247";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Story } from "@/components/sections/Story";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://harnes247.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Harnes 24/7",
  url: "https://harnes247.com",
  description:
    "Harnes 24/7 provides premium academic tutoring, essay support, dissertation guidance, and exam preparation for ambitious students at every level.",
  email: "info@harnes247.com",
  sameAs: [
    "https://twitter.com/Harnes247",
    "https://linkedin.com/company/harnes247",
    "https://instagram.com/harnes247",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyHarnes247 />
        <Process />
        <Work />
        <Story />
        <CTA />
        <Contact />
      </main>
    </>
  );
}
