const steps = [
  "Fill the form",
  "Join The Vertex on WhatsApp",
  "Get the webinar link in the group",
  "Attend live and get your 2-week Robogebra coupon",
];

export function AfterRegister() {
  return (
    <section
      id="after-register"
      className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16"
    >
      <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
        What happens after you register
      </h2>

      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step} className="rounded-2xl bg-surface-card p-6">
            <span
              aria-hidden
              className="flex size-10 items-center justify-center rounded-full bg-canvas text-sm font-bold leading-none text-ink"
            >
              {i + 1}
            </span>
            <h3 className="mt-4 text-lg font-semibold leading-[1.3] text-ink">
              {step}
            </h3>
          </li>
        ))}
      </ol>

      <p className="mt-8 max-w-[64ch] text-base leading-[1.4] text-body">
        <strong className="font-semibold text-ink">The Vertex:</strong> the
        point where many lines meet, where maths teachers from every board and
        state meet.
      </p>
    </section>
  );
}
