export default function LoadingScreen({ fieldName }: { fieldName: string }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="text-center">
        <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-lg font-semibold text-gray-700 mb-2">問題を生成中...</p>
        <p className="text-sm text-gray-400">
          AIが「{fieldName}」の問題を作成しています
        </p>
      </div>
    </div>
  );
}
