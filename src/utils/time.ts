export function formatTimeInZone(
  date: Date,
  timezone: string,
  withSeconds = true
): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hour12: false
  }).format(date);
}

export function formatDateInZone(date: Date, timezone: string): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    month: "short",
    day: "2-digit",
    year: "numeric"
  }).format(date);
}
