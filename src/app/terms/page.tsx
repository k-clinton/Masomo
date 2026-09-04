import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms governing access to and use of the Harnes 24/7 website and services.",
  alternates: { canonical: "https://harnes247.com/terms" },
};

const sections = [
  ["Agreement to these terms", "By accessing or using the Harnes 24/7 website, you agree to these Terms of Use and our Privacy Policy. If you do not agree, please do not use the website. We may update these terms by posting a revised version with a new effective date."],
  ["Educational support services", "Harnes 24/7 provides educational guidance, tutoring, study support, writing guidance, and related academic services. Our services are intended to support learning and student development. You remain responsible for your own academic work, submissions, decisions, and compliance with the rules of your school or institution."],
  ["Acceptable use", "You agree to use the website lawfully and respectfully. You must not misuse the website, submit false or misleading information, interfere with its operation or security, attempt unauthorized access, use automated scraping tools, transmit malicious code, or use our services to infringe another person's rights."],
  ["Enquiries and quote requests", "Information submitted through our forms should be accurate and complete. A quote or estimate is preliminary and is not a binding offer until confirmed by Harnes 24/7. We may request additional information before confirming the scope, price, timing, or availability of a service."],
  ["Intellectual property", "The website, its design, text, branding, graphics, code, and other content belong to Harnes 24/7 or our licensors and are protected by applicable intellectual property laws. You may access the content for personal, non-commercial use only. You may not copy, modify, distribute, sell, or commercially exploit it without written permission."],
  ["Third-party links and services", "The website may link to third-party services, including communication or payment providers. These services are governed by their own terms and privacy policies. Harnes 24/7 does not control and is not responsible for third-party content, availability, security, or practices."],
  ["Disclaimers", "The website and its content are provided on an as-is and as-available basis. We do not guarantee that the website will always be uninterrupted, error-free, secure, or current. Educational information is general in nature and does not guarantee a particular grade, academic outcome, admission result, or professional result."],
  ["Limitation of liability", "To the fullest extent permitted by law, Harnes 24/7 and its officers, employees, contractors, and service providers will not be liable for indirect, incidental, special, consequential, or punitive losses arising from your access to or use of the website or services. Nothing in these terms limits liability that cannot lawfully be limited."],
  ["Indemnification", "You agree to defend and hold harmless Harnes 24/7 and its representatives from claims, losses, liabilities, and reasonable expenses arising from your misuse of the website, violation of these terms, or infringement of another person's rights."],
  ["Suspension and termination", "We may suspend or terminate access to the website or refuse service where reasonably necessary, including when a user violates these terms, creates a security risk, provides misleading information, or uses the website unlawfully."],
  ["Governing law and disputes", "These terms are governed by the applicable laws of Kenya, without regard to conflict-of-law rules. Before beginning formal proceedings, the parties should first attempt to resolve a dispute through good-faith written communication. This does not prevent either party from seeking urgent legal relief where appropriate."],
  ["Contact", `Questions about these terms can be sent to ${siteConfig.contact.email} or by phone at ${siteConfig.contact.phone}.`],
];

export default function TermsPage() {
  return (
    <main className="pt-[72px]">
      <section className="py-28 md:py-36 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <Reveal><SectionLabel>Legal</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl">
              Terms of <span className="italic text-foreground/60">Use.</span>
            </SectionHeading>
          </Reveal>
          <p className="mt-8 text-sm text-foreground/50">Effective date: September 5, 2026</p>
        </div>
      </section>
      <section className="px-6 md:px-10 xl:px-16 py-20 md:py-28">
        <div className="max-w-[800px] mx-auto space-y-12">
          <p className="text-base md:text-lg leading-relaxed text-foreground/70">
            These Terms of Use govern your access to and use of the Harnes 24/7 website and related services. Please read them carefully before using the site.
          </p>
          {sections.map(([title, body]) => (
            <article key={title}>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{title}</h2>
              <p className="text-sm md:text-base leading-relaxed text-foreground/65">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}