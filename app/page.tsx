import Link from "next/link";
import { FIELDS } from "@/lib/fields";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            マーケティング検定2級
          </h1>
          <p className="text-lg text-gray-500">AI問題生成による対策アプリ</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FIELDS.map((field) => (
            <Link
              key={field.id}
              href={`/quiz/${field.id}`}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <h2 className="font-bold text-gray-800 text-base mb-1 group-hover:text-blue-600 transition-colors">
                {field.name}
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed">
                {field.description}
              </p>
            </Link>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          分野を選択すると、AIが5問の四択問題を生成します
        </p>
      </div>
    </main>
  );
}
