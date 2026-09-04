"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
  website: string;
}

const serviceOptions = [
  "Academic Tutoring",
  "Essay & Assignment Support",
  "Dissertation & Thesis",
  "Exam Preparation",
  "Academic Language Support",
  "Other",
];

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    service: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = (await response.json()) as { error?: string; success?: boolean };
      if (!response.ok || !result.success) {
        setSubmitError(result.error || "We could not send your enquiry. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("We could not send your enquiry right now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full bg-transparent border-b border-foreground/12 focus:border-[#c5a059] outline-none py-3 text-sm text-foreground placeholder:text-foreground/40 transition-colors duration-300";

  return (
    <section
      id="contact"
      className="py-28 md:py-40 px-6 md:px-10 xl:px-16 bg-background border-t border-black/[0.04]"
      aria-label="Contact Harnes 24/7"
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28">
          {/* Left */}
          <div>
            <Reveal>
              <SectionLabel>Contact</SectionLabel>
            </Reveal>
            <Reveal delay={0.1}>
              <SectionHeading className="mb-10">
                Let&apos;s start a
                <br />
                <span className="italic text-foreground/60">conversation.</span>
              </SectionHeading>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="text-foreground/70 hover:text-[#c5a059] transition-colors duration-200 text-sm"
                  >
                    {siteConfig.contact.email}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="text-foreground/70 hover:text-foreground transition-colors duration-200 text-sm"
                  >
                    {siteConfig.contact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-foreground/30 mb-1">
                    Location
                  </p>
                  <p className="text-foreground/50 text-sm">
                    {siteConfig.contact.location}
                  </p>
                </div>
                <div className="pt-8 border-t border-foreground/10 mt-8">
                  <h4 className="font-serif text-lg font-normal mb-2 text-foreground leading-snug">
                    Have a question?
                  </h4>
                  <p className="text-sm text-foreground/50 leading-relaxed max-w-xs mb-5 font-sans">
                    Speak with us directly and get help with your project.
                  </p>
                  <a
                    href="https://wa.me/254793995142"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 border border-foreground/20 hover:border-[#c5a059] text-foreground hover:text-[#c5a059] px-5 py-2.5 transition-all duration-300 text-xs font-semibold uppercase tracking-wider font-sans rounded-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c5a059]"
                  >
                    Chat with us
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Form */}
          <Reveal delay={0.15} direction="left">
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full min-h-[400px]" role="status" aria-live="polite">
                <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#c5a059] mb-4">
                  Message Received
                </p>
                <h3 className="font-serif text-[32px] font-normal text-foreground mb-4">
                  Thank you.
                </h3>
                <p className="text-sm text-foreground/50 leading-relaxed max-w-sm">
                  We have received your enquiry and will be in touch within one
                  business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="space-y-8"
                aria-label="Contact form"
              >
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>
                {/* Name */}
                <div>
                  <label htmlFor="name" className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Your full name"
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-error" : undefined}
                  />
                  {errors.name && (
                    <p id="name-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="your@email.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Company (optional) */}
                <div>
                  <label htmlFor="company" className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    School / Institution
                  </label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Optional"
                  />
                </div>

                {/* Service */}
                <div>
                  <label htmlFor="service" className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Service of interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-background text-foreground">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="text-[10px] tracking-[0.2em] uppercase text-foreground/40 block mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your goals and what you need help with..."
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "message-error" : undefined}
                  />
                  {errors.message && (
                    <p id="message-error" role="alert" className="mt-1.5 text-xs text-red-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  aria-busy={submitting}
                  className="inline-flex items-center gap-2 bg-[#c5a059] hover:bg-[#b38d47] disabled:opacity-60 text-[#0a0a0a] font-medium text-sm px-7 py-3.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059]"
                >
                  {submitting ? "Sending..." : "Send Message"}
                  <Send size={14} />
                </button>
                {submitError && (
                  <p role="alert" aria-live="assertive" className="text-xs text-red-400">
                    {submitError}
                  </p>
                )}
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
