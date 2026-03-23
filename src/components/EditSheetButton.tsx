interface EditSheetButtonProps {
  href?: string;
  label: string;
}

export function EditSheetButton({ href, label }: EditSheetButtonProps) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-md border border-slate-600 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-300/50 hover:text-cyan-100 sm:text-sm"
    >
      {label}
    </a>
  );
}
