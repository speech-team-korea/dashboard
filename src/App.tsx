import { useEffect, useMemo, useState } from "react";
import { DdayTracker } from "./components/DdayTracker";
import { WorldClock } from "./components/WorldClock";
import { useNow } from "./hooks/useNow";
import { getUpcomingDeadlines } from "./utils/date";
import { formatDateInZone, formatTimeInZone } from "./utils/time";
import type { ClockZone, ConferenceDeadline } from "./types/dashboard";
import {
  deadlinesSheetEditUrl,
  fetchDeadlines,
  fetchWorldClocks,
  worldClocksSheetEditUrl
} from "./lib/sheets";

function App() {
  const now = useNow(1000);
  const [deadlines, setDeadlines] = useState<ConferenceDeadline[]>([]);
  const [worldClocks, setWorldClocks] = useState<ClockZone[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadAll = async () => {
      setLoading(true);
      setError(null);

      try {
        const [deadlineData, worldClockData] = await Promise.all([
          fetchDeadlines(),
          fetchWorldClocks()
        ]);

        setDeadlines(deadlineData);
        setWorldClocks(worldClockData);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "시트 데이터를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadAll();
  }, []);

  const upcomingDeadlines = useMemo(
    () => getUpcomingDeadlines(deadlines, now),
    [deadlines, now]
  );

  return (
    <div className="h-full w-full overflow-hidden px-4 py-4 sm:px-6 sm:py-6 xl:px-10 xl:py-8">
      <div className="mx-auto flex h-full max-w-[1920px] flex-col gap-4 sm:gap-6">
        <header className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-4 py-4 shadow-panel backdrop-blur-sm sm:px-6 sm:py-5 xl:px-8 xl:py-6">
          <div className="flex h-full flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] tracking-[0.2em] text-cyan-300/80 sm:text-xs">
                Pattern Recognition & Machine Learning Lab
              </p>
              <h1 className="font-display text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl xl:text-5xl">
                Speech Processing Team
              </h1>
            </div>
            <div className="text-left lg:text-right">
              <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 sm:text-xs">
                Seoul Local
              </p>
              <p className="font-display text-3xl font-semibold text-cyan-200 sm:text-4xl xl:text-5xl">
                {formatTimeInZone(now, "Asia/Seoul")}
              </p>
              <p className="text-base text-slate-300 sm:text-lg">
                {formatDateInZone(now, "Asia/Seoul")}
              </p>
            </div>
          </div>
        </header>

        {error ? (
          <div className="rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            시트 데이터를 불러오지 못했습니다. 설정을 확인하세요. 상세 오류: {error}
          </div>
        ) : null}

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <section className="min-h-0 lg:col-span-8">
            {loading ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 text-slate-300">
                Loading deadlines...
              </div>
            ) : (
              <DdayTracker
                deadlines={upcomingDeadlines}
                now={now}
                editUrl={deadlinesSheetEditUrl}
              />
            )}
          </section>
          <section className="min-h-0 lg:col-span-4">
            {loading ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 text-slate-300">
                Loading clocks...
              </div>
            ) : (
              <WorldClock
                now={now}
                zones={worldClocks}
                editUrl={worldClocksSheetEditUrl}
              />
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
