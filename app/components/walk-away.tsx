import {
  Check,
  Gift,
  Lightbulb,
  MessagesSquare,
  Scale,
  Users,
  type LucideIcon,
} from "lucide-react";



const takeaways: {
  Icon: LucideIcon;
  title: string;
  subtitle: string;
  span: string;
}[] = [
    {
      Icon: Lightbulb,
      title: "Ready-to-use tips",
      subtitle: "Use them from your very next class.",
      span: "lg:col-span-3",
    },
    {
      Icon: Scale,
      title: "Better judgment of maths tools",
      subtitle: "Know which ones actually help your class.",
      span: "lg:col-span-3",
    },
    {
      Icon: MessagesSquare,
      title: "15 min live Q&A with Ashraf",
      subtitle: "About your own classroom.",
      span: "lg:col-span-2",
    },
    {
      Icon: Users,
      title: "A place in The Vertex",
      subtitle: "Maths teachers from every board and state.",
      span: "lg:col-span-2",
    },
    {
      Icon: Gift,
      title: "2 weeks of Robogebra, free",
      subtitle: "For those who attend live.",
      span: "sm:col-span-2 lg:col-span-2",
    },
  ];

export function WalkAway() {
  return (
    <section
      id="walk-away"
      className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12 lg:py-16"
    >
      <h2 className="text-[28px] font-bold leading-[1.15] tracking-[-1.2px] text-ink sm:text-[36px] lg:text-[44px]">
        What you&apos;ll walk away with
      </h2>


      <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        {takeaways.map(({ Icon, title, subtitle, span }) => (
          <li
            key={title}
            className={`group relative overflow-hidden rounded-2xl border border-hairline bg-canvas p-6 ${span}`}
          >
            <div
              aria-hidden
              className="absolute inset-0 translate-y-full bg-surface-dark transition-transform duration-300 group-hover:translate-y-0"
            />
            <Icon
              aria-hidden
              className="absolute -top-10 -right-10 z-10 size-32 text-surface-card transition duration-300 group-hover:rotate-12 group-hover:text-on-dark/10"
            />
            <Icon
              aria-hidden
              className="relative z-10 mb-3 size-6 text-ink transition-colors duration-300 group-hover:text-on-dark"
            />
            <h3 className="relative z-10 text-lg font-semibold leading-[1.3] text-ink transition-colors duration-300 group-hover:text-on-dark">
              {title}
            </h3>
            <p className="relative z-10 mt-1.5 text-base leading-[1.4] text-body transition-colors duration-300 group-hover:text-on-dark/70">
              {subtitle}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
