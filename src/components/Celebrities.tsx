'use client';

import { useMemo } from 'react';
import { getCelebritiesByAcademicYear, type Celebrity } from '@/data/celebrities';

interface CelebritiesProps {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
}

export function Celebrities({ birthYear, birthMonth, birthDay }: CelebritiesProps) {
  const celebrities = useMemo(() => {
    // NaNチェック
    if (isNaN(birthYear) || isNaN(birthMonth) || isNaN(birthDay)) {
      return [];
    }
    return getCelebritiesByAcademicYear(birthYear, birthMonth, birthDay, 6);
  }, [birthYear, birthMonth, birthDay]);

  if (celebrities.length === 0) {
    return null;
  }

  return (
    <div className="card p-6">
      <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--color-text)' }}>
        🎭 同い年の有名人
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {celebrities.map((celeb, index) => (
          <CelebrityCard key={`${celeb.name}-${index}`} celebrity={celeb} />
        ))}
      </div>
      
      <p className="text-xs mt-4 text-center" style={{ color: 'var(--color-text-muted)' }}>
        ※ 同じ学年（4月2日〜翌年4月1日生まれ）の有名人を表示
      </p>
    </div>
  );
}

function CelebrityCard({ celebrity }: { celebrity: Celebrity }) {
  const birthInfo = celebrity.birthMonth && celebrity.birthDay
    ? `${celebrity.birthYear}年${celebrity.birthMonth}月${celebrity.birthDay}日`
    : `${celebrity.birthYear}年`;

  return (
    <div 
      className="flex items-center gap-3 p-3 rounded-lg transition-all hover:translate-x-1"
      style={{ 
        background: 'rgba(44, 82, 130, 0.04)',
        border: '1px solid var(--color-border-light)'
      }}
    >
      <div 
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg"
        style={{ 
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
          color: 'white'
        }}
      >
        {celebrity.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-medium truncate" style={{ color: 'var(--color-text)' }}>
          {celebrity.name}
        </div>
        <div className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
          {celebrity.profession}
        </div>
        <div className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {birthInfo}
        </div>
      </div>
    </div>
  );
}
