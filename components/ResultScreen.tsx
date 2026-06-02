"use client";

import type { Field, Question, Answer } from "@/lib/types";

const LABELS = ["A", "B", "C", "D"];

type Props = {
  field: Field;
  questions: Question[];
  answers: Answer[];
  onRetry: () => void;
  onHome: () => void;
};

export default function ResultScreen({
  field,
  questions,
  answers,
  onRetry,
  onHome,
}: Props) {
  const correct = answers.filter((a) => a.isCorrect).length;
  const total = questions.length;
  const rate = Math.round((correct / total) * 100);

  const rateColor =
    rate >= 80
      ? "text-green-600"
      : rate >= 60
      ? "text-yellow-600"
      : "text-red-600";
  const rateLabel =
    rate >= 80 ? "合格圏内！" : rate >= 60 ? "もう少し！" : "要復習";

  return (
    <div className="min-h-screen p-6 pb-16">
      <div className="max-w-xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center mb-6">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-1">
            {field.name}
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">結果</h2>
          <p className={`text-6xl font-extrabold mb-2 ${rateColor}`}>{rate}%</p>
          <p className="text-gray-500 mb-1">
            {total}問中{" "}
            <span className="font-bold text-gray-800">{correct}問</span> 正解
          </p>
          <p className={`font-bold text-lg ${rateColor}`}>{rateLabel}</p>
        </div>

        <div className="space-y-4 mb-8">
          <h3 className="font-bold text-gray-700">問題の復習</h3>
          {questions.map((q, i) => {
            const ans = answers[i];
            if (!ans) return null;
            return (
              <div
                key={q.id}
                className={`bg-white rounded-2xl border p-5 ${
                  ans.isCorrect ? "border-green-200" : "border-red-200"
                }`}
              >
                <div className="flex items-start gap-2 mb-3">
                  <span
                    className={`shrink-0 text-xs font-bold px-2 py-0.5 rounded-full ${
                      ans.isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {ans.isCorrect ? "正解" : "不正解"}
                  </span>
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">
                    {q.text}
                  </p>
                </div>

                <div className="space-y-1.5 mb-3">
                  {q.choices.map((choice, ci) => (
                    <div
                      key={ci}
                      className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
                        ci === q.correctIndex
                          ? "bg-green-50 text-green-800 font-semibold"
                          : ci === ans.selectedIndex && !ans.isCorrect
                          ? "bg-red-50 text-red-700 line-through"
                          : "text-gray-500"
                      }`}
                    >
                      <span className="font-bold">{LABELS[ci]}.</span> {choice}
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 leading-relaxed">
                  <span className="font-semibold">解説：</span>
                  {q.explanation}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onHome}
            className="flex-1 py-4 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-xl transition-colors"
          >
            分野選択に戻る
          </button>
          <button
            onClick={onRetry}
            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
          >
            もう一度挑戦
          </button>
        </div>
      </div>
    </div>
  );
}
