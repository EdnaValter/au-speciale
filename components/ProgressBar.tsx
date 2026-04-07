interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = total === 0 ? 0 : Math.round((current / total) * 100);

  return (
    <section aria-label="Progress" className="mb-6 rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
        <span>
          Scenario {Math.min(current + 1, total)} of {total}
        </span>
        <span aria-live="polite">{progress}% complete</span>
      </div>
      <div className="h-4 rounded-full bg-slate-200" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label="Scenario completion">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${progress}%` }} />
      </div>
    </section>
  );
}
