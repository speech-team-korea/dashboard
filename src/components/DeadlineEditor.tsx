import { useEffect, useState } from "react";
import type { ConferenceDeadline } from "../types/dashboard";

interface DeadlineEditorProps {
  title: string;
  initialValue?: ConferenceDeadline | null;
  onSubmit: (value: ConferenceDeadline) => Promise<void>;
  onCancel?: () => void;
}

function emptyForm(): ConferenceDeadline {
  return {
    id: "",
    conference: "",
    deadline: ""
  };
}

export function DeadlineEditor({
  title,
  initialValue,
  onSubmit,
  onCancel
}: DeadlineEditorProps) {
  const [form, setForm] = useState<ConferenceDeadline>(emptyForm());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(initialValue ?? emptyForm());
  }, [initialValue]);

  const updateField =
    (key: keyof ConferenceDeadline) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      id: form.id.trim(),
      conference: form.conference.trim(),
      deadline: form.deadline.trim()
    };

    if (!payload.id || !payload.conference || !payload.deadline) {
      alert("id, conference, deadline를 모두 입력하세요.");
      return;
    }

    setLoading(true);
    try {
      await onSubmit(payload);
      if (!initialValue) {
        setForm(emptyForm());
      }
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-panel backdrop-blur-sm sm:p-6">
      <h2 className="mb-4 font-display text-xl text-slate-100 sm:text-2xl">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm text-slate-300">ID</label>
          <input
            value={form.id}
            onChange={updateField("id")}
            disabled={!!initialValue}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none"
            placeholder="acl-2026"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Conference</label>
          <input
            value={form.conference}
            onChange={updateField("conference")}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none"
            placeholder="ACL 2026"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-300">Deadline</label>
          <input
            type="date"
            value={form.deadline}
            onChange={updateField("deadline")}
            className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100 outline-none"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-cyan-400 px-4 py-2 font-medium text-slate-950"
          >
            {loading ? "저장 중..." : "저장"}
          </button>

          {onCancel ? (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200"
            >
              취소
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}