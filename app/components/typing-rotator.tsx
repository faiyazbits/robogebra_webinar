"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

const TYPE_MS = 40;
const DELETE_MS = 20;
const HOLD_MS = 2000;
const GAP_MS = 400;
const STILL_SWAP_MS = 4000;

type Phase = "typing" | "holding" | "deleting";

export function TypingRotator({ lines }: { lines: string[] }) {
  const reduced = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(lines[0].length);
  const [phase, setPhase] = useState<Phase>("holding");

  const line = lines[index];

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => {
        const next = (index + 1) % lines.length;
        setIndex(next);
        setCount(lines[next].length);
      }, STILL_SWAP_MS);
      return () => clearTimeout(t);
    }

    let t: ReturnType<typeof setTimeout>;
    if (phase === "typing") {
      t =
        count < line.length
          ? setTimeout(() => setCount(count + 1), TYPE_MS)
          : setTimeout(() => setPhase("holding"), 0);
    } else if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), HOLD_MS);
    } else if (count > 0) {
      t = setTimeout(() => setCount(count - 1), DELETE_MS);
    } else {
      t = setTimeout(() => {
        setIndex((index + 1) % lines.length);
        setPhase("typing");
      }, GAP_MS);
    }
    return () => clearTimeout(t);
  }, [reduced, phase, count, index, line.length, lines]);

  return (
    <div className="grid">
      <ul className="sr-only">
        {lines.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      {lines.map((l) => (
        <span key={l} aria-hidden className="invisible col-start-1 row-start-1 pr-1">
          {l}
        </span>
      ))}
      <span aria-hidden className="col-start-1 row-start-1">
        {line.slice(0, count)}
        <span className="caret ml-0.5 inline-block h-[1.1em] w-0.5 translate-y-[0.2em] bg-ink" />
      </span>
    </div>
  );
}
