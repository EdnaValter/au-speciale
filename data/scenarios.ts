export interface ScenarioOption {
  id: string;
  text: string;
}

export interface Scenario {
  id: string;
  title: string;
  purpose: string;
  context: string;
  question: string;
  options: ScenarioOption[];
  feedbackByOptionId: Record<string, string>;
  learningGoal: string;
  skillTag: string;
  difficultyLevel: 'Easy' | 'Medium' | 'Challenging';
}

export const scenarios: Scenario[] = [
  {
    id: 'library-rumor',
    title: 'The Library Rumor',
    purpose: 'Practice checking sources before believing a claim.',
    context:
      'At lunch, a classmate says the school library will close next month because "someone online posted it."',
    question: 'What is the best first step?',
    options: [
      { id: 'a', text: 'Share the rumor with friends so everyone can prepare.' },
      { id: 'b', text: 'Ask the librarian or school office for official information.' },
      { id: 'c', text: 'Post an angry comment about the decision.' },
      { id: 'd', text: 'Ignore it because rumors are always false.' }
    ],
    feedbackByOptionId: {
      a: 'This spreads unverified information and can cause unnecessary worry.',
      b: 'Great choice. Reliable sources help you make accurate decisions.',
      c: 'Responding emotionally before confirming facts can lead to mistakes.',
      d: 'Some rumors are false, but ignoring everything can mean missing real updates.'
    },
    learningGoal: 'Identify trustworthy sources before taking action.',
    skillTag: 'Evidence Evaluation',
    difficultyLevel: 'Easy'
  },
  {
    id: 'group-project',
    title: 'Group Project Decision',
    purpose: 'Practice fair decision-making in a team.',
    context:
      'Your team has two project ideas. One is fun but unrelated to class goals. The other is less exciting but matches the rubric.',
    question: 'How should your team decide?',
    options: [
      { id: 'a', text: 'Choose the fun idea because everyone will enjoy it more.' },
      { id: 'b', text: 'Vote quickly without discussing details.' },
      { id: 'c', text: 'Compare both ideas against the rubric before deciding.' },
      { id: 'd', text: 'Let the loudest teammate decide.' }
    ],
    feedbackByOptionId: {
      a: 'Enjoyment matters, but project requirements still need to be met.',
      b: 'A fast vote without evidence can lead to poor choices.',
      c: 'Excellent. Using criteria keeps the decision fair and focused.',
      d: 'Fair decisions should include everyone, not just the loudest voice.'
    },
    learningGoal: 'Use clear criteria to compare options.',
    skillTag: 'Decision Strategy',
    difficultyLevel: 'Medium'
  },
  {
    id: 'science-claim',
    title: 'Surprising Science Claim',
    purpose: 'Practice questioning extraordinary claims respectfully.',
    context:
      'A video says one snack can improve test scores in just one day for everyone.',
    question: 'Which response shows strong critical thinking?',
    options: [
      { id: 'a', text: 'Believe it because the video has many likes.' },
      { id: 'b', text: 'Ask what evidence and study details support the claim.' },
      { id: 'c', text: 'Reject it immediately without checking anything.' },
      { id: 'd', text: 'Try it once and then tell everyone it is proven.' }
    ],
    feedbackByOptionId: {
      a: 'Popularity does not prove scientific accuracy.',
      b: 'Strong choice. Good questions help test whether a claim is reliable.',
      c: 'Skepticism is useful, but evidence should guide your conclusion.',
      d: 'One personal test is not enough evidence for a broad claim.'
    },
    learningGoal: 'Ask for evidence quality when evaluating big claims.',
    skillTag: 'Questioning Claims',
    difficultyLevel: 'Challenging'
  }
];
