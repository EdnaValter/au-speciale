'use client';

import { useEffect, useMemo, useState } from 'react';
import { Header } from '@/components/Header';
import { ProgressBar } from '@/components/ProgressBar';
import { ScenarioCard } from '@/components/ScenarioCard';
import { SummaryPage } from '@/components/SummaryPage';
import { scenarios } from '@/data/scenarios';

const STORAGE_KEY = 'critical-thinking-progress-v1';

interface ScenarioProgress {
  scenarioId: string;
  selectedOptionId: string | null;
  submitted: boolean;
  reason: string;
}

interface AppState {
  currentScenarioIndex: number;
  answersByScenarioId: Record<string, ScenarioProgress>;
}

function createInitialState(): AppState {
  const answersByScenarioId = Object.fromEntries(
    scenarios.map((scenario) => [
      scenario.id,
      {
        scenarioId: scenario.id,
        selectedOptionId: null,
        submitted: false,
        reason: ''
      }
    ])
  );

  return {
    currentScenarioIndex: 0,
    answersByScenarioId
  };
}

function isValidState(state: unknown): state is AppState {
  if (!state || typeof state !== 'object') return false;
  const parsed = state as AppState;
  if (typeof parsed.currentScenarioIndex !== 'number') return false;
  if (!parsed.answersByScenarioId || typeof parsed.answersByScenarioId !== 'object') return false;

  return scenarios.every((scenario) => {
    const answer = parsed.answersByScenarioId[scenario.id];
    return (
      answer &&
      answer.scenarioId === scenario.id &&
      typeof answer.submitted === 'boolean' &&
      typeof answer.reason === 'string'
    );
  });
}

export default function Home() {
  const [state, setState] = useState<AppState>(createInitialState);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        setIsHydrated(true);
        return;
      }
      const parsed = JSON.parse(raw);
      if (isValidState(parsed)) {
        setState(parsed);
      } else {
        setState(createInitialState());
      }
    } catch {
      setState(createInitialState());
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [isHydrated, state]);

  const currentScenario = scenarios[state.currentScenarioIndex];
  const currentProgress = state.answersByScenarioId[currentScenario.id];
  const allSubmitted = useMemo(
    () => scenarios.every((scenario) => state.answersByScenarioId[scenario.id].submitted),
    [state.answersByScenarioId]
  );

  const handleSelectOption = (optionId: string) => {
    if (currentProgress.submitted) return;
    setState((prev) => ({
      ...prev,
      answersByScenarioId: {
        ...prev.answersByScenarioId,
        [currentScenario.id]: {
          ...prev.answersByScenarioId[currentScenario.id],
          selectedOptionId: optionId
        }
      }
    }));
  };

  const handleReasonChange = (value: string) => {
    if (currentProgress.submitted) return;
    setState((prev) => ({
      ...prev,
      answersByScenarioId: {
        ...prev.answersByScenarioId,
        [currentScenario.id]: {
          ...prev.answersByScenarioId[currentScenario.id],
          reason: value
        }
      }
    }));
  };

  const handleSubmit = () => {
    if (!currentProgress.selectedOptionId || currentProgress.reason.trim().length === 0) return;
    setState((prev) => ({
      ...prev,
      answersByScenarioId: {
        ...prev.answersByScenarioId,
        [currentScenario.id]: {
          ...prev.answersByScenarioId[currentScenario.id],
          submitted: true
        }
      }
    }));
  };

  const goBack = () => {
    setState((prev) => ({
      ...prev,
      currentScenarioIndex: Math.max(0, prev.currentScenarioIndex - 1)
    }));
  };

  const goNext = () => {
    setState((prev) => ({
      ...prev,
      currentScenarioIndex: Math.min(scenarios.length - 1, prev.currentScenarioIndex + 1)
    }));
  };

  const resetProgress = () => {
    const initial = createInitialState();
    setState(initial);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
  };

  if (!isHydrated) {
    return <main className="mx-auto min-h-screen max-w-4xl p-4">Loading...</main>;
  }

  return (
    <main className="mx-auto min-h-screen max-w-4xl p-4 sm:p-6">
      <Header />
      {allSubmitted ? (
        <SummaryPage
          scenarios={scenarios}
          answersByScenarioId={state.answersByScenarioId}
          onReset={resetProgress}
          onReview={() => setState((prev) => ({ ...prev, currentScenarioIndex: 0 }))}
        />
      ) : (
        <>
          <ProgressBar current={state.currentScenarioIndex} total={scenarios.length} />
          <ScenarioCard
            scenario={currentScenario}
            selectedOptionId={currentProgress.selectedOptionId}
            reason={currentProgress.reason}
            submitted={currentProgress.submitted}
            feedback={
              currentProgress.submitted && currentProgress.selectedOptionId
                ? currentScenario.feedbackByOptionId[currentProgress.selectedOptionId]
                : null
            }
            canGoBack={state.currentScenarioIndex > 0}
            canGoNext={currentProgress.submitted && state.currentScenarioIndex < scenarios.length - 1}
            onSelectOption={handleSelectOption}
            onReasonChange={handleReasonChange}
            onSubmit={handleSubmit}
            onBack={goBack}
            onNext={goNext}
          />
        </>
      )}
    </main>
  );
}
