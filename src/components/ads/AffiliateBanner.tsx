'use client';

import { useLocale } from '@/lib/i18n';

/**
 * アフィリエイトバナーコンポーネント
 * 就活・転職・履歴書関連のサービスを紹介
 */

interface AffiliateItem {
	name: string;
	description: string;
	url: string;
	icon: string;
	color: string;
	tag?: string;
}

// アフィリエイトリンク（実際のアフィリエイトリンクに置き換えてください）
const AFFILIATE_LINKS: AffiliateItem[] = [
	{
		name: 'リクナビNEXT',
		description: '転職サイトNo.1',
		url: 'https://example.com/rikunabi', // 実際のアフィリエイトリンクに置き換え
		icon: '💼',
		color: '#E60012',
		tag: '転職',
	},
	{
		name: 'マイナビ転職',
		description: '豊富な求人情報',
		url: 'https://example.com/mynavi', // 実際のアフィリエイトリンクに置き換え
		icon: '🏢',
		color: '#00A0E9',
		tag: '転職',
	},
	{
		name: 'doda',
		description: '転職エージェント',
		url: 'https://example.com/doda', // 実際のアフィリエイトリンクに置き換え
		icon: '🎯',
		color: '#FF6B00',
		tag: '転職',
	},
	{
		name: 'OfferBox',
		description: '逆求人サービス',
		url: 'https://example.com/offerbox', // 実際のアフィリエイトリンクに置き換え
		icon: '📧',
		color: '#1E88E5',
		tag: '新卒',
	},
];

/**
 * おすすめサービスセクション
 */
export function RecommendedServices({ className = '' }: { className?: string }) {
	const { locale } = useLocale();

	// 日本語以外では表示しない
	if (locale !== 'ja') {
		return null;
	}

	return (
		<section className={`${className}`}>
			<div className="card p-6">
				<div className="flex items-center gap-2 mb-4">
					<span className="text-xl">💡</span>
					<h3 className="font-bold" style={{ color: 'var(--color-text)' }}>
						履歴書作成に役立つサービス
					</h3>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					{AFFILIATE_LINKS.map((item) => (
						<a
							key={item.name}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer sponsored"
							className="flex items-center gap-3 p-3 rounded-xl transition-all hover:translate-y-[-2px]"
							style={{
								background: 'var(--color-bg)',
								border: '1px solid var(--color-border)',
							}}
						>
							<div
								className="w-10 h-10 rounded-lg flex items-center justify-center text-lg"
								style={{ background: `${item.color}15`, color: item.color }}
							>
								{item.icon}
							</div>
							<div className="flex-1 min-w-0">
								<div className="flex items-center gap-2">
									<span className="font-medium text-sm" style={{ color: 'var(--color-text)' }}>
										{item.name}
									</span>
									{item.tag && (
										<span
											className="text-[10px] px-1.5 py-0.5 rounded-full"
											style={{
												background: `${item.color}20`,
												color: item.color,
											}}
										>
											{item.tag}
										</span>
									)}
								</div>
								<p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
									{item.description}
								</p>
							</div>
							<svg
								className="w-4 h-4 flex-shrink-0"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
								style={{ color: 'var(--color-text-muted)' }}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</a>
					))}
				</div>

				<p className="text-[10px] mt-3 text-center" style={{ color: 'var(--color-text-muted)' }}>
					※ PR・広告を含みます
				</p>
			</div>
		</section>
	);
}

/**
 * インライン広告（テキストリンク形式）
 */
export function InlineAffiliate({ className = '' }: { className?: string }) {
	const { locale } = useLocale();

	if (locale !== 'ja') {
		return null;
	}

	return (
		<div className={`text-center py-4 ${className}`}>
			<p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
				📝 履歴書作成でお困りなら →
				<a
					href="https://example.com/resume-service"
					target="_blank"
					rel="noopener noreferrer sponsored"
					className="font-medium hover:underline ml-1"
					style={{ color: 'var(--color-primary)' }}
				>
					無料で履歴書を作成する
				</a>
			</p>
		</div>
	);
}

/**
 * バナー広告（画像形式プレースホルダー）
 */
export function AffiliateBanner({
	type = 'horizontal',
	className = '',
}: {
	type?: 'horizontal' | 'vertical' | 'square';
	className?: string;
}) {
	const { locale } = useLocale();

	if (locale !== 'ja') {
		return null;
	}

	const sizes = {
		horizontal: { width: '100%', height: '90px' },
		vertical: { width: '160px', height: '600px' },
		square: { width: '300px', height: '250px' },
	};

	return (
		<div className={`${className}`} style={sizes[type]}>
			{/* 実際のアフィリエイトバナーHTMLをここに挿入 */}
			<a
				href="https://example.com/affiliate"
				target="_blank"
				rel="noopener noreferrer sponsored"
				className="block w-full h-full rounded-xl flex items-center justify-center transition-all hover:opacity-90"
				style={{
					background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
					color: 'white',
				}}
			>
				<div className="text-center p-4">
					<p className="font-bold">🎓 就活・転職サポート</p>
					<p className="text-sm opacity-90">無料で相談する →</p>
				</div>
			</a>
		</div>
	);
}
