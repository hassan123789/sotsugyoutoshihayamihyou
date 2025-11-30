'use client';

import { useEffect } from 'react';
import { useAcademicHistory } from '@/hooks/useAcademicHistory';
import { useLocale } from '@/lib/i18n';
import { CopyButton } from '@/components/ui';
import {
  InputForm,
  HistoryTimeline,
  ReverseResult,
  ShareButton,
  FAQ,
  faqJsonLd,
  Celebrities,
  PDFButton,
  AIResumeGenerator,
  GenerationAruaru,
  ShareCard,
  InfographicGenerator,
} from '@/components/features';
import { InArticleAd, FooterAd } from '@/components/ads';

export default function HomePage() {
  const { t } = useLocale();
  const {
    formState,
    result,
    isInitialized,
    updateField,
    setCalcMode,
    autoCalculate,
    getResumeText,
    getReverseResultText,
    getShareData,
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
          {t.title}
        </h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>
          {t.subtitle}
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
            <div className="mt-5 space-y-3">
              <CopyButton
                getText={getResumeText}
                label={t.copyResume}
                className="w-full justify-center"
              />
              <ShareButton getShareData={getShareData} />
              <PDFButton 
                events={result.data.events}
                birthYear={parseInt(formState.birthYear)}
                birthMonth={parseInt(formState.birthMonth)}
                birthDay={parseInt(formState.birthDay)}
              />
              <InfographicGenerator
                events={result.data.events}
                birthYear={parseInt(formState.birthYear)}
                birthMonth={parseInt(formState.birthMonth)}
                birthDay={parseInt(formState.birthDay)}
              />
            </div>
          )}
        </div>

        {/* 結果表示 */}
        <div className="space-y-6">
          {/* 順方向の結果：タイムライン */}
          {result?.type === 'forward' && result.data && (
            <>
              <HistoryTimeline events={result.data.events} />
              
              {/* AI履歴書生成 */}
              <AIResumeGenerator
                events={result.data.events}
                birthYear={parseInt(formState.birthYear)}
                birthMonth={parseInt(formState.birthMonth)}
                birthDay={parseInt(formState.birthDay)}
              />
              
              {/* 同い年の有名人 */}
              <Celebrities 
                birthYear={parseInt(formState.birthYear)}
                birthMonth={parseInt(formState.birthMonth)}
                birthDay={parseInt(formState.birthDay)}
              />
              
              {/* 記事内広告 */}
              <InArticleAd slot="YOUR_AD_SLOT_1" />
              
              {/* 学年あるある */}
              <GenerationAruaru birthYear={parseInt(formState.birthYear)} />
              
              {/* 同い年診断シェアカード */}
              <ShareCard 
                birthYear={parseInt(formState.birthYear)}
                birthMonth={parseInt(formState.birthMonth)}
                birthDay={parseInt(formState.birthDay)}
              />
            </>
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
                  ? t.resultPlaceholder
                  : t.reversePlaceholder}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <FAQ />

      {/* フッター広告 */}
      <FooterAd slot="YOUR_AD_SLOT_2" />

      {/* 関連ツール */}
      <section className="mt-10">
        <h2 className="text-lg font-bold mb-4 text-center" style={{ color: 'var(--color-text)' }}>
          {t.relatedTools}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 世代診断クイズ（目立つ位置） */}
          <a 
            href="/quiz" 
            className="card p-4 flex items-center gap-4 transition-all hover:translate-y-[-2px] sm:col-span-2 lg:col-span-1 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-200 dark:border-purple-800"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white"
            >
              🎯
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                {t.quiz}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {t.quizDescription}
              </div>
            </div>
          </a>
          <a 
            href="/birth" 
            className="card p-4 flex items-center gap-4 transition-all hover:translate-y-[-2px]"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(44, 82, 130, 0.1)', color: 'var(--color-primary)' }}
            >
              📆
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                {t.yearlyTable}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {t.yearlyTableDesc}
              </div>
            </div>
          </a>
          <a 
            href="/wareki" 
            className="card p-4 flex items-center gap-4 transition-all hover:translate-y-[-2px]"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(44, 82, 130, 0.1)', color: 'var(--color-primary)' }}
            >
              📅
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                {t.warekiConverter}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {t.warekiConverterDesc}
              </div>
            </div>
          </a>
          <a 
            href="/age" 
            className="card p-4 flex items-center gap-4 transition-all hover:translate-y-[-2px]"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(213, 63, 140, 0.1)', color: 'var(--color-accent)' }}
            >
              🎂
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                {t.ageTable}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {t.ageTableDesc}
              </div>
            </div>
          </a>
          <a 
            href="/recruiter" 
            className="card p-4 flex items-center gap-4 transition-all hover:translate-y-[-2px]"
          >
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
              style={{ background: 'rgba(56, 178, 172, 0.1)', color: '#38B2AC' }}
            >
              💼
            </div>
            <div>
              <div className="font-medium" style={{ color: 'var(--color-text)' }}>
                {t.recruiter}
              </div>
              <div className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                {t.recruiterDesc}
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* FAQ用JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* フッター */}
      <footer className="mt-14 pt-8 text-center text-sm border-t"
        style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
        <p>
          {t.footerNote1}
        </p>
        <p className="mt-1.5">
          {t.footerNote2}
        </p>
      </footer>
    </main>
  );
}
