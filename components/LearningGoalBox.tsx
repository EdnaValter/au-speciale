interface LearningGoalBoxProps {
  learningGoal: string;
  skillTag: string;
  difficultyLevel: string;
}

export function LearningGoalBox({ learningGoal, skillTag, difficultyLevel }: LearningGoalBoxProps) {
  return (
    <aside className="rounded-lg border-2 border-slate-200 bg-slate-50 p-4" aria-label="Learning details">
      <p>
        <strong>Learning goal:</strong> {learningGoal}
      </p>
      <p>
        <strong>Skill tag:</strong> {skillTag}
      </p>
      <p>
        <strong>Difficulty:</strong> {difficultyLevel}
      </p>
    </aside>
  );
}
