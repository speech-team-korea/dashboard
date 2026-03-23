import type { ConferenceDeadline, DeadlineUrgency } from "../types/dashboard";

const MS_PER_DAY = 1000 * 60 * 60 * 24;

function startOfDay(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
}

export function normalizeDeadlineCategory(value: string | undefined | null): string {
  const normalized = String(value ?? "").trim();
  return normalized || "uncategorized";
}

export function startCaseCategory(category: string): string {
  return category
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Uncategorized";
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

const categoryColorPresets = [
  "bg-sky-400/15 text-sky-200 ring-sky-400/30",
  "bg-violet-400/15 text-violet-200 ring-violet-400/30",
  "bg-emerald-400/15 text-emerald-200 ring-emerald-400/30",
  "bg-amber-400/15 text-amber-200 ring-amber-400/30",
  "bg-rose-400/15 text-rose-200 ring-rose-400/30",
  "bg-fuchsia-400/15 text-fuchsia-200 ring-fuchsia-400/30",
  "bg-cyan-400/15 text-cyan-200 ring-cyan-400/30",
  "bg-lime-400/15 text-lime-200 ring-lime-400/30",
  "bg-orange-400/15 text-orange-200 ring-orange-400/30"
];

export function getCategoryColorClass(category: string): string {
  const normalized = normalizeDeadlineCategory(category).toLowerCase();
  const index = hashString(normalized) % categoryColorPresets.length;
  return categoryColorPresets[index];
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