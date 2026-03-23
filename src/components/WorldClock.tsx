import { worldClocks } from "../data";
import { ClockCard } from "./ClockCard";
import { Panel } from "./Panel";

interface WorldClockProps {
  now: Date;
}

export function WorldClock({ now }: WorldClockProps) {
  return (
    <Panel title="World Clock">
      <div className="grid h-full grid-rows-3 gap-3 sm:gap-4">
        {worldClocks.map((zone) => (
          <ClockCard key={zone.id} zone={zone} now={now} />
        ))}
      </div>
    </Panel>
  );
}
