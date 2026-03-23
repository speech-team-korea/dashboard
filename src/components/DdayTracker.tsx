import type { ConferenceDeadline } from "../types/dashboard";
import { DdayItem } from "./DdayItem";
import { Panel } from "./Panel";

interface DdayTrackerProps {
  deadlines: ConferenceDeadline[];
  now: Date;
  onEdit: (item: ConferenceDeadline) => void;
  onDelete: (id: string) => void;
}

export function DdayTracker({
  deadlines,
  now,
  onEdit,
  onDelete
}: DdayTrackerProps) {
  return (
    <Panel
      title="Conference Event D-Day"
      rightSlot={
        <span className="rounded-md bg-cyan-400/10 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-cyan-200 ring-1 ring-cyan-400/30 sm:text-sm">
          {deadlines.length} Upcoming
        </span>
      }
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="mb-2 grid grid-cols-[2fr_1.2fr_auto_auto] gap-3 px-2 text-xs uppercase tracking-[0.16em] text-slate-400 sm:px-1 sm:text-sm">
          <span>Event</span>
          <span>Deadline</span>
          <span>D-Day</span>
          <span>Manage</span>
        </div>

        <div className="flex-1 space-y-2 overflow-auto">
          {deadlines.length > 0 ? (
            deadlines.map((deadline) => (
              <DdayItem
                key={deadline.id}
                conference={deadline}
                now={now}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-slate-700/70 bg-slate-800/40 p-6 text-center text-slate-300">
              No upcoming conference deadlines.
            </div>
          )}
        </div>
      </div>
    </Panel>
  );
}