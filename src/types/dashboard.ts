export interface ConferenceDeadline {
  id: string;
  conference: string;
  deadline: string;
  category?: string;
}

export interface ClockZone {
  id: string;
  city: string;
  region: string;
  timezone: string;
}

export type DeadlineUrgency = "danger" | "warning" | "safe" | "past";
