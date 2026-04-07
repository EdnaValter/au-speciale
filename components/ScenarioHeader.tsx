import { Scenario } from '@/data/scenarios';

export function ScenarioHeader({ scenario }: { scenario: Scenario }) {
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-bold text-slate-900">{scenario.title}</h2>
      <p className="rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
        <strong>Purpose:</strong> {scenario.purpose}
      </p>
      <p className="text-slate-800">{scenario.context}</p>
    </div>
  );
}
