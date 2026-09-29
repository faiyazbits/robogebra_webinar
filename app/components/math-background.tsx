"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const STROKE = "var(--ash)";

const lineProps = {
  fill: "none",
  stroke: STROKE,
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

const glyphProps = {
  fill: STROKE,
  fontFamily: "var(--font-inter), system-ui, sans-serif",
  fontWeight: 300,
};

type ShapeProps = { still: boolean };

function DrawnPath({
  d,
  still,
  duration = 7,
  delay = 0,
}: {
  d: string;
  still: boolean;
  duration?: number;
  delay?: number;
}) {
  if (still) return <path d={d} {...lineProps} />;
  return (
    <motion.path
      d={d}
      {...lineProps}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: [0.2, 1] }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }}
    />
  );
}

function SineAxes({ still }: ShapeProps) {
  return (
    <svg viewBox="0 0 160 100" className="h-full w-full">
      <path d="M8 50 H152 M20 90 V10" {...lineProps} />
      <path d="M148 46 L152 50 L148 54 M16 14 L20 10 L24 14" {...lineProps} />
      <DrawnPath
        still={still}
        d="M20 50 C30 20, 40 20, 50 50 S70 80, 80 50 S100 20, 110 50 S130 80, 140 50"
      />
    </svg>
  );
}

function Parabola({ still }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <path d="M10 100 H110 M60 110 V10" {...lineProps} />
      <DrawnPath still={still} duration={8} d="M20 20 Q60 180 100 20" />
      <text x="72" y="22" fontSize="12" {...glyphProps}>
        y = x²
      </text>
    </svg>
  );
}

function UnitCircle({ still }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 120" className="h-full w-full">
      <circle cx="60" cy="60" r="44" {...lineProps} />
      <path d="M10 60 H110 M60 10 V110" {...lineProps} strokeDasharray="2 4" />
      <path d="M60 60 L91 29" {...lineProps} />
      <DrawnPath still={still} duration={6} d="M76 60 A16 16 0 0 0 71.3 48.7" />
      <text x="80" y="54" fontSize="11" {...glyphProps}>
        θ
      </text>
    </svg>
  );
}

function RightTriangle() {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      <path d="M15 85 H105 L15 15 Z" {...lineProps} />
      <path d="M15 75 H25 V85" {...lineProps} />
      <text x="56" y="98" fontSize="10" {...glyphProps}>
        a
      </text>
      <text x="4" y="54" fontSize="10" {...glyphProps}>
        b
      </text>
      <text x="64" y="46" fontSize="10" {...glyphProps}>
        c
      </text>
    </svg>
  );
}

function Hexagon() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <path d="M50 8 L86 29 V71 L50 92 L14 71 V29 Z" {...lineProps} />
      <path d="M50 8 V92 M14 29 L86 71 M86 29 L14 71" {...lineProps} strokeDasharray="2 4" />
    </svg>
  );
}

function Cube() {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <path d="M50 10 L86 30 L50 50 L14 30 Z M14 30 V70 L50 90 V50 M86 30 V70 L50 90" {...lineProps} />
      <path d="M14 70 L50 50 L86 70" {...lineProps} strokeDasharray="2 4" />
    </svg>
  );
}

function CompassArc({ still }: ShapeProps) {
  return (
    <svg viewBox="0 0 120 100" className="h-full w-full">
      <DrawnPath still={still} duration={9} d="M15 80 A50 50 0 0 1 105 80" />
      <path d="M15 80 H105" {...lineProps} />
      <path d="M60 80 L60 30" {...lineProps} strokeDasharray="2 4" />
      <circle cx="60" cy="80" r="2" fill={STROKE} />
    </svg>
  );
}

function Glyph({ children, size = 48 }: { children: ReactNode; size?: number }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={size}
        {...glyphProps}
      >
        {children}
      </text>
    </svg>
  );
}

type Item = {
  pos: CSSProperties;
  size: number;
  render: (still: boolean) => ReactNode;
  spin?: number;
  mobile?: boolean;
  opacity?: number;
};

const items: Item[] = [
  // Left side
  { pos: { top: "10%", left: "3%" }, size: 150, render: (s) => <SineAxes still={s} />, mobile: true },
  { pos: { top: "28%", left: "12%" }, size: 56, render: () => <Glyph size={64}>π</Glyph> },
  { pos: { top: "40%", left: "2%" }, size: 110, render: () => <Hexagon />, spin: 80, mobile: true },
  { pos: { top: "58%", left: "10%" }, size: 60, render: () => <Glyph size={72}>∫</Glyph> },
  { pos: { top: "70%", left: "3%" }, size: 120, render: () => <RightTriangle />, mobile: true },
  { pos: { top: "88%", left: "13%" }, size: 60, render: () => <Glyph size={36}>√x</Glyph> },
  { pos: { top: "86%", left: "1%" }, size: 50, render: () => <Glyph size={52}>Δ</Glyph> },

  // Right side
  { pos: { top: "8%", right: "11%" }, size: 60, render: () => <Glyph size={64}>Σ</Glyph>, mobile: true },
  { pos: { top: "18%", right: "2%" }, size: 120, render: (s) => <UnitCircle still={s} /> },
  { pos: { top: "38%", right: "12%" }, size: 64, render: () => <Glyph size={30}>f(x)</Glyph> },
  { pos: { top: "48%", right: "3%" }, size: 120, render: (s) => <Parabola still={s} />, mobile: true },
  { pos: { top: "66%", right: "12%" }, size: 90, render: () => <Cube />, spin: 90 },
  { pos: { top: "72%", right: "1%" }, size: 60, render: () => <Glyph size={56}>∞</Glyph> },
  { pos: { top: "84%", right: "6%" }, size: 130, render: (s) => <CompassArc still={s} />, mobile: true },
];

export function MathBackground() {
  const reduced = useReducedMotion() ?? false;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: [
            "linear-gradient(to right, var(--hairline) 1px, transparent 1px)",
            "linear-gradient(to bottom, var(--hairline) 1px, transparent 1px)",
            "linear-gradient(to right, var(--hairline-soft) 1px, transparent 1px)",
            "linear-gradient(to bottom, var(--hairline-soft) 1px, transparent 1px)",
          ].join(","),
          backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
          backgroundPosition: "center",
          opacity: 0.55,
          maskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 35%, #000 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.35) 35%, #000 80%)",
        }}
      />

      {items.map((item, i) => {
        const target = item.opacity ?? 0.7;
        const floatDuration = 7 + (i % 5);
        return (
          <motion.div
            key={i}
            className={`absolute ${item.mobile ? "" : "hidden md:block"}`}
            style={{
              ...item.pos,
              width: `clamp(${Math.round(item.size * 0.6)}px, ${item.size / 14}vw, ${item.size}px)`,
              aspectRatio: "1 / 1",
            }}
            initial={{ opacity: 0 }}
            animate={
              reduced
                ? { opacity: target }
                : { opacity: target, y: [0, -8] }
            }
            transition={{
              opacity: { duration: 1.2, delay: i * 0.08 },
              y: {
                duration: floatDuration,
                delay: (i % 4) * 0.7,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
          >
            {item.spin && !reduced ? (
              <motion.div
                className="h-full w-full"
                animate={{ rotate: 360 }}
                transition={{ duration: item.spin, repeat: Infinity, ease: "linear" }}
              >
                {item.render(reduced)}
              </motion.div>
            ) : (
              item.render(reduced)
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
