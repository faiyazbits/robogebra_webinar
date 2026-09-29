"use client";

import { startTransition, useActionState, useEffect } from "react";
import {
  register,
  type RegisterField,
  type RegisterState,
} from "../actions/register";
import { DistrictCombobox } from "./district-combobox";

const vertexUrl = process.env.NEXT_PUBLIC_VERTEX_WHATSAPP_URL;

const initialState: RegisterState = { ok: false };

const inputClass =
  "h-11 w-full rounded-2xl border border-ash bg-canvas px-[15px] text-base leading-[1.4] text-ink placeholder:text-ash focus:border-2 focus:border-ink focus:px-[14px] aria-[invalid=true]:border-error";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-semibold leading-[1.4] text-ink"
      >
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm leading-[1.4] text-error">
          {error}
        </p>
      )}
    </div>
  );
}

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(register, initialState);

  useEffect(() => {
    if (!state.ok) return;
    if (vertexUrl) window.location.href = vertexUrl;
    else console.warn("NEXT_PUBLIC_VERTEX_WHATSAPP_URL is not set");
  }, [state.ok]);

  const err = (f: RegisterField) => state.errors?.[f];
  const errProps = (f: RegisterField) =>
    err(f)
      ? { "aria-invalid": true as const, "aria-describedby": `${f}-error` }
      : {};

  return (
    <section
      id="register"
      className="mx-auto grid max-w-[1280px] scroll-mt-16 items-start gap-8 px-4 py-8 sm:gap-12 sm:px-6 sm:py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-16"
    >
      <div className="flex flex-col items-start lg:sticky lg:top-24">

      </div>

      <div className="rounded-[32px] border border-hairline bg-canvas p-6 sm:p-8">
        {state.ok ? (
          <div role="status" className="flex flex-col items-start">
            <h3 className="text-[22px] font-semibold leading-[1.25] text-ink">
              You&apos;re registered
            </h3>
            {vertexUrl && (
              <a
                href={vertexUrl}
                className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-6 text-sm font-bold leading-none text-on-primary active:bg-primary-pressed"
              >
                Join The Vertex on WhatsApp
              </a>
            )}
          </div>
        ) : (
          <form
            noValidate
            onSubmit={(e) => {
              // Submit manually so React doesn't reset the fields on a validation error.
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              startTransition(() => formAction(data));
            }}
            className="flex flex-col gap-5"
          >
            <Field id="name" label="Name" error={err("name")}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                maxLength={120}
                className={inputClass}
                {...errProps("name")}
              />
            </Field>

            <Field id="school" label="School" error={err("school")}>
              <input
                id="school"
                name="school"
                type="text"
                autoComplete="organization"
                required
                maxLength={120}
                className={inputClass}
                {...errProps("school")}
              />
            </Field>

            <Field id="district" label="District" error={err("district")}>
              <DistrictCombobox
                inputClassName={inputClass}
                invalid={!!err("district")}
                describedBy={err("district") ? "district-error" : undefined}
              />
            </Field>

            <Field id="phone" label="Phone number (optional)" error={err("phone")}>
              <input
                id="phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={16}
                className={inputClass}
                {...errProps("phone")}
              />
            </Field>

            <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
              <label htmlFor="company">Company</label>
              <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            {state.formError && (
              <p role="alert" className="text-sm leading-[1.4] text-error">
                {state.formError}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-6 text-sm font-bold leading-none text-on-primary active:bg-primary-pressed disabled:bg-surface-card disabled:text-ash"
            >
              {pending ? "Saving…" : "Save My Free Seat →"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
