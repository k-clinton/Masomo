import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Harnes 24/7 collects, uses, and protects personal information.",
  alternates: { canonical: "https://harnes247.com/privacy" },
};

const sections = [
  {
    title: "Information we collect",
    body: [
      "We collect information you choose to provide when you contact us, request a quote, or communicate with our team. This may include your name, email address, phone number, institution, course information, service preferences, budget information, and the contents of your enquiry.",
      "We may also receive limited technical information, such as your IP address, browser type, device information, and pages visited. This information helps us operate, secure, and improve the website.",
    ],
  },
  {
    title: "How we use information",
    body: [
      "Harnes 24/7 uses personal information to respond to enquiries, prepare and review quote requests, provide requested academic support information, communicate about our services, maintain website security, and improve our services and user experience.",
      "We do not use your information for unrelated purposes without a lawful basis or your permission where permission is required.",
    ],
  },
  {
    title: "When information is shared",
    body: [
      "We may share information with trusted service providers that help us host the website, deliver email, provide customer support, process payments when applicable, or maintain security. These providers may use information only to perform services for us and must handle it appropriately.",
      "We may also disclose information when required by law, to protect the rights and safety of Harnes 24/7 or others, or in connection with a business transfer such as a merger or sale of assets. We do not sell personal information.",
    ],
  },
  {
    title: "Cookies and analytics",
    body: [
      "The website may use essential cookies or similar technologies to support core functionality, remember preferences, and understand website performance. You can control cookies through your browser settings, although disabling them may affect some features.",
    ],
  },
  {
    title: "Data retention and security",
    body: [
      "We retain personal information only for as long as reasonably necessary for the purposes described in this policy, to provide services, resolve enquiries, maintain business records, and meet legal obligations.",
      "We use reasonable administrative, technical, and organizational safeguards to protect personal information. No internet transmission or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "Your choices and rights",
    body: [
      "Depending on where you live, you may have rights to request access to, correction of, or deletion of your personal information, or to object to or restrict certain processing. You may also opt out of non-essential marketing communications.",
      "To make a privacy request, contact us using the details below. We may need to verify your identity before completing a request.",
    ],
  },
  {
    title: "Children's privacy",
    body: [
      "Our website is not directed at children under 13. We do not knowingly collect personal information from children without appropriate parental or guardian involvement. If you believe a child has provided information to us, please contact us so we can review and delete it where appropriate.",
    ],
  },
  {
    title: "Updates and contact",
    body: [
      "We may update this policy from time to time. The revised version will be posted on this page with a new effective date. Please review it periodically.",
      `Questions or privacy requests can be sent to ${siteConfig.contact.email}. You can also call ${siteConfig.contact.phone}.`,
    ],
  },
];

export default function PrivacyPage() {
  return (
    <main className="pt-[72px]">
      <section className="py-28 md:py-36 px-6 md:px-10 xl:px-16 border-b border-black/[0.06]">
        <div className="max-w-[1000px] mx-auto">
          <Reveal><SectionLabel>Legal</SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <SectionHeading size="xl" className="max-w-3xl">
              Privacy <span className="italic text-foreground/60">Policy.</span>
            </SectionHeading>
          </Reveal>
          <p className="mt-8 text-sm text-foreground/50">Effective date: September 5, 2026</p>
        </div>
      </section>
      <section className="px-6 md:px-10 xl:px-16 py-20 md:py-28">
        <div className="max-w-[800px] mx-auto space-y-12">
          <p className="text-base md:text-lg leading-relaxed text-foreground/70">
            Harnes 24/7 respects your privacy and is committed to handling your personal information responsibly. This policy explains what we collect through our website and contact services, why we use it, and the choices available to you.
          </p>
          {sections.map((section) => (
            <article key={section.title}>
              <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-4">{section.title}</h2>
              <div className="space-y-4 text-sm md:text-base leading-relaxed text-foreground/65">
                {section.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}