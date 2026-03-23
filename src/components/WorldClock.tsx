import type { ClockZone } from "../types/dashboard";
import { ClockCard } from "./ClockCard";
import { EditSheetButton } from "./EditSheetButton";
import { Panel } from "./Panel";

interface WorldClockProps {
  now: Date;
  zones: ClockZone[];
  editUrl?: string;
}

export function WorldClock({ now, zones, editUrl }: WorldClockProps) {
  return (
    <Panel
      title="World Clock"
      rightSlot={<EditSheetButton href={editUrl} label="Edit" />}
    >
      <div className="grid h-full auto-rows-fr gap-3 overflow-auto sm:gap-4">
        {zones.map((zone) => (
          <ClockCard key={zone.id} zone={zone} now={now} />
        ))}
      </div>
    </Panel>
  );
}
