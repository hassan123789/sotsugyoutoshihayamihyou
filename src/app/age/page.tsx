'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// 干支データ
const ETOS = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
const ETO_ANIMALS = ['ねずみ', 'うし', 'とら', 'うさぎ', 'たつ', 'へび', 'うま', 'ひつじ', 'さる', 'とり', 'いぬ', 'いのしし'];

// 星座データ
const ZODIAC_SIGNS = [
  { name: '山羊座', emoji: '♑', startMonth: 12, startDay: 22, endMonth: 1, endDay: 19 },
  { name: '水瓶座', emoji: '♒', startMonth: 1, startDay: 20, endMonth: 2, endDay: 18 },
  { name: '魚座', emoji: '♓', startMonth: 2, startDay: 19, endMonth: 3, endDay: 20 },
  { name: '牡羊座', emoji: '♈', startMonth: 3, startDay: 21, endMonth: 4, endDay: 19 },
  { name: '牡牛座', emoji: '♉', startMonth: 4, startDay: 20, endMonth: 5, endDay: 20 },
  { name: '双子座', emoji: '♊', startMonth: 5, startDay: 21, endMonth: 6, endDay: 21 },
  { name: '蟹座', emoji: '♋', startMonth: 6, startDay: 22, endMonth: 7, endDay: 22 },
  { name: '獅子座', emoji: '♌', startMonth: 7, startDay: 23, endMonth: 8, endDay: 22 },
  { name: '乙女座', emoji: '♍', startMonth: 8, startDay: 23, endMonth: 9, endDay: 22 },
  { name: '天秤座', emoji: '♎', startMonth: 9, startDay: 23, endMonth: 10, endDay: 23 },
  { name: '蠍座', emoji: '♏', startMonth: 10, startDay: 24, endMonth: 11, endDay: 22 },
  { name: '射手座', emoji: '♐', startMonth: 11, startDay: 23, endMonth: 12, endDay: 21 },
];

// 干支計算
function getEto(year: number): { kanji: string; reading: string } {
  const index = (year - 4) % 12;
  return { kanji: ETOS[index], reading: ETO_ANIMALS[index] };
}

// 星座計算
function getZodiac(month: number, day: number): { name: string; emoji: string } {
  for (const sign of ZODIAC_SIGNS) {
    if (sign.startMonth === 12) {
      // 山羊座の特殊処理（年をまたぐ）
      if ((month === 12 && day >= sign.startDay) || (month === 1 && day <= sign.endDay)) {
        return { name: sign.name, emoji: sign.emoji };
      }
    } else if (
      (month === sign.startMonth && day >= sign.startDay) ||
      (month === sign.endMonth && day <= sign.endDay)
    ) {
      return { name: sign.name, emoji: sign.emoji };
    }
  }
  return { name: '', emoji: '' };
}

// 年齢計算
function calculateAge(birthYear: number, birthMonth: number, birthDay: number): number {
  const today = new Date();
  const thisYear = today.getFullYear();
  const thisMonth = today.getMonth() + 1;
  const thisDay = today.getDate();
  
  let age = thisYear - birthYear;
  if (thisMonth < birthMonth || (thisMonth === birthMonth && thisDay < birthDay)) {
    age--;
  }
  return age;
}

// 和暦変換
function toWareki(year: number): string {
  if (year >= 2019) return `令和${year - 2019 + 1}年`;
  if (year >= 1989) return `平成${year - 1989 + 1}年`;
  if (year >= 1926) return `昭和${year - 1926 + 1}年`;
  if (year >= 1912) return `大正${year - 1912 + 1}年`;
  return `明治${year - 1868 + 1}年`;
}

// 年齢早見表生成
function generateAgeTable() {
  const currentYear = new Date().getFullYear();
  const rows = [];
  
  // 1歳から始める（0歳は除外）
  for (let year = currentYear - 1; year >= 1930; year--) {
    const age = currentYear - year;
    const eto = getEto(year);
    rows.push({
      year,
      wareki: toWareki(year),
      age,
      eto: `${eto.kanji}（${eto.reading}）`,
    });
  }
  
  return rows;
}

export default function AgePage() {
  const [birthYear, setBirthYear] = useState('');
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  
  const ageTable = useMemo(() => generateAgeTable(), []);
  
  // 個別計算結果
  const result = useMemo(() => {
    const year = parseInt(birthYear);
    const month = parseInt(birthMonth);
    const day = parseInt(birthDay);
    
    if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
    if (year < 1900 || year > new Date().getFullYear()) return null;
    if (month < 1 || month > 12 || day < 1 || day > 31) return null;
    
    const age = calculateAge(year, month, day);
    const eto = getEto(year);
    const zodiac = getZodiac(month, day);
    const wareki = toWareki(year);
    
    return { age, eto, zodiac, wareki };
  }, [birthYear, birthMonth, birthDay]);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* パンくずリスト */}
      <nav className="mb-6 text-sm" style={{ color: 'var(--color-text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--color-primary)' }}>
          ホーム
        </Link>
        <span className="mx-2">›</span>
        <span>年齢早見表</span>
      </nav>

      {/* ヘッダー */}
      <header className="text-center mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ color: 'var(--color-text)' }}>
          年齢早見表・年齢計算
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          生年月日から年齢・干支・星座を計算
        </p>
      </header>

      {/* 年齢計算ツール */}
      <div className="card p-6 mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          年齢を計算
        </h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            生年月日
          </label>
          <div className="flex gap-2 items-center flex-wrap">
            <input
              type="number"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
              placeholder="年"
              min={1900}
              max={new Date().getFullYear()}
              className="input-field w-24"
            />
            <span style={{ color: 'var(--color-text-muted)' }}>年</span>
            <input
              type="number"
              value={birthMonth}
              onChange={(e) => setBirthMonth(e.target.value)}
              placeholder="月"
              min={1}
              max={12}
              className="input-field w-16"
            />
            <span style={{ color: 'var(--color-text-muted)' }}>月</span>
            <input
              type="number"
              value={birthDay}
              onChange={(e) => setBirthDay(e.target.value)}
              placeholder="日"
              min={1}
              max={31}
              className="input-field w-16"
            />
            <span style={{ color: 'var(--color-text-muted)' }}>日</span>
          </div>
        </div>
        
        {result && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(44, 82, 130, 0.08)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>年齢</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {result.age}歳
              </div>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(213, 63, 140, 0.08)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>干支</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-accent)' }}>
                {result.eto.kanji}年
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {result.eto.reading}
              </div>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(44, 82, 130, 0.08)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>星座</div>
              <div className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                {result.zodiac.emoji}
              </div>
              <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                {result.zodiac.name}
              </div>
            </div>
            <div className="p-4 rounded-xl text-center" style={{ background: 'rgba(213, 63, 140, 0.08)' }}>
              <div className="text-xs mb-1" style={{ color: 'var(--color-text-muted)' }}>和暦</div>
              <div className="text-lg font-bold" style={{ color: 'var(--color-accent)' }}>
                {result.wareki}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 年齢早見表 */}
      <section>
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--color-text)' }}>
          年齢早見表（{new Date().getFullYear()}年版）
        </h2>
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: 'var(--color-border-light)' }}>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>西暦</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>和暦</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>年齢</th>
                  <th className="px-4 py-3 text-left font-medium" style={{ color: 'var(--color-text)' }}>干支</th>
                </tr>
              </thead>
              <tbody>
                {ageTable.slice(0, 60).map((row) => (
                  <tr key={row.year} className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <td className="px-4 py-2 font-medium" style={{ color: 'var(--color-text)' }}>{row.year}年</td>
                    <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>{row.wareki}</td>
                    <td className="px-4 py-2 font-medium" style={{ color: 'var(--color-primary)' }}>{row.age}歳</td>
                    <td className="px-4 py-2" style={{ color: 'var(--color-text-secondary)' }}>{row.eto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

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
          ← 学歴早見表
        </Link>
        <Link 
          href="/wareki" 
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all"
          style={{
            background: 'var(--color-card)',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)'
          }}
        >
          西暦・和暦変換 →
        </Link>
      </div>
    </main>
  );
}
