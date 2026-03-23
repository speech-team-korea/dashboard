import type { ClockZone, ConferenceDeadline } from "../types/dashboard";
import { conferenceDeadlines as fallbackDeadlines, worldClocks as fallbackWorldClocks } from "../../data";
import { normalizeDeadlineCategory } from "../utils/date";

const SHEET_ID = import.meta.env.VITE_GOOGLE_SHEET_ID?.trim() ?? "";
const DEADLINES_SHEET_NAME = import.meta.env.VITE_DEADLINES_SHEET_NAME?.trim() || "deadlines";
const WORLD_CLOCKS_SHEET_NAME =
  import.meta.env.VITE_WORLD_CLOCKS_SHEET_NAME?.trim() || "world_clocks";
const DEADLINES_GID = import.meta.env.VITE_DEADLINES_GID?.trim() ?? "";
const WORLD_CLOCKS_GID = import.meta.env.VITE_WORLD_CLOCKS_GID?.trim() ?? "";

function toOpenSheetUrl(sheetName: string): string {
  return `https://opensheet.elk.sh/${SHEET_ID}/${encodeURIComponent(sheetName)}`;
}

function toGoogleSheetUrl(gid: string): string {
  if (!SHEET_ID) return "";
  return gid
    ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit#gid=${gid}`
    : `https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`;
}

export const deadlinesSheetEditUrl = toGoogleSheetUrl(DEADLINES_GID);
export const worldClocksSheetEditUrl = toGoogleSheetUrl(WORLD_CLOCKS_GID);

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(`${url}?t=${Date.now()}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text || "empty response"}`);
  }
  return res.json() as Promise<T>;
}

export async function fetchDeadlines(): Promise<ConferenceDeadline[]> {
  const source = SHEET_ID
    ? await fetchJson<ConferenceDeadline[]>(toOpenSheetUrl(DEADLINES_SHEET_NAME))
    : fallbackDeadlines;

  return source.map((item) => ({
    id: String(item.id ?? "").trim(),
    conference: String(item.conference ?? "").trim(),
    deadline: String(item.deadline ?? "").trim(),
    category: normalizeDeadlineCategory(item.category)
  }));
}

export async function fetchWorldClocks(): Promise<ClockZone[]> {
  const source = SHEET_ID
    ? await fetchJson<ClockZone[]>(toOpenSheetUrl(WORLD_CLOCKS_SHEET_NAME))
    : fallbackWorldClocks;

  return source.map((item) => ({
    id: String(item.id ?? "").trim(),
    city: String(item.city ?? "").trim(),
    region: String(item.region ?? "").trim(),
    timezone: String(item.timezone ?? "").trim()
  }));
}