import { Check } from "lucide-react";

const audience = [
  "Maths teachers of Grades 6–12, any board, anywhere in India",
  "Maths teachers at coaching centres",
  "Maths HODs and coordinators who support a team of teachers",
];

export function WhoShouldJoin() {
  return (
    <section
      id="who-should-join"
      className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16"
    >
      <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
        Who should join
      </h2>

      <ul className="mt-8 grid gap-3 md:grid-cols-3">
        {audience.map((line) => (
          <li
            key={line}
            className="rounded-2xl border border-hairline bg-canvas p-6"
          >
            <span className="mb-4 flex size-10 items-center justify-center rounded-full bg-surface-card">
              <Check aria-hidden className="size-5 text-ink" />
            </span>
            <p className="text-lg font-semibold leading-[1.3] text-ink">
              {line}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
