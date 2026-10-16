import Image from "next/image";
import { TypingRotator } from "./typing-rotator";

const outcomes = [
  "Walk away with tips you can use in your very next class.",
  "Become a member of The Vertex, a community of high school maths teachers all over India.",
  "Complete your syllabus on time and save time on lesson prep.",
];

const details = ["60 min", "Live online", "English"];

function Dot() {
  return (
    <span aria-hidden className="text-stone">
      ·
    </span>
  );
}

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-8 sm:gap-12 sm:px-6 sm:py-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-16">
      <div className="flex flex-col items-start">
        <p className="text-lg font-semibold leading-[1.25] text-mute sm:text-[22px]">
          Still teaching maths the hard way?
        </p>

        <h1 className="mt-3 text-[36px] font-semibold leading-[1.1] tracking-[-1.2px] text-ink sm:text-[44px] lg:text-[56px] xl:text-[64px]">
          The 10 Things That Tire Out Every Maths Teacher &amp; How to Fix Them
        </h1>

        <div className="mt-5 max-w-[52ch] text-base font-medium leading-[1.4] text-body sm:text-lg">
          <TypingRotator lines={outcomes} />
        </div>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-bold leading-[1.4] text-charcoal">
          <time dateTime="2026-10-24T16:00+05:30">Saturday, 24 October</time>
          <Dot />
          <span>04:00 PM – 05:00 PM IST</span>
          {details.map((d) => (
            <span key={d} className="contents">
              <Dot />
              <span>{d}</span>
            </span>
          ))}
        </p>

        <p className="mt-5 rounded-full bg-success-pale px-3.5 py-2 text-sm font-bold leading-[1.4] text-success-deep">
          <span aria-hidden>🎁 </span>Attend live &amp; get 2 weeks&apos; FREE access to Robogebra
        </p>

        <a
          href="#register"
          className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-2xl bg-primary px-6 text-sm font-bold leading-none text-on-primary active:bg-primary-pressed sm:w-auto"
        >
          Save My Free Seat →
        </a>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-surface-card lg:aspect-[6/7]">
        <Image
          src="/teacher_board_chalk.png"
          alt="Maths teacher smiling beside a chalkboard in a classroom"
          fill
          preload
          sizes="(min-width: 1024px) 560px, 100vw"
          className="object-cover object-[center_35%] lg:object-top"
        />
      </div>
    </section>
  );
}
