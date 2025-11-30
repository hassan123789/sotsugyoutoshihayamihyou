import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: '世代診断クイズ｜あなたは何世代？氷河期・ゆとり・Z世代',
	description:
		'8つの質問であなたの「世代」を診断！氷河期世代、プレッシャー世代、ゆとり世代、Z世代...あなたはどの世代？結果をSNSでシェアしよう！',
	keywords: [
		'世代診断',
		'氷河期世代',
		'ゆとり世代',
		'Z世代',
		'プレッシャー世代',
		'世代クイズ',
		'診断',
	],
	openGraph: {
		title: '🎯 世代診断クイズ｜あなたは何世代？',
		description: '8つの質問であなたの世代を診断！結果をシェアしよう',
		type: 'website',
		images: ['/og-image.svg'],
	},
	twitter: {
		card: 'summary_large_image',
		title: '🎯 世代診断クイズ｜あなたは何世代？',
		description: '8つの質問であなたの世代を診断！結果をシェアしよう',
	},
};

export default function QuizLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return children;
}
