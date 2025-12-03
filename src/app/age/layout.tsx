import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '年齢早見表・年齢計算｜干支・星座も一発表示',
	description:
		'生年月日から年齢・干支・星座を瞬時に計算。西暦・和暦対応の年齢早見表も掲載。履歴書作成や書類記入に便利な年齢確認ツール。',
	keywords: ['年齢早見表', '年齢計算', '干支', '星座', '生年月日', '西暦', '和暦', '履歴書'],
	openGraph: {
		title: '年齢早見表・年齢計算｜干支・星座も一発表示',
		description: '生年月日から年齢・干支・星座を瞬時に計算。',
		type: 'website',
	},
};

export default function AgeLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}
