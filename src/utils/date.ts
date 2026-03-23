import type { ConferenceDeadline, DeadlineUrgency } from "../types/dashboard";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function getDaysUntil(targetDate: string, baseDate = new Date()): number {
  const target = startOfDay(new Date(targetDate));
  const base = startOfDay(baseDate);

  return Math.round((target - base) / MS_PER_DAY);
}

export function getDeadlineUrgency(daysLeft: number): DeadlineUrgency {
  if (daysLeft < 0) return "past";
  if (daysLeft <= 7) return "danger";
  if (daysLeft <= 30) return "warning";
  return "safe";
}

export function formatDeadlineDate(targetDate: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(new Date(targetDate));
}

export function getUpcomingDeadlines(
  deadlines: ConferenceDeadline[],
  now = new Date()
): ConferenceDeadline[] {
  return [...deadlines]
    .filter((item) => getDaysUntil(item.deadline, now) >= 0)
    .sort(
      (a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
    );
}
