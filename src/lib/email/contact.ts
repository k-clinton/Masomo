import { Resend } from "resend";
import { siteConfig } from "@/data/site";

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company: string;
  service: string;
  message: string;
  submittedAt: Date;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const formatMessage = (value: string) => escapeHtml(value).replace(/\n/g, "<br />");
const personalEmailDomains = new Set([
  "gmail.com",
  "googlemail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
]);

export function createContactEmail(data: ContactEmailData) {
  const submittedAt = data.submittedAt.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
    timeZone: "UTC",
  });
  const safeName = escapeHtml(data.name);
  const safeEmail = escapeHtml(data.email);
  const safePhone = data.phone ? escapeHtml(data.phone) : "";
  const safeCompany = escapeHtml(data.company);
  const safeService = escapeHtml(data.service);
  const safeMessage = formatMessage(data.message);

  return {
    subject: `New enquiry from ${data.name}`,
    html: `
      <div style="background:#f5f5f0;padding:32px 16px;font-family:Arial,Helvetica,sans-serif;color:#1c1c1c;">
        <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e5e3dc;">
          <div style="background:#0a0a0a;padding:28px 32px;">
            <p style="margin:0;color:#c5a059;font-size:11px;letter-spacing:3px;text-transform:uppercase;">Harnes 24/7</p>
            <h1 style="margin:14px 0 0;color:#f5f5f0;font-size:26px;font-weight:400;line-height:1.2;">New enquiry</h1>
          </div>
          <div style="padding:32px;">
            <table role="presentation" style="width:100%;border-collapse:collapse;font-size:14px;">
              <tr><td style="padding:0 0 14px;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;width:38%;">Name</td><td style="padding:0 0 14px;">${safeName}</td></tr>
              <tr><td style="padding:0 0 14px;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Email</td><td style="padding:0 0 14px;"><a href="mailto:${safeEmail}" style="color:#8c651e;">${safeEmail}</a></td></tr>
              ${data.phone ? `<tr><td style="padding:0 0 14px;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Phone</td><td style="padding:0 0 14px;">${safePhone}</td></tr>` : ""}
              ${data.company ? `<tr><td style="padding:0 0 14px;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">School / Institution</td><td style="padding:0 0 14px;">${safeCompany}</td></tr>` : ""}
              ${data.service ? `<tr><td style="padding:0 0 14px;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Service</td><td style="padding:0 0 14px;">${safeService}</td></tr>` : ""}
              <tr><td style="padding:0;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Submitted</td><td style="padding:0;">${submittedAt} UTC</td></tr>
            </table>
            <div style="margin-top:28px;padding-top:24px;border-top:1px solid #e5e3dc;">
              <p style="margin:0 0 12px;color:#777;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;">Message</p>
              <p style="margin:0;font-size:15px;line-height:1.7;white-space:normal;">${safeMessage}</p>
            </div>
          </div>
          <div style="padding:18px 32px;background:#fafaf6;color:#777;font-size:12px;line-height:1.5;">This enquiry was submitted through the Harnes 24/7 website.</div>
        </div>
      </div>
    `,
    text: [
      "HARNES 24/7 - NEW ENQUIRY",
      "",
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      data.phone ? `Phone: ${data.phone}` : "",
      data.company ? `School / Institution: ${data.company}` : "",
      data.service ? `Service: ${data.service}` : "",
      `Submitted: ${submittedAt} UTC`,
      "",
      "Message:",
      data.message,
    ]
      .filter(Boolean)
      .join("\n"),
  };
}

export async function sendContactEmail(data: ContactEmailData) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.HARNES_FROM_EMAIL;
  const recipient = process.env.HARNES_CONTACT_EMAIL || siteConfig.contact.email;

  if (!apiKey || !from || !recipient) {
    throw new Error("Email configuration is incomplete.");
  }

  const senderMatch = from.match(/<([^>]+)>$/) ?? from.match(/^[^\s@]+@[^\s@]+$/);
  const senderAddress = senderMatch?.[1] ?? senderMatch?.[0];
  const senderDomain = senderAddress?.split("@")[1]?.toLowerCase();
  if (!senderDomain || personalEmailDomains.has(senderDomain)) {
    throw new Error("HARNES_FROM_EMAIL must use a verified sending domain.");
  }

  const resend = new Resend(apiKey);
  const email = createContactEmail(data);

  const { data: sentEmail, error } = await resend.emails.send({
    from,
    to: [recipient],
    replyTo: data.email,
    subject: email.subject,
    html: email.html,
    text: email.text,
  });

  if (error) {
    throw new Error(
      `Resend ${error.name ?? "error"}${error.statusCode ? ` (${error.statusCode})` : ""}: ${error.message}`,
    );
  }

  return sentEmail;
}