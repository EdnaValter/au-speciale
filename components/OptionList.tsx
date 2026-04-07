import { Scenario } from '@/data/scenarios';
import { OptionButton } from './OptionButton';

interface OptionListProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  locked: boolean;
  onSelect: (optionId: string) => void;
}

export function OptionList({ scenario, selectedOptionId, locked, onSelect }: OptionListProps) {
  return (
    <fieldset className="space-y-3" aria-label="Answer options">
      <legend className="sr-only">Choose one answer</legend>
      {scenario.options.map((option, index) => (
        <OptionButton
          key={option.id}
          option={option}
          selected={selectedOptionId === option.id}
          locked={locked}
          onSelect={onSelect}
          index={index}
        />
      ))}
    </fieldset>
  );
}
