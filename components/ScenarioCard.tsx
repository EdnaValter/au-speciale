import { Scenario } from '@/data/scenarios';
import { Button } from '@/components/ui/button';
import { ScenarioHeader } from './ScenarioHeader';
import { LearningGoalBox } from './LearningGoalBox';
import { QuestionBlock } from './QuestionBlock';
import { OptionList } from './OptionList';
import { FeedbackCard } from './FeedbackCard';

interface ScenarioCardProps {
  scenario: Scenario;
  selectedOptionId: string | null;
  reason: string;
  submitted: boolean;
  feedback: string | null;
  canGoBack: boolean;
  canGoNext: boolean;
  onSelectOption: (optionId: string) => void;
  onReasonChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  onNext: () => void;
}

export function ScenarioCard({
  scenario,
  selectedOptionId,
  reason,
  submitted,
  feedback,
  canGoBack,
  canGoNext,
  onSelectOption,
  onReasonChange,
  onSubmit,
  onBack,
  onNext
}: ScenarioCardProps) {
  return (
    <article className="space-y-6 rounded-xl bg-white p-6 shadow-sm">
      <ScenarioHeader scenario={scenario} />
      <LearningGoalBox
        learningGoal={scenario.learningGoal}
        skillTag={scenario.skillTag}
        difficultyLevel={scenario.difficultyLevel}
      />
      <QuestionBlock question={scenario.question} />
      <OptionList
        scenario={scenario}
        selectedOptionId={selectedOptionId}
        locked={submitted}
        onSelect={onSelectOption}
      />

      <section className="space-y-2" aria-label="Reason input">
        <label htmlFor={`reason-${scenario.id}`} className="block font-semibold text-slate-900">
          Why did you choose this answer?
        </label>
        <textarea
          id={`reason-${scenario.id}`}
          value={reason}
          onChange={(event) => onReasonChange(event.target.value)}
          disabled={submitted}
          rows={4}
          className="w-full rounded-xl border-2 border-slate-300 p-3 disabled:cursor-not-allowed disabled:bg-slate-100"
          placeholder="Write one or two sentences."
          aria-describedby={`reason-help-${scenario.id}`}
        />
        <p id={`reason-help-${scenario.id}`} className="text-sm text-slate-600">
          Keep it short and clear.
        </p>
      </section>

      {feedback && <FeedbackCard feedback={feedback} />}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
        <Button variant="secondary" onClick={onBack} disabled={!canGoBack} aria-label="Go to previous scenario">
          Back
        </Button>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={onSubmit}
            disabled={submitted || !selectedOptionId || reason.trim().length === 0}
            aria-label="Submit selected answer"
          >
            {submitted ? 'Submitted' : 'Submit answer'}
          </Button>
          <Button variant="default" onClick={onNext} disabled={!canGoNext} aria-label="Go to next scenario">
            Next scenario
          </Button>
        </div>
      </div>
    </article>
  );
}
