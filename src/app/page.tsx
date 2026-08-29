import type { Metadata } from "next";
import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { WhyMersomo } from "@/components/sections/WhyMersomo";
import { Process } from "@/components/sections/Process";
import { Work } from "@/components/sections/Work";
import { Story } from "@/components/sections/Story";
import { CTA } from "@/components/sections/CTA";
import { Contact } from "@/components/sections/Contact";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://mersomo.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Mersomo",
  url: "https://mersomo.com",
  description:
    "Mersomo provides premium academic tutoring, essay support, dissertation guidance, and exam preparation for ambitious students at every level.",
  email: "info@mersomo.com",
  sameAs: [
    "https://twitter.com/Mersomo_",
    "https://linkedin.com/company/mersomo",
    "https://instagram.com/mersomo",
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
        <WhyMersomo />
        <Process />
        <Work />
        <Story />
        <CTA />
        <Contact />
      </main>
    </>
  );
}
