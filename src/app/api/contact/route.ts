import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/email/contact";

export const runtime = "nodejs";

const MAX_LENGTHS = {
  name: 120,
  email: 254,
  company: 160,
  service: 100,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const serviceOptions = new Set([
  "Academic Tutoring",
  "Essay & Assignment Support",
  "Dissertation & Thesis",
  "Exam Preparation",
  "Academic Language Support",
  "Other",
]);
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000;

function clientAddress(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
}

function cleanText(value: unknown) {
  return typeof value === "string"
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").trim()
    : "";
}

export async function POST(request: Request) {
  const address = clientAddress(request);
  const lastSubmission = rateLimit.get(address);
  if (lastSubmission && Date.now() - lastSubmission >= RATE_LIMIT_WINDOW) {
    rateLimit.delete(address);
  }
  if (lastSubmission && Date.now() - lastSubmission < RATE_LIMIT_WINDOW) {
    return NextResponse.json(
      { error: "Please wait a few minutes before sending another enquiry." },
      { status: 429 },
    );
  }

  let body: Record<string, unknown>;
  try {
    const parsed = await request.json();
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      throw new Error("Invalid body");
    }
    body = parsed as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Please submit the form again." }, { status: 400 });
  }

  if (cleanText(body.website)) {
    return NextResponse.json({ error: "Please submit the form again." }, { status: 400 });
  }

  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const company = cleanText(body.company);
  const service = cleanText(body.service);
  const message = cleanText(body.message);

  if (
    !name ||
    !email ||
    !message ||
    name.length > MAX_LENGTHS.name ||
    email.length > MAX_LENGTHS.email ||
    company.length > MAX_LENGTHS.company ||
    service.length > MAX_LENGTHS.service ||
    message.length > MAX_LENGTHS.message ||
    !emailPattern.test(email) ||
    (service.length > 0 && !serviceOptions.has(service))
  ) {
    return NextResponse.json(
      { error: "Please check your details and try again." },
      { status: 400 },
    );
  }

  try {
    await sendContactEmail({
      name,
      email,
      company,
      service,
      message,
      submittedAt: new Date(),
    });
    rateLimit.set(address, Date.now());
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email delivery failed", error);
    return NextResponse.json(
      { error: "We could not send your enquiry right now. Please try again shortly." },
      { status: 502 },
    );
  }
}