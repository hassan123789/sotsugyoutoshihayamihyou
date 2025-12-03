'use client';

import Script from 'next/script';

// Google Analytics 4 Measurement ID
// 環境変数から取得、または直接設定
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

export function GoogleAnalytics() {
	// 開発環境ではスキップ
	if (process.env.NODE_ENV !== 'production') {
		return null;
	}

	return (
		<>
			<Script
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
				strategy="afterInteractive"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
			</Script>
		</>
	);
}

// ページビューをトラッキング
export function trackPageView(url: string) {
	if (typeof window !== 'undefined' && (window as any).gtag) {
		(window as any).gtag('config', GA_MEASUREMENT_ID, {
			page_path: url,
		});
	}
}

// カスタムイベントをトラッキング
export function trackEvent(action: string, category: string, label?: string, value?: number) {
	if (typeof window !== 'undefined' && (window as any).gtag) {
		(window as any).gtag('event', action, {
			event_category: category,
			event_label: label,
			value: value,
		});
	}
}
