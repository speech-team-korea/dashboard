import type { ReactNode } from "react";

interface PanelProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  rightSlot?: ReactNode;
}

export function Panel({
  title,
  subtitle,
  children,
  className,
  rightSlot
}: PanelProps) {
  return (
    <article
      className={[
        "flex h-full min-h-0 flex-col rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-panel backdrop-blur-sm sm:p-6",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <header className="mb-4 flex items-start justify-between gap-4 sm:mb-6">
        <div>
          <h2 className="font-display text-xl text-slate-100 sm:text-2xl xl:text-3xl">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-1 text-sm text-slate-400 sm:text-base">{subtitle}</p>
          ) : null}
        </div>
        {rightSlot}
      </header>
      <div className="min-h-0 flex-1">{children}</div>
    </article>
  );
}
