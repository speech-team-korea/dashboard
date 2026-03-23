import { useEffect, useMemo, useState } from "react";
import { DdayTracker } from "./components/DdayTracker";
import { DeadlineEditor } from "./components/DeadlineEditor";
import { WorldClock } from "./components/WorldClock";
import { useNow } from "./hooks/useNow";
import { getUpcomingDeadlines } from "./utils/date";
import { formatDateInZone, formatTimeInZone } from "./utils/time";
import type { ConferenceDeadline } from "./types/dashboard";
import {
  createDeadline,
  deleteDeadline,
  fetchDeadlines,
  updateDeadline
} from "./lib/sheets";

function App() {
  const now = useNow(1000);

  const [deadlines, setDeadlines] = useState<ConferenceDeadline[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<ConferenceDeadline | null>(null);

  const upcomingDeadlines = useMemo(
    () => getUpcomingDeadlines(deadlines, now),
    [deadlines, now]
  );

  const loadDeadlines = async () => {
    setLoading(true);
    try {
      const data = await fetchDeadlines();
      setDeadlines(data);
    } catch (error) {
      console.error(error);
      alert("데이터를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDeadlines();
  }, []);

  const handleCreate = async (value: ConferenceDeadline) => {
    await createDeadline(value);
    await loadDeadlines();
  };

  const handleUpdate = async (value: ConferenceDeadline) => {
    await updateDeadline(value);
    setEditingItem(null);
    await loadDeadlines();
  };

  const handleDelete = async (id: string) => {
    const ok = window.confirm("정말 삭제하시겠습니까?");
    if (!ok) return;

    await deleteDeadline(id);
    if (editingItem?.id === id) {
      setEditingItem(null);
    }
    await loadDeadlines();
  };

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

        <main className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
          <section className="min-h-0 lg:col-span-8">
            {loading ? (
              <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-6 text-slate-300">
                Loading...
              </div>
            ) : (
              <DdayTracker
                deadlines={upcomingDeadlines}
                now={now}
                onEdit={setEditingItem}
                onDelete={handleDelete}
              />
            )}
          </section>

          <section className="min-h-0 space-y-4 lg:col-span-4">
            <DeadlineEditor title="마감 추가" onSubmit={handleCreate} />

            {editingItem ? (
              <DeadlineEditor
                title="마감 수정"
                initialValue={editingItem}
                onSubmit={handleUpdate}
                onCancel={() => setEditingItem(null)}
              />
            ) : null}

            <WorldClock now={now} />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;