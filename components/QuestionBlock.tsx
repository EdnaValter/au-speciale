export function QuestionBlock({ question }: { question: string }) {
  return (
    <section aria-label="Question" className="space-y-2">
      <h3 className="text-lg font-semibold text-slate-900">Question</h3>
      <p className="text-slate-800">{question}</p>
    </section>
  );
}
