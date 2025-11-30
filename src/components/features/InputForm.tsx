'use client';

import { useEffect } from 'react';
import type { FormState, CalculationResult } from '@/hooks/useAcademicHistory';
import { UNIVERSITY_OPTIONS, DELAY_OPTIONS } from '@/lib/types';
import type { CalcMode, UniversityDuration, ReverseSchoolType, ResumeFormat } from '@/lib/types';

interface InputFormProps {
  formState: FormState;
  result: CalculationResult | null;
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void;
  setCalcMode: (mode: CalcMode) => void;
  autoCalculate: () => void;
  showUniversityFields: boolean;
  showGraduateFields: boolean;
  showDelayFields: boolean;
  showHighschoolFields: boolean;
}

export function InputForm({
  formState,
  result,
  updateField,
  setCalcMode,
  autoCalculate,
  showUniversityFields,
  showGraduateFields,
  showDelayFields,
  showHighschoolFields,
}: InputFormProps) {
  // フォーム変更時に自動計算
  useEffect(() => {
    const timer = setTimeout(() => {
      autoCalculate();
    }, 300);
    return () => clearTimeout(timer);
  }, [
    formState.birthYear,
    formState.birthMonth,
    formState.birthDay,
    formState.reverseYear,
    formState.reverseSchoolType,
    formState.universityDuration,
    formState.delayYears,
    formState.highschoolExtra,
    formState.universityExtra,
    formState.graduateExtra,
    autoCalculate,
  ]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="card p-6">
      <h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
        計算設定
      </h2>

      {/* 計算モード切替 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
          計算モード
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setCalcMode('forward')}
            className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
            style={{
              background: formState.calcMode === 'forward'
                ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                : 'var(--color-card)',
              color: formState.calcMode === 'forward' ? 'white' : 'var(--color-text-secondary)',
              border: formState.calcMode === 'forward' ? 'none' : '1px solid var(--color-border)',
              boxShadow: formState.calcMode === 'forward' ? '0 2px 8px rgba(44, 82, 130, 0.25)' : 'none'
            }}
          >
            生年月日 → 学歴
          </button>
          <button
            type="button"
            onClick={() => setCalcMode('reverse')}
            className="flex-1 py-2.5 px-4 rounded-lg font-medium transition-all"
            style={{
              background: formState.calcMode === 'reverse'
                ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                : 'var(--color-card)',
              color: formState.calcMode === 'reverse' ? 'white' : 'var(--color-text-secondary)',
              border: formState.calcMode === 'reverse' ? 'none' : '1px solid var(--color-border)',
              boxShadow: formState.calcMode === 'reverse' ? '0 2px 8px rgba(44, 82, 130, 0.25)' : 'none'
            }}
          >
            卒業年 → 生年月日
          </button>
        </div>
      </div>

      {/* 順方向入力 */}
      {formState.calcMode === 'forward' && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            生年月日
          </label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              placeholder="年"
              value={formState.birthYear}
              onChange={(e) => updateField('birthYear', e.target.value)}
              min={1950}
              max={currentYear}
              className="input-field w-24"
            />
            <span style={{ color: 'var(--color-text-muted)' }}>年</span>
            <input
              type="number"
              placeholder="月"
              value={formState.birthMonth}
              onChange={(e) => updateField('birthMonth', e.target.value)}
              min={1}
              max={12}
              className="input-field w-16"
            />
            <span style={{ color: 'var(--color-text-muted)' }}>月</span>
            <input
              type="number"
              placeholder="日"
              value={formState.birthDay}
              onChange={(e) => updateField('birthDay', e.target.value)}
              min={1}
              max={31}
              className="input-field w-16"
            />
            <span style={{ color: 'var(--color-text-muted)' }}>日</span>
          </div>
        </div>
      )}

      {/* 逆算入力 */}
      {formState.calcMode === 'reverse' && (
        <div className="mb-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              卒業年（西暦）
            </label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="例: 2025"
                value={formState.reverseYear}
                onChange={(e) => updateField('reverseYear', e.target.value)}
                min={1970}
                max={currentYear + 30}
                className="input-field w-28"
              />
              <span style={{ color: 'var(--color-text-muted)' }}>年 卒業</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
              学校種別
            </label>
            <select
              value={formState.reverseSchoolType}
              onChange={(e) => updateField('reverseSchoolType', e.target.value as ReverseSchoolType)}
              className="input-field"
            >
              <option value="junior">中学校</option>
              <option value="highschool">高等学校</option>
              <option value="university">大学・専門学校等</option>
            </select>
          </div>
        </div>
      )}

      {/* 大学種別 */}
      {(formState.calcMode === 'forward' || showUniversityFields) && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            大学等
          </label>
          <select
            value={formState.universityDuration}
            onChange={(e) => updateField('universityDuration', e.target.value as UniversityDuration)}
            className="input-field"
          >
            {UNIVERSITY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 浪人年数 */}
      {showDelayFields && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            浪人年数
          </label>
          <select
            value={formState.delayYears}
            onChange={(e) => updateField('delayYears', parseInt(e.target.value))}
            className="input-field"
          >
            {DELAY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* 留年・休学 */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3" style={{ color: 'var(--color-text-secondary)' }}>
          留年・休学
        </label>
        <div className="grid grid-cols-1 gap-3">
          {showHighschoolFields && (
            <div className="flex items-center gap-3">
              <span className="text-sm w-24" style={{ color: 'var(--color-text-muted)' }}>高校</span>
              <input
                type="number"
                value={formState.highschoolExtra}
                onChange={(e) => updateField('highschoolExtra', parseInt(e.target.value) || 0)}
                min={0}
                max={5}
                className="input-field w-16"
              />
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>年</span>
            </div>
          )}
          {showUniversityFields && (
            <div className="flex items-center gap-3">
              <span className="text-sm w-24" style={{ color: 'var(--color-text-muted)' }}>大学等</span>
              <input
                type="number"
                value={formState.universityExtra}
                onChange={(e) => updateField('universityExtra', parseInt(e.target.value) || 0)}
                min={0}
                max={5}
                className="input-field w-16"
              />
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>年</span>
            </div>
          )}
          {showGraduateFields && (
            <div className="flex items-center gap-3">
              <span className="text-sm w-24" style={{ color: 'var(--color-text-muted)' }}>大学院</span>
              <input
                type="number"
                value={formState.graduateExtra}
                onChange={(e) => updateField('graduateExtra', parseInt(e.target.value) || 0)}
                min={0}
                max={5}
                className="input-field w-16"
              />
              <span className="text-sm" style={{ color: 'var(--color-text-muted)' }}>年</span>
            </div>
          )}
        </div>
      </div>

      {/* 履歴書フォーマット（順方向のみ） */}
      {formState.calcMode === 'forward' && (
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
            履歴書フォーマット
          </label>
          <select
            value={formState.resumeFormat}
            onChange={(e) => updateField('resumeFormat', e.target.value as ResumeFormat)}
            className="input-field"
          >
            <option value="both">和暦と西暦</option>
            <option value="wareki">和暦のみ</option>
            <option value="seireki">西暦のみ</option>
          </select>
        </div>
      )}

      {/* エラー表示 */}
      {result?.error && (
        <div className="p-4 rounded-lg" style={{
          background: 'rgba(213, 63, 140, 0.1)',
          border: '1px solid var(--color-accent)',
          color: 'var(--color-accent)'
        }}>
          {result.error}
        </div>
      )}
    </div>
  );
}
