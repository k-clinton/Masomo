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
      "Cookies are small files or similar technologies stored on your device. Harnes 24/7 may use essential cookies to support core functionality, remember preferences, maintain security, and understand website performance. We do not use cookies to sell your personal information.",
      "You can control or delete cookies through your browser settings. Blocking essential cookies may affect some website features. If we introduce analytics, advertising, or other non-essential tracking technologies, we will update this policy and provide any controls required by applicable law.",
    ],
  },
  {
    title: "Information security",
    body: [
      "We use reasonable administrative, technical, and organizational safeguards to protect personal information against unauthorized access, alteration, loss, misuse, or disclosure. Access to personal information should be limited to people and providers who need it for legitimate business purposes.",
      "When contacting us, take reasonable care with sensitive information. Check the recipient before sending documents, avoid putting confidential details in email subject lines, use secure networks and updated devices, and do not share passwords or access credentials. Please report suspected security or privacy incidents to us promptly.",
      "No electronic transmission or storage system is completely secure. We cannot guarantee that information will never be accessed, disclosed, altered, or destroyed despite reasonable safeguards.",
    ],
  },
  {
    title: "Payments, refunds, and service records",
    body: [
      "If you request a paid service, we may process information needed to prepare an invoice, confirm a payment, provide the service, or respond to a refund request. Payment details may be handled by the payment provider used for the transaction; Harnes 24/7 does not need to retain full payment-card credentials in order to respond to an enquiry.",
      "Any refund, cancellation, or service adjustment is handled according to the applicable service agreement, quotation, and the circumstances of the request. We may retain communications, transaction references, and supporting records as needed to review and resolve the request and meet legal or accounting obligations.",
    ],
  },
  {
    title: "Website and third-party content disclaimer",
    body: [
      "The information on this website is provided for general educational and informational purposes. We aim to keep it accurate and useful, but we do not guarantee that every item is complete, current, or suitable for every situation. Your reliance on website content is your responsibility, and service estimates remain preliminary until confirmed by Harnes 24/7.",
      "The website may link to third-party websites or services, including communication providers such as WhatsApp and email or payment providers. We do not control their content, availability, security, or privacy practices. Review their own policies before sharing information or completing a transaction with them.",
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