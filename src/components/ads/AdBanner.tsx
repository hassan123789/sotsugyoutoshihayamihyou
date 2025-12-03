'use client';

import { useEffect, useRef } from 'react';

declare global {
	interface Window {
		adsbygoogle: any[];
	}
}

interface AdBannerProps {
	slot: string;
	format?: 'auto' | 'fluid' | 'rectangle' | 'vertical' | 'horizontal';
	responsive?: boolean;
	className?: string;
	style?: React.CSSProperties;
}

// Google AdSense Publisher ID
const ADSENSE_CLIENT = 'ca-pub-2145087068476394';

/**
 * Google AdSense 広告バナーコンポーネント
 *
 * 使用例:
 * <AdBanner slot="1234567890" format="auto" responsive />
 */
export function AdBanner({
	slot,
	format = 'auto',
	responsive = true,
	className = '',
	style = {},
}: AdBannerProps) {
	const adRef = useRef<HTMLModElement>(null);
	const isLoaded = useRef(false);

	useEffect(() => {
		// 開発環境ではスキップ
		if (process.env.NODE_ENV !== 'production') {
			return;
		}

		// 既にロード済みならスキップ
		if (isLoaded.current) {
			return;
		}

		try {
			// AdSenseスクリプトがロードされているか確認
			if (typeof window !== 'undefined' && window.adsbygoogle) {
				window.adsbygoogle.push({});
				isLoaded.current = true;
			}
		} catch (error) {
			console.error('AdSense error:', error);
		}
	}, []);

	// 開発環境ではプレースホルダーを表示
	if (process.env.NODE_ENV !== 'production') {
		return (
			<div
				className={`border-2 border-dashed rounded-lg flex items-center justify-center text-sm ${className}`}
				style={{
					minHeight: '100px',
					background: 'var(--color-bg-secondary)',
					borderColor: 'var(--color-border)',
					color: 'var(--color-text-muted)',
					...style,
				}}
			>
				<div className="text-center p-4">
					<p>📢 広告スペース</p>
					<p className="text-xs mt-1">（本番環境で表示されます）</p>
				</div>
			</div>
		);
	}

	return (
		<ins
			ref={adRef}
			className={`adsbygoogle ${className}`}
			style={{
				display: 'block',
				...style,
			}}
			data-ad-client={ADSENSE_CLIENT}
			data-ad-slot={slot}
			data-ad-format={format}
			data-full-width-responsive={responsive ? 'true' : 'false'}
		/>
	);
}

/**
 * 記事内広告コンポーネント
 * コンテンツ間に挿入する用
 */
export function InArticleAd({ slot, className = '' }: { slot: string; className?: string }) {
	return (
		<div className={`my-6 ${className}`}>
			<AdBanner slot={slot} format="fluid" style={{ minHeight: '250px' }} />
		</div>
	);
}

/**
 * サイドバー広告コンポーネント
 * 縦長のサイドバー用
 */
export function SidebarAd({ slot, className = '' }: { slot: string; className?: string }) {
	return (
		<div className={`sticky top-4 ${className}`}>
			<AdBanner slot={slot} format="vertical" style={{ minWidth: '160px', minHeight: '600px' }} />
		</div>
	);
}

/**
 * フッター広告コンポーネント
 * ページ下部の横長広告用
 */
export function FooterAd({ slot, className = '' }: { slot: string; className?: string }) {
	return (
		<div className={`mt-8 ${className}`}>
			<AdBanner slot={slot} format="horizontal" style={{ minHeight: '90px' }} />
		</div>
	);
}
