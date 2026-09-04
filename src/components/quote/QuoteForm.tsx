import React, { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { QuoteState } from "@/lib/pricing";

interface QuoteFormProps {
  state: QuoteState;
}

export function QuoteForm({ state }: QuoteFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState(state.courseName ? `I need assistance with my course: ${state.courseName}` : "");
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!name.trim()) tempErrors.name = "Full name is required.";
    
    if (!email.trim()) {
      tempErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = "Please enter a valid email address.";
    }

    if (phone.trim() && !/^\+?[\d\s-]{7,15}$/.test(phone)) {
      tempErrors.phone = "Please enter a valid phone number (including country code).";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const quoteDetails = [
        `Course: ${state.courseName || "Not specified"}`,
        `Subject: ${state.subject}`,
        `Education level: ${state.educationLevel}`,
        `Service: ${state.serviceType}`,
        `Duration: ${state.durationWeeks} weeks`,
        `Negotiation requested: ${state.negotiationRequested ? "Yes" : "No"}`,
        state.proposedBudget ? `Proposed budget: $${state.proposedBudget} USD` : "",
        description.trim() ? `Additional details: ${description.trim()}` : "",
      ].filter(Boolean).join("\n");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: "Quote Request",
          message: quoteDetails,
        }),
      });
      const result = (await response.json()) as { error?: string; success?: boolean };
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to send quote request.");
      }

      setSuccess(true);
    } catch (error) {
      setErrorMsg(error instanceof Error ? error.message : "Something went wrong during submission. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-10 px-4 min-h-[300px]">
        <CheckCircle2 className="text-[#c5a059] w-12 h-12 mb-6 stroke-[1.5]" />
        <h3 className="font-serif text-[28px] font-semibold text-foreground mb-4 leading-tight">
          Request Received
        </h3>
        <p className="text-sm md:text-base text-foreground/85 max-w-sm leading-relaxed mb-6 font-sans font-medium">
          Thank you, <strong className="text-foreground">{name}</strong>. We have received your quote details and will review them shortly. An academic coordinator will contact you at <strong className="text-foreground">{email}</strong>{phone ? <> or <strong className="text-foreground">{phone}</strong></> : null} within one business day.
        </p>
        <div className="bg-[#fafaf6] dark:bg-[#1a1a1a] p-4 text-xs uppercase tracking-wider text-foreground/80 border border-foreground/15 font-sans font-semibold">
          No upfront fees. Guarantee A or B.
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full bg-transparent border-b border-foreground/20 focus:border-accent outline-none py-3 text-sm text-foreground font-medium placeholder:text-foreground/60 transition-colors duration-300 font-sans";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
      {errorMsg && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-xs text-red-500 font-sans font-medium" role="alert">
          {errorMsg}
        </div>
      )}

      {/* Name */}
      <div>
        <label htmlFor="quote-name" className="text-xs tracking-wider uppercase text-foreground/85 font-semibold block mb-2 font-sans">
          Full Name *
        </label>
        <input
          id="quote-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="E.g., John Doe"
          className={inputClass}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "quote-name-error" : undefined}
          required
        />
        {errors.name && (
          <p id="quote-name-error" className="text-xs text-red-500 font-semibold mt-1.5" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="quote-email" className="text-xs tracking-wider uppercase text-foreground/85 font-semibold block mb-2 font-sans">
          Email Address *
        </label>
        <input
          id="quote-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E.g., john@example.com"
          className={inputClass}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "quote-email-error" : undefined}
          required
        />
        {errors.email && (
          <p id="quote-email-error" className="text-xs text-red-500 font-semibold mt-1.5" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="quote-phone" className="text-xs tracking-wider uppercase text-foreground/85 font-semibold block mb-2 font-sans">
          Phone Number <span className="normal-case tracking-normal text-foreground/50">(Optional)</span>
        </label>
        <input
          id="quote-phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="E.g., +1 (555) 019-2834"
          className={inputClass}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "quote-phone-error" : undefined}
        />
        {errors.phone && (
          <p id="quote-phone-error" className="text-xs text-red-500 font-semibold mt-1.5" role="alert">
            {errors.phone}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label htmlFor="quote-description" className="text-xs tracking-wider uppercase text-foreground/85 font-semibold block mb-2 font-sans">
          Project / Course Description (Optional)
        </label>
        <textarea
          id="quote-description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Provide any additional details or guidelines about your class assignments..."
          className="w-full bg-transparent border border-foreground/20 focus:border-accent outline-none p-3 text-sm text-foreground font-medium placeholder:text-foreground/60 transition-colors duration-300 resize-none font-sans"
        />
      </div>

      <div className="pt-4 flex justify-center">
        <Button
          type="submit"
          disabled={loading}
          variant="premium"
          className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 h-12 px-8 uppercase tracking-wider text-xs font-semibold rounded-none bg-accent hover:bg-accent-hover text-accent-foreground border-none transition-all duration-300"
        >
          {loading ? "Submitting..." : "Request This Quote"}
          <Send size={12} />
        </Button>
      </div>
    </form>
  );
}
