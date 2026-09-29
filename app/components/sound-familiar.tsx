import Image from "next/image";

const moments = [
  {
    title: "Same graph. Same steps. Fifth time this week.",
    body: "Class 9A, 9B, 9C, 9D: the same graph, redrawn from scratch for every section.",
  },
  {
    title: "The one student who just can't see the cone.",
    body: "Thirty-nine heads nod. One doesn't. The bell rings before you can try again.",
  },
  {
    title: "AI was supposed to save you time.",
    body: "Instead, it gives answers your board doesn't follow. Now you're double-checking at 11 PM.",
  },
];

export function SoundFamiliar() {
  return (
    <section
      id="sound-familiar"
      className="mx-auto grid max-w-[1280px] items-center gap-8 px-4 py-8 sm:gap-12 sm:px-6 sm:py-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:py-16"
    >
      <div className="flex flex-col items-start">
        <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
          Sound familiar?
        </h2>

        <ul className="mt-6 w-full border-t border-hairline">
          {moments.map((m) => (
            <li key={m.title} className="border-b border-hairline py-5">
              <h3 className="text-lg font-semibold leading-[1.3] text-ink">
                {m.title}
              </h3>
              <p className="mt-1.5 text-base leading-[1.4] text-body">
                {m.body}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-base font-semibold leading-[1.4] text-charcoal">
          You&apos;re not alone. We&apos;ll walk through these moments together.
        </p>
      </div>

      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[32px] bg-surface-card lg:order-first">
        <Image
          src="/confused_kid.png"
          alt="A schoolboy frowning at a cone drawn in his notebook while classmates carry on around him"
          fill
          sizes="(min-width: 1024px) 520px, 100vw"
          className="object-cover object-top"
        />
        <span className="absolute right-4 bottom-4 rounded-full bg-canvas px-3 py-1.5 text-xs font-bold leading-none text-ink">
          Still can&apos;t picture the cone
        </span>
      </div>
    </section>
  );
}
