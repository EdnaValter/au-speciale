import { Scenario } from '@/data/scenarios';
import { Button } from '@/components/ui/button';

interface SummaryItem {
  scenarioId: string;
  selectedOptionId: string | null;
  submitted: boolean;
  reason: string;
}

interface SummaryPageProps {
  scenarios: Scenario[];
  answersByScenarioId: Record<string, SummaryItem>;
  onReset: () => void;
  onReview: () => void;
}

export function SummaryPage({ scenarios, answersByScenarioId, onReset, onReview }: SummaryPageProps) {
  const completed = scenarios.filter((scenario) => answersByScenarioId[scenario.id]?.submitted);
  const skillTags = Array.from(new Set(completed.map((scenario) => scenario.skillTag)));

  return (
    <section className="space-y-6 rounded-xl bg-white p-6 shadow-sm" aria-label="Summary page">
      <h2 className="text-2xl font-bold text-slate-900">Great work! Summary</h2>
      <p className="text-slate-700">You completed {completed.length} scenarios.</p>

      <div className="rounded-lg border-2 border-slate-200 p-4">
        <h3 className="font-semibold">Completed skills</h3>
        {skillTags.length > 0 ? (
          <ul className="mt-2 list-disc pl-5">
            {skillTags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-2">No skills completed yet.</p>
        )}
      </div>

      <div className="space-y-4">
        {completed.map((scenario) => {
          const answer = answersByScenarioId[scenario.id];
          const chosenOption = scenario.options.find((option) => option.id === answer.selectedOptionId);
          return (
            <article key={scenario.id} className="rounded-lg border-2 border-slate-200 p-4">
              <h4 className="font-semibold">{scenario.title}</h4>
              <p className="mt-1 text-sm">
                <strong>Selected answer:</strong> {chosenOption?.text ?? 'No answer recorded'}
              </p>
              <p className="text-sm">
                <strong>Skill tag:</strong> {scenario.skillTag}
              </p>
              <p className="text-sm">
                <strong>Your reason:</strong> {answer.reason || 'No reason provided'}
              </p>
            </article>
          );
        })}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="secondary" onClick={onReview}>
          Review scenarios
        </Button>
        <Button variant="danger" onClick={onReset}>
          Reset progress
        </Button>
      </div>
    </section>
  );
}
