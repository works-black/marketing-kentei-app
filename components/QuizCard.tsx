'use client';

import type { Question, Answer } from '@/lib/types';

const LABELS = ['A', 'B', 'C', 'D'];

type Props = {
  question: Question;
  answer: Answer | undefined;
  onAnswer: (index: number) => void;
};

export default function QuizCard({ question, answer, onAnswer }: Props) {
  const answered = answer !== undefined;

  const getChoiceStyle = (index: number) => {
    if (!answered) {
      return 'bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 cursor-pointer';
    }
    if (index === question.correctIndex) {
      return 'bg-green-50 border-green-500 text-green-800';
    }
    if (index === answer.selectedIndex && !answer.isCorrect) {
      return 'bg-red-50 border-red-400 text-red-800';
    }
    return 'bg-white border-gray-200 opacity-60';
  };

  const getLabelStyle = (index: number) => {
    if (!answered) return 'bg-gray-100 text-gray-600';
    if (index === question.correctIndex) return 'bg-green-500 text-white';
    if (index === answer.selectedIndex && !answer.isCorrect) return 'bg-red-400 text-white';
    return 'bg-gray-100 text-gray-400';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <p className="text-gray-800 font-medium text-base leading-relaxed mb-6">
        {question.text}
      </p>

      <div className="space-y-3">
        {question.choices.map((choice, index) => (
          <button
            key={index}
            onClick={() => !answered && onAnswer(index)}
            disabled={answered}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all ${getChoiceStyle(index)}`}
          >
            <span
              className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${getLabelStyle(index)}`}
            >
              {LABELS[index]}
            </span>
            <span className="text-sm leading-relaxed">{choice}</span>
          </button>
        ))}
      </div>

      {answered && (
        <div
          className={`mt-5 p-4 rounded-xl text-sm leading-relaxed ${
            answer.isCorrect
              ? 'bg-green-50 border border-green-200 text-green-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <p className="font-bold mb-1">
            {answer.isCorrect ? '✓ 正解！' : '✗ 不正解'}
          </p>
          <p className="text-gray-700">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
