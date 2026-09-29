"use client";

import { useId, useMemo, useState } from "react";
import { districts, type District } from "../data/india-districts";

const MAX_RESULTS = 8;

function search(query: string): District[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const prefix: District[] = [];
  const rest: District[] = [];
  for (const d of districts) {
    const names = [d.district, ...(d.aliases ?? [])].map((n) => n.toLowerCase());
    if (names.some((n) => n.startsWith(q))) prefix.push(d);
    else if (
      names.some((n) => n.includes(q)) ||
      d.state.toLowerCase().includes(q)
    )
      rest.push(d);
  }
  return [...prefix, ...rest].slice(0, MAX_RESULTS);
}

const label = (d: District) => `${d.district}, ${d.state}`;

export function DistrictCombobox({
  inputClassName,
  invalid,
  describedBy,
}: {
  inputClassName: string;
  invalid?: boolean;
  describedBy?: string;
}) {
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<District | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const results = useMemo(() => search(query), [query]);
  const showList = open && query.trim().length > 0 && !selected;

  function choose(d: District) {
    setSelected(d);
    setQuery(label(d));
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && showList) {
      e.preventDefault();
      if (results[active]) choose(results[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div className="relative">
      <input
        id="district"
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-expanded={showList}
        aria-controls={listId}
        aria-activedescendant={
          showList && results[active] ? `${id}-opt-${active}` : undefined
        }
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        autoComplete="off"
        placeholder="Start typing your district"
        required
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(null);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => {
          setOpen(false);
          if (!selected && results.length === 1) choose(results[0]);
        }}
        onKeyDown={onKeyDown}
        className={inputClassName}
      />
      <input type="hidden" name="district" value={selected?.district ?? ""} />
      <input type="hidden" name="state" value={selected?.state ?? ""} />

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Districts"
          className="absolute z-20 mt-2 max-h-72 w-full overflow-auto rounded-2xl border border-hairline bg-canvas py-2"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-sm leading-[1.4] text-mute">
              No matching district
            </li>
          ) : (
            results.map((d, i) => (
              <li
                key={label(d)}
                id={`${id}-opt-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(d)}
                className={`flex cursor-pointer items-baseline justify-between gap-3 px-4 py-3 ${
                  i === active ? "bg-surface-card" : ""
                }`}
              >
                <span className="text-base leading-[1.4] text-ink">
                  {d.district}
                </span>
                <span className="text-right text-sm leading-[1.4] text-mute">
                  {d.state}
                </span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
