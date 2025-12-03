import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '採用担当者向け 年齢計算ツール | 学歴早見表',
	description:
		'卒業年から候補者の生年月日・年齢を逆算。採用活動に便利な早見表付き。新卒・中途採用の年齢確認に。',
	keywords: [
		'採用',
		'年齢計算',
		'卒業年',
		'生年月日',
		'逆算',
		'人事',
		'採用担当',
		'新卒採用',
		'中途採用',
	],
	openGraph: {
		title: '採用担当者向け 年齢計算ツール | 学歴早見表',
		description: '卒業年から候補者の生年月日・年齢を逆算',
		type: 'website',
	},
};

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
	return children;
}
