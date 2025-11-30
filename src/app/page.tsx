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
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* ヘッダー */}
      <header className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          🎓 卒業年月日 早見表
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          生年月日から学歴年表を自動計算
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            <div className="mt-4">
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
            <div className="card p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-600 dark:text-gray-400">
                {formState.calcMode === 'forward'
                  ? '生年月日を入力すると、学歴タイムラインが表示されます'
                  : '卒業年を入力すると、推定生年月日が表示されます'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* フッター */}
      <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
        <p>
          ※ 日本の一般的な学制に基づいて計算しています。
        </p>
        <p className="mt-1">
          ※ 早生まれ（1月1日〜4月1日生まれ）を正しく考慮しています。
        </p>
      </footer>
    </main>
  );
}
