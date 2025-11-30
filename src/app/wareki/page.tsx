'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '@/lib/i18n/LocaleContext';

// 元号データ
const ERA_DATA = [
  { name: '令和', romaji: 'Reiwa', key: 'reiwa', startYear: 2019, startDate: '2019年5月1日〜' },
  { name: '平成', romaji: 'Heisei', key: 'heisei', startYear: 1989, endYear: 2019, startDate: '1989年1月8日〜2019年4月30日' },
  { name: '昭和', romaji: 'Showa', key: 'showa', startYear: 1926, endYear: 1989, startDate: '1926年12月25日〜1989年1月7日' },
  { name: '大正', romaji: 'Taisho', key: 'taisho', startYear: 1912, endYear: 1926, startDate: '1912年7月30日〜1926年12月24日' },
  { name: '明治', romaji: 'Meiji', key: 'meiji', startYear: 1868, endYear: 1912, startDate: '1868年9月8日〜1912年7月29日' },
];

// 西暦→和暦変換
function seirekiToWareki(year: number): string[] {
  const results: string[] = [];
  
  for (const era of ERA_DATA) {
    const eraStart = era.startYear;
    const eraEnd = era.endYear || new Date().getFullYear() + 10;
    
    if (year >= eraStart && year <= eraEnd) {
      const eraYear = year - eraStart + 1;
      results.push(`${era.name}${eraYear === 1 ? '元' : eraYear}年`);
    }
  }
  
  return results;
}

// 和暦→西暦変換
function warekiToSeireki(eraName: string, eraYear: number): number | null {
  const era = ERA_DATA.find(e => e.name === eraName);
  if (!era) return null;
  return era.startYear + eraYear - 1;
}

// 年号一覧表を生成
function generateEraTable() {
  const currentYear = new Date().getFullYear();
  const rows: { seireki: number; reiwa?: number; heisei?: number; showa?: number }[] = [];
  
  for (let year = 1926; year <= currentYear; year++) {
    const row: { seireki: number; reiwa?: number; heisei?: number; showa?: number } = { seireki: year };
    
    if (year >= 2019) {
      row.reiwa = year - 2019 + 1;
    }
    if (year >= 1989 && year <= 2019) {
      row.heisei = year - 1989 + 1;
    }
    if (year >= 1926 && year <= 1989) {
      row.showa = year - 1926 + 1;
    }
    
    rows.push(row);
  }
  
  return rows.reverse();
}

export default function WarekiPage() {
  const { t } = useLocale();
  const [conversionMode, setConversionMode] = useState<'toWareki' | 'toSeireki'>('toWareki');
  const [seirekiInput, setSeirekiInput] = useState('');
  const [selectedEra, setSelectedEra] = useState('令和');
  const [eraYearInput, setEraYearInput] = useState('');
  
  const eraTable = useMemo(() => generateEraTable(), []);
  
  // 西暦→和暦の結果
  const warekiResult = useMemo(() => {
    const year = parseInt(seirekiInput);
    if (isNaN(year) || year < 1868 || year > 2100) return null;
    return seirekiToWareki(year);
  }, [seirekiInput]);
  
  // 和暦→西暦の結果
  const seirekiResult = useMemo(() => {
    const year = parseInt(eraYearInput);
    if (isNaN(year) || year < 1) return null;
    return warekiToSeireki(selectedEra, year);
  }, [selectedEra, eraYearInput]);

  // 元号名を翻訳
  const getEraName = (key: string): string => {
    const keyMap: { [k: string]: keyof typeof t } = {
      reiwa: 'reiwa',
      heisei: 'heisei',
      showa: 'showa',
      taisho: 'taisho',
      meiji: 'meiji',
    };
    return t[keyMap[key] as keyof typeof t] || key;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* パンくずリスト */}
      <nav className="mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
          {t.home}
        </Link>
        <span className="mx-2">›</span>
        <span>{t.warekiTitle}</span>
      </nav>

      {/* ヘッダー */}
      <header className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          {t.warekiTitle}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {t.warekiSubtitle}
        </p>
      </header>

      {/* 変換ツール */}
      <div className="card p-6 mb-8">
        {/* モード切替 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setConversionMode('toWareki')}
            className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
            style={{
              background: conversionMode === 'toWareki'
                ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                : 'var(--color-card)',
              color: conversionMode === 'toWareki' ? 'white' : 'var(--color-text-secondary)',
              border: conversionMode === 'toWareki' ? 'none' : '1px solid var(--color-border)',
            }}
          >
            {t.toWareki}
          </button>
          <button
            onClick={() => setConversionMode('toSeireki')}
            className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
            style={{
              background: conversionMode === 'toSeireki'
                ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                : 'var(--color-card)',
              color: conversionMode === 'toSeireki' ? 'white' : 'var(--color-text-secondary)',
              border: conversionMode === 'toSeireki' ? 'none' : '1px solid var(--color-border)',
            }}
          >
            {t.toSeireki}
          </button>
        </div>

        {/* 西暦→和暦 */}
        {conversionMode === 'toWareki' && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {t.inputSeireki}
            </label>
            <div className="flex gap-2 items-center mb-4">
              <input
                type="number"
                value={seirekiInput}
                onChange={(e) => setSeirekiInput(e.target.value)}
                placeholder="例: 2000"
                min={1868}
                max={2100}
                className="input-field w-32"
              />
              <span style={{ color: 'var(--color-text-muted)' }}>{t.yearUnit}</span>
            </div>
            
            {warekiResult && warekiResult.length > 0 && (
              <div className="p-4 rounded-xl" style={{ background: 'rgba(44, 82, 130, 0.08)' }}>
                <div className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>{t.convertResult}</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {warekiResult.join(' / ')}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 和暦→西暦 */}
        {conversionMode === 'toSeireki' && (
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              {t.inputWareki}
            </label>
            <div className="flex gap-2 items-center mb-4">
              <select
                value={selectedEra}
                onChange={(e) => setSelectedEra(e.target.value)}
                className="input-field w-24"
              >
                {ERA_DATA.map((era) => (
                  <option key={era.name} value={era.name}>{era.name}</option>
                ))}
              </select>
              <input
                type="number"
                value={eraYearInput}
                onChange={(e) => setEraYearInput(e.target.value)}
                placeholder="例: 1"
                min={1}
                className="input-field w-20"
              />
              <span style={{ color: 'var(--color-text-muted)' }}>{t.yearUnit}</span>
            </div>
            
            {seirekiResult && (
              <div className="p-4 rounded-xl" style={{ background: 'rgba(44, 82, 130, 0.08)' }}>
                <div className="text-sm mb-2" style={{ color: 'var(--color-text-muted)' }}>{t.convertResult}</div>
                <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                  {seirekiResult}{t.yearUnit}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 元号一覧 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          {t.eraTable}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ERA_DATA.map((era) => (
            <div key={era.name} className="card p-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{getEraName(era.key)}</span>
                <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>{era.romaji}</span>
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                {era.startDate}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-2" style={{ color: 'var(--color-text-muted)' }}>
          {t.eraTableNote}
        </p>
      </section>

      {/* 年号対照表 */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          西暦・和暦 対照表
        </h2>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--color-border-light)' }}>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>西暦</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>令和</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>平成</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>昭和</th>
                </tr>
              </thead>
              <tbody>
                {eraTable.slice(0, 50).map((row) => (
                  <tr key={row.seireki} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-2 font-medium" style={{ color: 'var(--color-text)' }}>{row.seireki}年</td>
                    <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {row.reiwa ? `令和${row.reiwa}年` : '-'}
                    </td>
                    <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {row.heisei ? `平成${row.heisei}年` : '-'}
                    </td>
                    <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>
                      {row.showa ? `昭和${row.showa}年` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* フッターリンク */}
      <div className="mt-10 text-center">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)'
          }}
        >
          ← {t.title}
        </Link>
      </div>
    </main>
  );
}
