'use client';

import { useEffect } from 'react';
import { useAcademicHistory } from '@/hooks/useAcademicHistory';
import { InputForm } from '@/components/InputForm';
import { HistoryTimeline, ReverseResult } from '@/components/HistoryTimeline';
import { CopyButton } from '@/components/CopyButton';

export default function HomePage() {
  const {
    formState,
    result,
    isInitialized,
    updateField,
    setCalcMode,
    autoCalculate,
    getResumeText,
    getReverseResultText,
    saveToStorage,
    restoreFromStorage,
    showUniversityFields,
    showGraduateFields,
    showDelayFields,
    showHighschoolFields,
  } = useAcademicHistory();

  // 初期化時にLocalStorageから復元
  useEffect(() => {
    restoreFromStorage();
  }, [restoreFromStorage]);

  // フォーム変更時に保存
  useEffect(() => {
    if (isInitialized) {
      saveToStorage();
    }
  }, [formState, isInitialized, saveToStorage]);

  const reverseResultData = getReverseResultText();

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      {/* ヘッダー */}
      <header className="text-center mb-10">
        {/* 装飾アイコン */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            boxShadow: '0 4px 14px rgba(44, 82, 130, 0.25)'
          }}>
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
          style={{ color: 'var(--color-text)' }}>
          卒業年月日 早見表
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          生年月日から学歴年表を自動計算
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* 入力フォーム */}
        <div>
          <InputForm
            formState={formState}
            result={result}
            updateField={updateField}
            setCalcMode={setCalcMode}
            autoCalculate={autoCalculate}
            showUniversityFields={showUniversityFields}
            showGraduateFields={showGraduateFields}
            showDelayFields={showDelayFields}
            showHighschoolFields={showHighschoolFields}
          />

          {/* コピーボタン（順方向で結果があるとき） */}
          {result?.type === 'forward' && result.data && (
            <div className="mt-5">
              <CopyButton
                getText={getResumeText}
                label="履歴書形式でコピー"
                className="w-full justify-center"
              />
            </div>
          )}
        </div>

        {/* 結果表示 */}
        <div className="space-y-6">
          {/* 順方向の結果：タイムライン */}
          {result?.type === 'forward' && result.data && (
            <HistoryTimeline events={result.data.events} />
          )}

          {/* 逆算の結果 */}
          {result?.type === 'reverse' && reverseResultData && (
            <ReverseResult {...reverseResultData} />
          )}

          {/* 結果がない場合のプレースホルダー */}
          {!result && (
            <div className="card p-10 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-4"
                style={{
                  background: 'var(--color-border-light)',
                  color: 'var(--color-text-muted)'
                }}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p style={{ color: 'var(--color-text-secondary)' }}>
                {formState.calcMode === 'forward'
                  ? '生年月日を入力すると、学歴タイムラインが表示されます'
                  : '卒業年を入力すると、推定生年月日が表示されます'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* フッター */}
      <footer className="mt-14 pt-8 text-center text-sm border-t"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
        <p>
          ※ 日本の一般的な学制に基づいて計算しています。
        </p>
        <p className="mt-1.5">
          ※ 早生まれ（1月1日〜4月1日生まれ）を正しく考慮しています。
        </p>
      </footer>
    </main>
  );
}
