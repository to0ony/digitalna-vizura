import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n";
import { brcko } from "../data/brcko";

const MotionLi = motion.li;

const { board } = brcko;
const minutes = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));
const clock = (m) =>
  `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const departures = board.departures.map(([route, headsign, time]) => ({
  route,
  headsign,
  time,
  at: minutes(time),
}));
const shown = 7;
const step = 10;
const first = 5 * 60;
const last = 21 * 60;

function BusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-4 shrink-0 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <rect x="5" y="3" width="14" height="15" rx="2" />
      <path d="M5 11h14M8 21v-3M16 21v-3" />
      <circle cx="8.5" cy="14.5" r="0.6" fill="currentColor" />
      <circle cx="15.5" cy="14.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function Step({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="px-1.5 text-muted transition-colors hover:text-signal disabled:opacity-30 disabled:hover:text-muted"
    >
      {children}
    </button>
  );
}

// Ploča stanice s karte uživo u Terminusu: polasci sa stanice do kraja dana
// iz stvarnog voznog reda. Sat se pomiče tipkama, a popis prati.
function StopBoard() {
  const { t } = useLang();
  const b = t.outcomes.board;
  const [now, setNow] = useState(minutes(board.time));

  const remaining = departures.filter((d) => d.at >= now);

  return (
    <div className="max-w-md border border-ink/15 bg-paper shadow-[0_30px_60px_-35px_rgb(0_0_0/0.35)]">
      <div className="flex items-start justify-between gap-4 p-5 pb-3">
        <div>
          <p className="text-lg leading-tight font-semibold tracking-tight">
            {board.stop}
          </p>
          <p className="mt-1 text-xs text-muted">
            {b.until} · {remaining.length}
          </p>
        </div>
        <span className="text-xl leading-none text-muted" aria-hidden="true">
          ×
        </span>
      </div>

      <ul className="h-[21rem] px-3 pb-2 [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
        {remaining.length === 0 && (
          <li className="px-2 py-2 text-sm text-muted">{b.none}</li>
        )}
        {remaining.slice(0, shown).map((d, i) => {
          const wait = d.at - now;
          return (
            <MotionLi
              key={`${d.route}-${d.time}-${d.headsign}`}
              layout="position"
              className="flex items-center justify-between gap-3 px-2 py-2 transition-colors hover:bg-ink/5"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.05 }}
            >
              <span className="flex min-w-0 items-center gap-3">
                <BusIcon />
                <span className="min-w-9 bg-signal px-1.5 py-0.5 text-center font-mono text-xs text-paper">
                  {d.route}
                </span>
                <span className="truncate text-sm">{d.headsign}</span>
              </span>
              <span className="shrink-0 text-right">
                <span className="block text-sm font-semibold">{d.time}</span>
                {wait < 60 && (
                  <span
                    className={`block font-mono text-[11px] ${wait < 15 ? "text-signal" : "text-muted"}`}
                  >
                    {b.in} {wait} min
                  </span>
                )}
              </span>
            </MotionLi>
          );
        })}
      </ul>

      <div className="flex items-center justify-between border-t border-ink/15 px-5 py-3">
        <span className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="size-1.5 animate-pulse rounded-full bg-signal" />
          {b.today}
        </span>
        <span className="flex items-center font-mono text-sm font-semibold">
          <Step
            label={b.earlier}
            disabled={now <= first}
            onClick={() => setNow(Math.max(first, now - step))}
          >
            ‹
          </Step>
          <span className="w-12 text-center tabular-nums">{clock(now)}</span>
          <Step
            label={b.later}
            disabled={now >= last}
            onClick={() => setNow(Math.min(last, now + step))}
          >
            ›
          </Step>
        </span>
      </div>
    </div>
  );
}

export default StopBoard;
