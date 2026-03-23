import type { ConferenceDeadline, DeadlineUrgency } from "../types/dashboard";
import {
  formatDeadlineDate,
  getDaysUntil,
  getDeadlineUrgency
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
  onEdit: (item: ConferenceDeadline) => void;
  onDelete: (id: string) => void;
}

export function DdayItem({ conference, now, onEdit, onDelete }: DdayItemProps) {
  const daysLeft = getDaysUntil(conference.deadline, now);
  const urgency = getDeadlineUrgency(daysLeft);
  const ddayLabel = daysLeft >= 0 ? `D-${daysLeft}` : `D+${Math.abs(daysLeft)}`;

  return (
    <div className="grid grid-cols-[2fr_1.2fr_auto_auto] items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-3 sm:px-4 sm:py-4">
      <p className="truncate text-lg font-semibold text-slate-100 sm:text-xl xl:text-2xl">
        {conference.conference}
      </p>
      <p className="text-sm text-slate-300 sm:text-base xl:text-lg">
        {formatDeadlineDate(conference.deadline)}
      </p>
      <span
        className={`rounded-lg px-3 py-1.5 text-sm font-semibold ring-1 sm:text-base xl:text-lg ${badgeStyles[urgency]}`}
      >
        {ddayLabel}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => onEdit(conference)}
          className="rounded-lg border border-slate-600 px-3 py-1.5 text-sm text-slate-200"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(conference.id)}
          className="rounded-lg border border-red-500/50 px-3 py-1.5 text-sm text-red-300"
        >
          삭제
        </button>
      </div>
    </div>
  );
}