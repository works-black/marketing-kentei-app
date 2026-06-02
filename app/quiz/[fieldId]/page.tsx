'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { getField } from '@/lib/fields';
import type { Question, Answer } from '@/lib/types';
import QuizCard from '@/components/QuizCard';
import ResultScreen from '@/components/ResultScreen';
import LoadingScreen from '@/components/LoadingScreen';

type Phase = 'loading' | 'quiz' | 'result';

export default function QuizPage({ params }: { params: Promise<{ fieldId: string }> }) {
  const { fieldId } = use(params);
  const router = useRouter();
  const field = getField(fieldId);

  const [phase, setPhase] = useState<Phase>('loading');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!field) {
      router.replace('/');
      return;
    }
    generateQuestions();
  }, [fieldId]);

  const generateQuestions = async () => {
    setPhase('loading');
    setError('');
    setAnswers([]);
    setCurrentIndex(0);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fieldId }),
      });
      if (!res.ok) throw new Error('Generation failed');
      const data = await res.json();
      setQuestions(data.questions);
      setPhase('quiz');
    } catch {
      setError('問題の生成に失敗しました。再試行してください。');
    }
  };

  const handleAnswer = (selectedIndex: number) => {
    const question = questions[currentIndex];
    const isCorrect = selectedIndex === question.correctIndex;
    const answer: Answer = { questionId: question.id, selectedIndex, isCorrect };
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentIndex + 1 >= questions.length) {
      setTimeout(() => setPhase('result'), 1200);
    } else {
      setTimeout(() => setCurrentIndex((i) => i + 1), 1200);
    }
  };

  if (!field) return null;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={generateQuestions}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700"
          >
            再試行
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'loading') {
    return <LoadingScreen fieldName={field.name} />;
  }

  if (phase === 'result') {
    return (
      <ResultScreen
        field={field}
        questions={questions}
        answers={answers}
        onRetry={generateQuestions}
        onHome={() => router.push('/')}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← 分野選択に戻る
          </button>
          <span className="text-sm font-semibold text-gray-500">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div className="mb-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentIndex + (answers.length > currentIndex ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <p className="text-xs font-semibold text-blue-600 mb-4 uppercase tracking-wide">
          {field.name}
        </p>

        <QuizCard
          question={questions[currentIndex]}
          answer={answers[currentIndex]}
          onAnswer={handleAnswer}
        />
      </div>
    </div>
  );
}
