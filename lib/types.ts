export type Field = {
  id: string;
  name: string;
  description: string;
};

export type Question = {
  id: string;
  fieldId: string;
  text: string;
  choices: string[];
  correctIndex: number;
  explanation: string;
};

export type Answer = {
  questionId: string;
  selectedIndex: number;
  isCorrect: boolean;
};

export type SessionState = {
  fieldId: string;
  questions: Question[];
  answers: Answer[];
  currentIndex: number;
  phase: 'selecting' | 'quiz' | 'result';
};
