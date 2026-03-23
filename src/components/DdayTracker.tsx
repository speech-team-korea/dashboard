import { useMemo, useState } from "react";
import type { ConferenceDeadline } from "../types/dashboard";
import { normalizeDeadlineCategory, startCaseCategory } from "../utils/date";
import { DdayItem } from "./DdayItem";
import { EditSheetButton } from "./EditSheetButton";
import { Panel } from "./Panel";

type CategoryTab = string;

interface DdayTrackerProps {
  deadlines: ConferenceDeadline[];
  now: Date;
  editUrl?: string;
}

export function DdayTracker({ deadlines, now, editUrl }: DdayTrackerProps) {
  const [activeCategory, setActiveCategory] = useState<CategoryTab>("all");

  const categoryTabs = useMemo(() => {
    const categories = Array.from(
      new Set(deadlines.map((item) => normalizeDeadlineCategory(item.category)))
    ).sort((a, b) => a.localeCompare(b));

    return ["all", ...categories];
  }, [deadlines]);

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: deadlines.length };

    deadlines.forEach((deadline) => {
      const category = normalizeDeadlineCategory(deadline.category);
      base[category] = (base[category] ?? 0) + 1;
    });

    return base;
  }, [deadlines]);

  const filteredDeadlines = useMemo(() => {
    if (activeCategory === "all") return deadlines;
    return deadlines.filter(
      (deadline) => normalizeDeadlineCategory(deadline.category) === activeCategory
    );
  }, [activeCategory, deadlines]);

  return (
    <Panel
      title="Conference Event D-Day"
      rightSlot={
        <div className="flex items-center gap-2">
          <EditSheetButton href={editUrl} label="시트에서 수정" />
          <span className="rounded-md bg-cyan-400/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-cyan-200 ring-1 ring-cyan-400/30 sm:text-sm">
            {filteredDeadlines.length} Showing
          </span>
        </div>
      }
    >
      <div className="flex h-full min-h-0 flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {categoryTabs.map((category) => {
            const active = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={[
                  "rounded-full px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] ring-1 transition sm:text-sm",
                  active
                    ? "bg-cyan-400/15 text-cyan-100 ring-cyan-300/50"
                    : "bg-slate-800/60 text-slate-300 ring-slate-600 hover:text-slate-100 hover:ring-slate-400"
                ].join(" ")}
              >
                {startCaseCategory(category)}
                <span className="ml-2 text-[11px] opacity-80">{counts[category] ?? 0}</span>
              </button>
            );
          })}
        </div>

        <div className="flex h-full min-h-0 flex-col">
          <div className="mb-2 grid grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)_auto] gap-3 px-2 text-xs uppercase tracking-[0.16em] text-slate-400 sm:px-1 sm:text-sm">
            <span>Event</span>
            <span>Deadline</span>
            <span>D-Day</span>
          </div>

          <div className="flex-1 space-y-2 overflow-auto">
            {filteredDeadlines.length > 0 ? (
              filteredDeadlines.map((deadline) => (
                <DdayItem key={deadline.id} conference={deadline} now={now} />
              ))
            ) : (
              <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700/70 bg-slate-800/40 p-6 text-center text-slate-300">
                No items in {startCaseCategory(activeCategory)}.
              </div>
            )}
          </div>
        </div>
      </div>
    </Panel>
  );
}