const steps = [
  {
    minutes: 20,
    title: "Find your Resonance Index",
    body: "We read out everyday challenges maths teachers face in their classrooms. You rate how much each challenge resonates with you, and we calculate your Resonance Index.",
  },
  {
    minutes: 20,
    title: "An easy fix for every challenge",
    body: "For each challenge, a simple fix you can use in your very next period. No change to how your school works, and it fits every board and textbook.",
  },
  {
    minutes: 5,
    title: "Your welcome to The Vertex",
    body: "Join The Vertex, our community of math teachers from every board and state, share your ideas and insights to fellow math teachers.",
  },
  {
    minutes: 15,
    title: "Ask Ashraf, live",
    body: "Bring the question from your own classroom. Our expert panelist, Ashraf Sharfudeen, answers it live.",
  },
];

export function SessionTimeline() {
  return (
    <section
      id="session"
      className="mx-auto grid max-w-[1280px] items-start gap-8 px-4 py-8 sm:gap-12 sm:px-6 sm:py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-16"
    >
      <div className="flex flex-col items-start lg:sticky lg:top-24">
        <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
          What happens in the session?
        </h2>
      </div>

      <div>
        <ol>
          {steps.map((s, i) => (
            <li key={s.title} className="relative flex gap-4 pb-8 last:pb-0 sm:gap-5">
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className="absolute top-10 bottom-0 left-5 w-px -translate-x-1/2 bg-hairline"
                />
              )}
              <span
                aria-hidden
                className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-surface-card text-sm font-bold leading-none text-ink"
              >
                {i + 1}
              </span>

              <div className="min-w-0 pt-1.5">
                <span className="inline-block rounded-full bg-surface-card px-3 py-1.5 text-xs font-bold leading-none text-ink">
                  {s.minutes} min
                </span>
                <h3 className="mt-3 text-lg font-semibold leading-[1.3] text-ink">
                  {s.title}
                </h3>
                <p className="mt-1.5 text-base leading-[1.4] text-body">
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
