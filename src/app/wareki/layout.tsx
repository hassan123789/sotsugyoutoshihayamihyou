import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '西暦・和暦変換ツール｜令和・平成・昭和 早見表',
  description: '西暦と和暦（令和・平成・昭和・大正・明治）を簡単に相互変換。年号対照表付きで履歴書作成にも便利。',
  keywords: [
    '西暦 和暦 変換',
    '令和 西暦',
    '平成 西暦',
    '昭和 西暦',
    '和暦 早見表',
    '年号 対照表',
  ],
  openGraph: {
    title: '西暦・和暦変換ツール｜令和・平成・昭和 早見表',
    description: '西暦と和暦を簡単に相互変換。年号対照表付き。',
    url: '/wareki',
  },
};

export default function WarekiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
