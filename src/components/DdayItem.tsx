import type { ConferenceDeadline, DeadlineUrgency } from "../types/dashboard";
import {
  formatDeadlineDate,
  getCategoryColorClass,
  getDaysUntil,
  getDeadlineUrgency,
  normalizeDeadlineCategory,
  startCaseCategory
} from "../utils/date";

const badgeStyles: Record<DeadlineUrgency, string> = {
  danger: "bg-red-500/20 text-red-300 ring-red-400/40",
  warning: "bg-amber-400/20 text-amber-200 ring-amber-300/35",
  safe: "bg-emerald-500/20 text-emerald-200 ring-emerald-400/35",
  past: "bg-slate-600/30 text-slate-300 ring-slate-400/30"
};

interface DdayItemProps {
  conference: ConferenceDeadline;
  now: Date;
}

export function DdayItem({ conference, now }: DdayItemProps) {
  const daysLeft = getDaysUntil(conference.deadline, now);
  const urgency = getDeadlineUrgency(daysLeft);
  const ddayLabel = daysLeft >= 0 ? `D-${daysLeft}` : `D+${Math.abs(daysLeft)}`;
  const category = normalizeDeadlineCategory(conference.category);

  return (
    <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)_auto] items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-3 sm:px-4 sm:py-4">
      <div className="min-w-0">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.14em] ring-1 ${getCategoryColorClass(category)}`}
          >
            {startCaseCategory(category)}
          </span>
        </div>

        <p className="truncate text-lg font-semibold text-slate-100 sm:text-xl xl:text-2xl">
          {conference.conference}
        </p>
      </div>

      <p className="text-sm text-slate-300 sm:text-base xl:text-lg">
        {formatDeadlineDate(conference.deadline)}
      </p>

      <span
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 sm:text-base xl:text-lg ${badgeStyles[urgency]}`}
      >
        {ddayLabel}
      </span>
    </div>
  );
}