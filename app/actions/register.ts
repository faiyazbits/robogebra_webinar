"use server";

// Registrations are appended to a Google Sheet through an Apps Script web app.
// Setup: docs/google-sheet-setup.md

import { districts } from "../data/india-districts";

export type RegisterField = "name" | "school" | "district" | "phone";

export type RegisterState = {
  ok: boolean;
  errors?: Partial<Record<RegisterField, string>>;
  formError?: string;
};

const MAX_LEN = 120;
const PHONE_RE = /^(\+?91)?[6-9]\d{9}$/;

function text(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function register(
  _prev: RegisterState,
  formData: FormData,
): Promise<RegisterState> {
  // Honeypot: bots fill every field, people never see this one.
  if (text(formData, "company")) return { ok: true };

  const name = text(formData, "name");
  const school = text(formData, "school");
  const district = text(formData, "district");
  const state = text(formData, "state");
  const phone = text(formData, "phone").replace(/[\s-]/g, "");

  const errors: RegisterState["errors"] = {};

  if (!name) errors.name = "Please enter your name.";
  else if (name.length > MAX_LEN) errors.name = "That name is too long.";

  if (!school) errors.school = "Please enter your school.";
  else if (school.length > MAX_LEN) errors.school = "That school name is too long.";

  const knownDistrict = districts.some(
    (d) => d.district === district && d.state === state,
  );
  if (!knownDistrict) errors.district = "Please pick your district from the list.";

  if (phone && !PHONE_RE.test(phone))
    errors.phone = "Please enter a valid 10-digit mobile number.";

  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("GOOGLE_SHEET_WEBHOOK_URL is not set");
    return { ok: false, formError: "Something went wrong. Please try again." };
  }

  const submittedAt = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        school,
        district,
        state,
        phone,
        submittedAt,
        secret: process.env.GOOGLE_SHEET_WEBHOOK_SECRET || undefined,
      }),
      cache: "no-store",
    });
    const body = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    if (!res.ok || !body?.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch (err) {
    console.error("Registration webhook failed", err);
    return { ok: false, formError: "Something went wrong. Please try again." };
  }

  return { ok: true };
}
