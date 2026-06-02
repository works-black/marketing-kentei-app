import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'マーケティング検定2級 対策アプリ',
  description: 'AIが生成する四択問題でマーケティング検定2級を対策',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
