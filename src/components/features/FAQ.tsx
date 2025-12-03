'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/i18n';

export function FAQ() {
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const { t } = useLocale();

	const faqData = [
		{ question: t.faq1Q, answer: t.faq1A },
		{ question: t.faq2Q, answer: t.faq2A },
		{ question: t.faq3Q, answer: t.faq3A },
		{ question: t.faq4Q, answer: t.faq4A },
	];

	return (
		<section className="mt-12">
			<h2 className="text-xl font-bold mb-6 text-center" style={{ color: 'var(--color-text)' }}>
				{t.faqTitle}
			</h2>

			<div className="space-y-3">
				{faqData.map((item, index) => (
					<div key={index} className="card overflow-hidden">
						<button
							onClick={() => setOpenIndex(openIndex === index ? null : index)}
							className="w-full px-5 py-4 text-left flex items-center justify-between gap-4"
							style={{ color: 'var(--color-text)' }}
						>
							<span className="font-medium">{item.question}</span>
							<svg
								className={`w-5 h-5 flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
								style={{ color: 'var(--color-text-muted)' }}
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M19 9l-7 7-7-7"
								/>
							</svg>
						</button>

						{openIndex === index && (
							<div
								className="px-5 pb-4 text-sm leading-relaxed"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								{item.answer}
							</div>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

// FAQ用のJSON-LDデータをエクスポート（SEO用に日本語固定）
const faqDataForSEO = [
	{
		question: '早生まれとは何ですか？',
		answer: '1月1日〜4月1日に生まれた人のことです。学年では前年度生まれの人と同じ扱いになります。',
	},
	{
		question: '浪人した場合はどうすればいいですか？',
		answer:
			'「浪人年数」の項目で該当する年数を選択してください。大学入学年度が自動的に調整されます。',
	},
	{
		question: '留年した場合はどうすればいいですか？',
		answer: '「詳細オプション」を開いて、該当する学校の留年年数を選択してください。',
	},
	{
		question: '海外の学校や通信制の場合は？',
		answer:
			'このツールは日本の一般的な学制（6-3-3-4制）に基づいています。特殊なケースは個別にご確認ください。',
	},
];

export const faqJsonLd = {
	'@context': 'https://schema.org',
	'@type': 'FAQPage',
	mainEntity: faqDataForSEO.map((item) => ({
		'@type': 'Question',
		name: item.question,
		acceptedAnswer: {
			'@type': 'Answer',
			text: item.answer,
		},
	})),
};
