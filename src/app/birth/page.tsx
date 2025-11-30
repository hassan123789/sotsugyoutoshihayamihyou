import { Metadata } from 'next';
import Link from 'next/link';
import { toWareki } from '@/lib/academic';

export const metadata: Metadata = {
  title: '年別学歴早見表一覧｜1950年〜2020年生まれ',
  description: '1950年から2020年生まれまでの年別学歴早見表。生まれ年を選択するだけで入学・卒業年度を確認できます。',
  keywords: ['年別', '学歴早見表', '卒業年度', '入学年度', '生まれ年'],
};

// 年代別にグループ化
function groupByDecade(startYear: number, endYear: number) {
  const decades: { [key: string]: number[] } = {};
  
  for (let year = endYear; year >= startYear; year--) {
    const decade = `${Math.floor(year / 10) * 10}年代`;
    if (!decades[decade]) {
      decades[decade] = [];
    }
    decades[decade].push(year);
  }
  
  return decades;
}

export default function BirthIndexPage() {
  const decades = groupByDecade(1950, 2020);

  // BreadcrumbList構造化データ
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://sotsugyoutoshihayamihyou.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: '年別早見表', item: 'https://sotsugyoutoshihayamihyou.vercel.app/birth' },
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
          ホーム
        </Link>
        <span className="mx-2">›</span>
        <span>年別早見表</span>
      </nav>

      {/* ヘッダー */}
      <header className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          年別 学歴早見表
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          生まれ年を選択して入学・卒業年度を確認
        </p>
      </header>

      {/* 年代別リスト */}
      {Object.entries(decades).map(([decade, years]) => (
        <section key={decade} className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            {decade}
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
            border: '1px solid var(--color-border)'
          }}
        >
          ← 詳細な学歴計算
        </Link>
        <Link 
          href="/age" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)'
          }}
        >
          年齢早見表 →
        </Link>
      </div>
    </main>
  );
}
