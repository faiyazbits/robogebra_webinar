"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "Is it really free?",
    answer:
      "Yes. There's no fee to register or attend, and no payment details are asked for.",
  },
  {
    question: "Will you try to sell me something?",
    answer:
      "No. Robogebra is shown during the session because some of the tips we discuss use it, but nothing is sold. Those who attend live get 2 weeks' free access, with no obligation to continue.",
  },
  {
    question: "Is it for my board?",
    answer:
      "Yes. The session is for maths teachers of Grades 6–12 across CBSE, ICSE and state boards. The tips work with any board and textbook.",
  },
  {
    question: "Will there be a recording?",
    answer:
      "The session is built to be attended live: the 15-minute Q&A with Ashraf and the Robogebra coupon are for live attendees. Any update about a recording will be shared in The Vertex community",
  },
  {
    question: "What if it clashes with school hours?",
    answer:
      "The session is 60 minutes and fully online, happening on a saturday evening, so you can join from wherever you are.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();
  const baseId = useId();
  const duration = reduceMotion ? 0 : 0.3;
  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      id="faq"
      className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16"
    >
      <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
        Questions teachers ask
      </h2>

      <ul className="mt-8 max-w-3xl space-y-3">
        {faqs.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          const buttonId = `${baseId}-q${i}`;
          const panelId = `${baseId}-a${i}`;

          return (
            <li
              key={question}
              className="rounded-2xl border border-hairline bg-canvas"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 rounded-2xl p-6 text-left"
                >
                  <span className="text-lg font-semibold leading-[1.3] text-ink">
                    {question}
                  </span>
                  <motion.span
                    aria-hidden
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration, ease }}
                    className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen
                      ? "bg-ink text-on-dark"
                      : "bg-surface-card text-ink"
                      }`}
                  >
                    <Plus className="size-5" />
                  </motion.span>
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration, ease }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-base leading-[1.4] text-body">
                      {answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
