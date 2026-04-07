interface FeedbackCardProps {
  feedback: string;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <section className="rounded-xl border-2 border-green-300 bg-green-50 p-4" aria-live="polite" aria-label="Feedback">
      <h4 className="font-semibold text-green-900">Feedback</h4>
      <p className="mt-1 text-green-900">{feedback}</p>
    </section>
  );
}
