'use client';

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/LocaleContext';

// 年代別にグループ化
function groupByDecade(startYear: number, endYear: number) {
	const decades: { [key: string]: number[] } = {};

	for (let year = endYear; year >= startYear; year--) {
		const decade = `${Math.floor(year / 10) * 10}`;
		if (!decades[decade]) {
			decades[decade] = [];
		}
		decades[decade].push(year);
	}

	return decades;
}

export default function BirthIndexPage() {
	const { t } = useLocale();
	const decades = groupByDecade(1950, 2020);

	// BreadcrumbList構造化データ
	const breadcrumbJsonLd = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: [
			{
				'@type': 'ListItem',
				position: 1,
				name: t.home,
				item: 'https://sotsugyoutoshihayamihyou.vercel.app/',
			},
			{
				'@type': 'ListItem',
				position: 2,
				name: t.birthTitle,
				item: 'https://sotsugyoutoshihayamihyou.vercel.app/birth',
			},
		],
	};

	return (
		<main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
			{/* 構造化データ */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
			/>

			{/* パンくずリスト */}
			<nav className="mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
				<Link href="/" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
					{t.home}
				</Link>
				<span className="mx-2">›</span>
				<span>{t.birthTitle}</span>
			</nav>

			{/* ヘッダー */}
			<header className="text-center mb-10">
				<h1
					className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
					style={{ color: 'var(--color-text)' }}
				>
					{t.birthTitle}
				</h1>
				<p style={{ color: 'var(--color-text-secondary)' }}>{t.birthSubtitle}</p>
			</header>

			{/* 年代別リスト */}
			{Object.entries(decades).map(([decade, years]) => (
				<section key={decade} className="mb-8">
					<h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
						{decade}s
					</h2>
					<div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
						{years.map((year) => (
							<Link
								key={year}
								href={`/birth/${year}`}
								className="card p-2 text-center text-sm font-medium transition-all hover:translate-y-[-2px]"
								style={{ color: 'var(--color-text)' }}
							>
								{year}
							</Link>
						))}
					</div>
				</section>
			))}

			{/* フッターリンク */}
			<div className="mt-10 flex flex-wrap justify-center gap-4">
				<Link
					href="/"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
					style={{
						background: 'var(--color-card)',
						color: 'var(--color-primary)',
						border: '1px solid var(--color-border)',
					}}
				>
					← {t.detailedCalc}
				</Link>
				<Link
					href="/age"
					className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
					style={{
						background: 'var(--color-card)',
						color: 'var(--color-primary)',
						border: '1px solid var(--color-border)',
					}}
				>
					{t.ageTitle} →
				</Link>
			</div>
		</main>
	);
}
