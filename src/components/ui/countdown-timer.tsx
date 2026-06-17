"use client";

import { Timer } from "@ark-ui/react/timer";

import { cn } from "@/lib/utils";

type CountdownTimerProps = {
  title?: string;
  startMs?: number;
  className?: string;
};

export function CountdownTimer({
  title = "Counting down to forever",
  startMs = 134 * 24 * 60 * 60 * 1000 + 12 * 60 * 60 * 1000 + 35 * 60 * 1000,
  className,
}: CountdownTimerProps) {
  return (
    <div className={cn("w-full rounded-[1.35rem] border border-[var(--line)] bg-[color-mix(in_oklch,var(--surface)_78%,transparent)] p-3", className)}>
      <div className="text-left">
        <h3 className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-[var(--accent)]">
          {title}
        </h3>
        <Timer.Root
          autoStart
          countdown
          startMs={startMs}
          className="flex flex-col"
        >
          <Timer.Area className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-start gap-1 text-[var(--ink)]">
            <div className="flex flex-col">
              <Timer.Item className="font-display min-w-[2ch] text-3xl leading-none md:text-4xl" type="days" />
              <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                days
              </span>
            </div>
            <Timer.Separator className="pt-1 text-2xl text-[var(--muted)]">:</Timer.Separator>
            <div className="flex flex-col">
              <Timer.Item className="font-display min-w-[2ch] text-3xl leading-none md:text-4xl" type="hours" />
              <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                hrs
              </span>
            </div>
            <Timer.Separator className="pt-1 text-2xl text-[var(--muted)]">:</Timer.Separator>
            <div className="flex flex-col">
              <Timer.Item className="font-display min-w-[2ch] text-3xl leading-none md:text-4xl" type="minutes" />
              <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                min
              </span>
            </div>
            <Timer.Separator className="pt-1 text-2xl text-[var(--muted)]">:</Timer.Separator>
            <div className="flex flex-col">
              <Timer.Item className="font-display min-w-[2ch] text-3xl leading-none md:text-4xl" type="seconds" />
              <span className="mt-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-[var(--muted)]">
                sec
              </span>
            </div>
          </Timer.Area>
        </Timer.Root>
      </div>
    </div>
  );
}

export default CountdownTimer;
