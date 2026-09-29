export function FinalCta() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      <div className="flex flex-col items-center rounded-[32px] bg-surface-card px-6 py-10 text-center sm:px-8 sm:py-12">
        <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-1.2px] text-ink">
          What are you waiting for? Book your free seat.
        </h2>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm font-bold leading-[1.4] text-charcoal">
          <time dateTime="2026-10-10T16:00+05:30">Saturday, 10 October</time>
          <span aria-hidden className="text-stone">
            ·
          </span>
          <span>04:00 PM – 05:00 PM IST</span>
        </p>

        <a
          href="#register"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-6 text-sm font-bold leading-none text-on-primary active:bg-primary-pressed sm:w-auto"
        >
          Save My Free Seat →
        </a>
      </div>
    </section>
  );
}
