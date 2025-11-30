import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { toWareki } from '@/lib/academic';
import { getCelebritiesByBirthYear } from '@/data/celebrities';

// 生成する年の範囲
const START_YEAR = 1950;
const END_YEAR = 2020;

// 静的パスを生成
export function generateStaticParams() {
  const years = [];
  for (let year = START_YEAR; year <= END_YEAR; year++) {
    years.push({ year: year.toString() });
  }
  return years;
}

// メタデータ生成
export async function generateMetadata({ params }: { params: { year: string } }): Promise<Metadata> {
  const year = parseInt(params.year);
  if (isNaN(year) || year < START_YEAR || year > END_YEAR) {
    return { title: 'ページが見つかりません' };
  }
  
  const wareki = toWareki(year, 4);
  
  return {
    title: `${year}年（${wareki}）生まれの学歴早見表｜入学・卒業年度一覧`,
    description: `${year}年（${wareki}）生まれの方の小学校から大学までの入学・卒業年度を一覧表示。履歴書作成に便利。同い年の有名人も紹介。`,
    keywords: [`${year}年生まれ`, `${wareki}生まれ`, '卒業年度', '入学年度', '学歴', '履歴書'],
    openGraph: {
      title: `${year}年（${wareki}）生まれの学歴早見表`,
      description: `${year}年生まれの入学・卒業年度一覧。履歴書作成に便利。`,
      images: [
        {
          url: `/ogp/${year}.svg`,
          width: 1200,
          height: 630,
          alt: `${year}年生まれの学歴早見表`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${year}年（${wareki}）生まれの学歴早見表`,
      description: `${year}年生まれの入学・卒業年度一覧。履歴書作成に便利。`,
      images: [`/ogp/${year}.svg`],
    },
  };
}

// 学歴データを計算
function calculateAcademicHistory(birthYear: number, isEarlyBorn: boolean) {
  const adjustedYear = isEarlyBorn ? birthYear - 1 : birthYear;
  
  return [
    { event: '小学校入学', year: adjustedYear + 7, month: 4, age: isEarlyBorn ? 6 : 6 },
    { event: '小学校卒業', year: adjustedYear + 13, month: 3, age: isEarlyBorn ? 12 : 12 },
    { event: '中学校入学', year: adjustedYear + 13, month: 4, age: isEarlyBorn ? 12 : 12 },
    { event: '中学校卒業', year: adjustedYear + 16, month: 3, age: isEarlyBorn ? 15 : 15 },
    { event: '高校入学', year: adjustedYear + 16, month: 4, age: isEarlyBorn ? 15 : 15 },
    { event: '高校卒業', year: adjustedYear + 19, month: 3, age: isEarlyBorn ? 18 : 18 },
    { event: '大学入学（4年制）', year: adjustedYear + 19, month: 4, age: isEarlyBorn ? 18 : 18 },
    { event: '大学卒業（4年制）', year: adjustedYear + 23, month: 3, age: isEarlyBorn ? 22 : 22 },
  ];
}

// 干支計算
const ETOS = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ETO_ANIMALS = ['ねずみ', 'うし', 'とら', 'うさぎ', 'たつ', 'へび', 'うま', 'ひつじ', 'さる', 'とり', 'いぬ', 'いのしし'];

function getEto(year: number) {
  const index = (year - 4) % 12;
  return { kanji: ETOS[index], reading: ETO_ANIMALS[index] };
}

export default function BirthYearPage({ params }: { params: { year: string } }) {
  const year = parseInt(params.year);
  
  if (isNaN(year) || year < START_YEAR || year > END_YEAR) {
    notFound();
  }
  
  const wareki = toWareki(year, 4);
  const eto = getEto(year);
  const celebrities = getCelebritiesByBirthYear(year, 10);
  
  // 早生まれ・遅生まれ両方の学歴を計算
  const lateHistory = calculateAcademicHistory(year, false);
  const earlyHistory = calculateAcademicHistory(year, true);
  
  // 現在の年齢を計算
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const age = currentYear - year - (currentMonth < 4 ? 1 : 0);

  // BreadcrumbList構造化データ
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'ホーム', item: 'https://sotsugyoutoshihayamihyou.vercel.app/' },
      { '@type': 'ListItem', position: 2, name: '年別早見表', item: 'https://sotsugyoutoshihayamihyou.vercel.app/birth' },
      { '@type': 'ListItem', position: 3, name: `${year}年生まれ`, item: `https://sotsugyoutoshihayamihyou.vercel.app/birth/${year}` },
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
        <Link href="/birth" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
          年別早見表
        </Link>
        <span className="mx-2">›</span>
        <span>{year}年生まれ</span>
      </nav>

      {/* ヘッダー */}
      <header className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          {year}年（{wareki}）生まれの学歴早見表
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          入学・卒業年度を一覧表示
        </p>
      </header>

      {/* 基本情報 */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="card p-4 text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>生まれ年</div>
          <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{year}年</div>
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{wareki}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>現在の年齢</div>
          <div className="text-xl font-bold" style={{ color: 'var(--color-accent)' }}>{age}〜{age + 1}歳</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>干支</div>
          <div className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{eto.kanji}年</div>
          <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{eto.reading}</div>
        </div>
        <div className="card p-4 text-center">
          <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>学年</div>
          <div className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
            {year + 7}年度入学
          </div>
        </div>
      </div>

      {/* 学歴一覧（遅生まれ） */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          📅 {year}年4月2日〜12月31日生まれ（遅生まれ）
        </h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--color-border-light)' }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>イベント</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>西暦</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>和暦</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>年齢</th>
              </tr>
            </thead>
            <tbody>
              {lateHistory.map((item, index) => (
                <tr key={index} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="px-4 py-2 font-medium" style={{ color: 'var(--color-text)' }}>{item.event}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>{item.year}年{item.month}月</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>{toWareki(item.year, item.month)}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-primary)' }}>{item.age}歳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 学歴一覧（早生まれ） */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          📅 {year}年1月1日〜4月1日生まれ（早生まれ）
        </h2>
        <div className="card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: 'var(--color-border-light)' }}>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>イベント</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>西暦</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>和暦</th>
                <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>年齢</th>
              </tr>
            </thead>
            <tbody>
              {earlyHistory.map((item, index) => (
                <tr key={index} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <td className="px-4 py-2 font-medium" style={{ color: 'var(--color-text)' }}>{item.event}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>{item.year}年{item.month}月</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>{toWareki(item.year, item.month)}</td>
                  <td className="px-4 py-2" style={{ color: 'var(--color-primary)' }}>{item.age}歳</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
          ※ 早生まれの方は前年度生まれの方と同じ学年になります
        </p>
      </section>

      {/* 同い年の有名人 */}
      {celebrities.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
            🎭 {year}年生まれの有名人
          </h2>
          <div className="card p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {celebrities.map((celeb, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg"
                  style={{ background: 'rgba(44, 82, 130, 0.04)' }}
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
                    style={{ 
                      background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                      color: 'white'
                    }}
                  >
                    {celeb.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium" style={{ color: 'var(--color-text)' }}>{celeb.name}</div>
                    <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{celeb.profession}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 前後の年へのリンク */}
      <div className="flex justify-between items-center mb-8">
        {year > START_YEAR ? (
          <Link 
            href={`/birth/${year - 1}`}
            className="px-4 py-2 rounded-lg transition-all"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
          >
            ← {year - 1}年生まれ
          </Link>
        ) : <div />}
        {year < END_YEAR ? (
          <Link 
            href={`/birth/${year + 1}`}
            className="px-4 py-2 rounded-lg transition-all"
            style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-primary)' }}
          >
            {year + 1}年生まれ →
          </Link>
        ) : <div />}
      </div>

      {/* フッターリンク */}
      <div className="flex flex-wrap justify-center gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            color: 'white'
          }}
        >
          詳細な学歴計算はこちら
        </Link>
      </div>
    </main>
  );
}
