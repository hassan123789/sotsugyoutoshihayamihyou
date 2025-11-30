import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/ThemeProvider';
import { DarkModeToggle } from '@/components/DarkModeToggle';
import { PWAProvider } from '@/components/PWAProvider';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { AdSenseScript } from '@/components/AdSenseScript';
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
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: '入学・卒業年度自動計算｜学歴早見表【西暦・和暦対応】',
    description: '生年月日を入力するだけで小学校から大学院までの入学・卒業年度を自動計算。西暦・和暦両対応で履歴書作成に便利。',
    siteName: '学歴早見表',
    // TODO: PNG画像に置き換え推奨（多くのプラットフォームでSVG非対応）
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: '学歴早見表 - 入学・卒業年度自動計算ツール',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '入学・卒業年度自動計算｜学歴早見表【西暦・和暦対応】',
    description: '生年月日を入力するだけで入学・卒業年度を自動計算。履歴書作成に便利な無料ツール。',
    images: ['/og-image.svg'],
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
    // Google Search Console の確認コード（後で設定）
    // google: 'your-google-verification-code',
  },
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
  ],
  screenshot: 'https://sotsugyoutoshihayamihyou.vercel.app/og-image.svg',
  author: {
    '@type': 'Organization',
    name: '学歴早見表',
  },
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
        <link rel="apple-touch-icon" href="/icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2C5282" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#0F1419" media="(prefers-color-scheme: dark)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
        />
      </head>
      <body className="min-h-screen transition-colors duration-300">
        <ThemeProvider>
          <PWAProvider>
            <DarkModeToggle />
            {children}
          </PWAProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
