import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider, PWAProvider } from '@/components/providers';
import { DarkModeToggle, LanguageSwitcher } from '@/components/ui';
import { GoogleAnalytics } from '@/components/analytics';
import { AdSenseScript } from '@/components/ads';
import { LocaleProvider } from '@/lib/i18n';
import './globals.css';

// SEO メタデータ
export const metadata: Metadata = {
  title: {
    default: '入学・卒業年度自動計算｜学歴早見表【西暦・和暦対応】',
    template: '%s | 学歴早見表',
  },
  description: '生年月日を入力するだけで小学校から大学院までの入学・卒業年度を自動計算。西暦・和暦（令和・平成・昭和）両対応。履歴書作成・就活に便利な無料ツール。',
  keywords: [
    '卒業年度 計算',
    '入学年度 計算',
    '学歴 早見表',
    '和暦 西暦 変換',
    '履歴書 学歴',
    '生年月日 卒業年',
    '令和 平成 昭和 変換',
    '就活 履歴書',
    '卒業年月日',
    '入学年月日',
  ],
  authors: [{ name: '学歴早見表' }],
  creator: '学歴早見表',
  publisher: '学歴早見表',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sotsugyoutoshihayamihyou.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'ja': '/',
      'en': '/?lang=en',
      'zh': '/?lang=zh',
      'ko': '/?lang=ko',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: ['en_US', 'zh_CN', 'ko_KR'],
    url: '/',
    title: '入学・卒業年度自動計算｜学歴早見表【西暦・和暦対応】',
    description: '生年月日を入力するだけで小学校から大学院までの入学・卒業年度を自動計算。西暦・和暦両対応で履歴書作成に便利。',
    siteName: '学歴早見表',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: '学歴早見表 - 入学・卒業年度自動計算ツール',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '入学・卒業年度自動計算｜学歴早見表【西暦・和暦対応】',
    description: '生年月日を入力するだけで入学・卒業年度を自動計算。履歴書作成に便利な無料ツール。',
    images: ['/twitter-image.png'],
    creator: '@gakureki_hayami',
    site: '@gakureki_hayami',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'V1-keVq1sImNfHStAjHPsSXQ_5Z5JABh8dJnq3zkDlU',
  },
  other: {
    'google-adsense-account': 'ca-pub-2145087068476394',
  },
  category: 'education',
};

// JSON-LD 構造化データ
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: '学歴早見表 - 入学・卒業年度自動計算',
  description: '生年月日から入学・卒業年度を自動計算するWebアプリケーション',
  url: 'https://sotsugyoutoshihayamihyou.vercel.app',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'All',
  inLanguage: ['ja', 'en', 'zh', 'ko'],
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'JPY',
  },
  featureList: [
    '生年月日から学歴年表を自動計算',
    '西暦・和暦（令和・平成・昭和）両対応',
    '履歴書形式でコピー可能',
    '浪人・留年・休学に対応',
    'ダークモード対応',
    '4言語対応（日本語・英語・中国語・韓国語）',
  ],
  screenshot: 'https://sotsugyoutoshihayamihyou.vercel.app/og-image.png',
  author: {
    '@type': 'Organization',
    name: '学歴早見表',
    url: 'https://sotsugyoutoshihayamihyou.vercel.app',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '150',
    bestRating: '5',
    worstRating: '1',
  },
};

// Organization構造化データ
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '学歴早見表',
  url: 'https://sotsugyoutoshihayamihyou.vercel.app',
  logo: 'https://sotsugyoutoshihayamihyou.vercel.app/icons/icon-512x512.png',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: ['Japanese', 'English', 'Chinese', 'Korean'],
  },
};

// BreadcrumbList構造化データ
const breadcrumbJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'ホーム',
      item: 'https://sotsugyoutoshihayamihyou.vercel.app',
    },
  ],
};

// HowTo構造化データ
const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '生年月日から卒業年度を調べる方法',
  description: '生年月日を入力するだけで、小学校から大学院までの入学・卒業年度を自動計算できます。',
  step: [
    {
      '@type': 'HowToStep',
      name: '生年月日を入力',
      text: '年・月・日を選択または入力します。',
      position: 1,
    },
    {
      '@type': 'HowToStep',
      name: '学歴オプションを選択',
      text: '大学の修業年数、大学院進学の有無などを選択します。',
      position: 2,
    },
    {
      '@type': 'HowToStep',
      name: '結果を確認',
      text: '入学・卒業年度が自動計算され、タイムライン形式で表示されます。',
      position: 3,
    },
    {
      '@type': 'HowToStep',
      name: '履歴書形式でコピー',
      text: '「履歴書形式でコピー」ボタンで、履歴書に貼り付けられる形式でコピーできます。',
      position: 4,
    },
  ],
  totalTime: 'PT1M',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <AdSenseScript />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2C5282" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F1419" media="(prefers-color-scheme: dark)" />
        
        {/* フォントプリロード */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS プリフェッチ */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        
        {/* OGP画像プリロード */}
        <link rel="preload" href="/og-image.png" as="image" type="image/png" />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
      </head>
      <body className="min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <LocaleProvider>
            <PWAProvider>
              {/* ヘッダーツールバー */}
              <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
                <LanguageSwitcher />
                <DarkModeToggle />
              </div>
              {children}
            </PWAProvider>
          </LocaleProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
