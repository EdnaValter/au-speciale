import { ScenarioOption } from '@/data/scenarios';
import { cn } from '@/lib/utils';

interface OptionButtonProps {
  option: ScenarioOption;
  selected: boolean;
  locked: boolean;
  onSelect: (optionId: string) => void;
  index: number;
}

export function OptionButton({ option, selected, locked, onSelect, index }: OptionButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      disabled={locked}
      aria-pressed={selected}
      aria-label={`Option ${index + 1}: ${option.text}`}
      className={cn(
        'w-full rounded-xl border-2 p-4 text-left text-base font-medium transition min-h-14',
        'focus-visible:ring-4 focus-visible:ring-blue-300',
        locked && 'cursor-not-allowed opacity-80',
        selected && !locked && 'border-blue-700 bg-blue-100 text-blue-900',
        selected && locked && 'border-green-700 bg-green-100 text-green-900',
        !selected && 'border-slate-300 bg-white hover:border-slate-500 hover:bg-slate-50'
      )}
    >
      <span className="mr-2 inline-block rounded-full border border-current px-2 py-0.5 text-xs font-bold" aria-hidden>
        {String.fromCharCode(65 + index)}
      </span>
      {option.text}
      {selected && <span className="ml-2 text-sm font-bold">(selected)</span>}
      {locked && <span className="ml-2 text-sm">(locked)</span>}
    </button>
  );
}
