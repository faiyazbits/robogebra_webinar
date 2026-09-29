import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";

const partners = [
  {
    logo: "/ghent.png",
    alt: "Ghent University",
    title: "Maths simulations with Ghent University",
    line: "We built maths teaching simulations with Ghent University, Belgium.",
  },
  {
    logo: "/phet.png",
    alt: "PhET Interactive Simulations, University of Colorado Boulder",
    title: "PhET Interactive Simulations",
    line: "We worked on PhET sims at the University of Colorado Boulder, founded by Nobel laureate Carl Wieman.",
  },
];

const ashrafCredentials = [
  "Founder of Robogebra and Provility",
  "Creator of Robocompass and MathDisk",
  "Co-author of a peer-reviewed paper on progressive disclosure in maths teaching, with Dr. Ajit Kumar and Dr. Sang-Gu Lee",
];

function OverlayPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-3 left-3 rounded-full bg-ink px-3 py-1.5 text-xs font-bold leading-none text-on-dark">
      {children}
    </span>
  );
}

export function WhoWeAre() {
  return (
    <section
      id="who-we-are"
      className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16"
    >
      <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
        Who we are
      </h2>
      <p className="mt-3 max-w-[52ch] text-base leading-[1.4] text-mute sm:text-lg">
        For 15 years, we&apos;ve chased one simple question: how can maths be
        easier to teach, and to learn?
      </p>

      <div className="mt-8 grid gap-3 lg:grid-cols-3">
        <article className="flex flex-col rounded-2xl bg-surface-dark p-6 sm:p-8 lg:col-span-2 lg:row-span-2">
          <Image
            src="/robocompass-logo.png"
            alt="Robocompass"
            width={450}
            height={100}
            className="h-8 w-auto self-start"
          />
          <p className="mt-6 max-w-[40ch] text-[22px] font-semibold leading-[1.25] text-on-dark">
            Our free maths tool, used by lakhs of students and recommended by
            NCERT.
          </p>
          <p className="mt-2 text-base leading-[1.4] text-on-dark/70">
            Teachers around the world use it to draw constructions in class.
          </p>
          <a
            href="https://www.robocompass.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 mb-6 inline-flex items-center gap-1 self-start text-base font-semibold text-on-dark underline underline-offset-4"
          >
            Visit robocompass.com
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
          <Image
            src="/robocompass_impact.png"
            alt="Robocompass ranked the 3rd most-used ICT tool in Indian schools, Kotak Mahindra Bank impact assessment study"
            width={1080}
            height={492}
            sizes="(min-width: 1280px) 780px, (min-width: 1024px) 60vw, 100vw"
            className="h-auto w-full rounded-2xl lg:mt-auto"
          />
        </article>

        {partners.map(({ logo, alt, title, line }) => (
          <article
            key={title}
            className="rounded-2xl border border-hairline bg-canvas p-6"
          >
            <Image
              src={logo}
              alt={alt}
              width={300}
              height={200}
              className="h-24 w-auto"
            />
            <h3 className="mt-4 text-lg font-semibold leading-[1.3] text-ink">
              {title}
            </h3>
            <p className="mt-1.5 text-base leading-[1.4] text-body">{line}</p>
          </article>
        ))}
      </div>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <article className="grid overflow-hidden rounded-2xl border border-hairline bg-canvas sm:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[4/3] bg-surface-card sm:aspect-auto sm:min-h-full">
            <Image
              src="/ashraf.png"
              alt="Ashraf Sharfudeen"
              fill
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover object-top"
            />
            <OverlayPill>Expert panelist</OverlayPill>
          </div>
          <div className="p-6">
            <h3 className="text-[22px] font-semibold leading-[1.25] text-ink">
              Ashraf Sharfudeen
            </h3>
            <ul className="mt-4 space-y-3">
              {ashrafCredentials.map((c) => (
                <li
                  key={c}
                  className="flex gap-2.5 text-base leading-[1.4] text-body"
                >
                  <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-ink" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <article className="grid overflow-hidden rounded-2xl border border-hairline bg-canvas sm:grid-cols-[2fr_3fr]">
          <div className="relative aspect-[4/3] bg-surface-card sm:aspect-auto sm:min-h-full">
            <Image
              src="/faiyaz-headshot.jpeg"
              alt="Muhammed Faiyaz"
              fill
              sizes="(min-width: 768px) 20vw, (min-width: 640px) 40vw, 100vw"
              className="object-cover object-top"
            />
            <OverlayPill>Your host</OverlayPill>
          </div>
          <div className="p-6">
            <h3 className="text-[22px] font-semibold leading-[1.25] text-ink">
              Muhammed Faiyaz
            </h3>
            <p className="mt-2 text-base leading-[1.4] text-body">
              Core Team Member, Robogebra.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
}
