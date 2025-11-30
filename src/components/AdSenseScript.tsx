'use client';

import Script from 'next/script';

// Google AdSense Publisher ID
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXX';

/**
 * AdSense スクリプトローダー
 * layout.tsxのheadに配置して使用
 */
export function AdSenseScript() {
  // 開発環境ではスキップ
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
      strategy="lazyOnload"
    />
  );
}
