'use client';

import { useEffect } from 'react';
import { FooterAd, InArticleAd, RecommendedServices } from '@/components/ads';
import {
	AIResumeGenerator,
	Celebrities,
	FAQ,
	faqJsonLd,
	GenerationAruaru,
	HistoryTimeline,
	InfographicGenerator,
	InputForm,
	PDFButton,
	ReverseResult,
	ShareButton,
	ShareCard,
} from '@/components/features';
import { CopyButton } from '@/components/ui';
import { useAcademicHistory } from '@/hooks/useAcademicHistory';
import { useLocale } from '@/lib/i18n';

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
	}, [isInitialized, saveToStorage]);

	const reverseResultData = getReverseResultText();

	return (
		<main className="min-h-screen">
			{/* ヒーローセクション - Apple風 */}
			<section className="relative overflow-hidden" style={{ background: 'var(--color-bg)' }}>
				<div className="max-w-5xl mx-auto px-6 pt-20 pb-16 sm:pt-28 sm:pb-24 text-center">
					{/* メインタイトル - 超大型 */}
					<h1 className="hero-title animate-fade-up">
						{t.title}
					</h1>
					
					{/* サブタイトル */}
					<p className="hero-subtitle mt-6 max-w-2xl mx-auto animate-fade-up delay-100">
						{t.subtitle}
					</p>

					{/* CTAボタン */}
					<div className="flex flex-wrap justify-center gap-4 mt-10 animate-fade-up delay-200">
						<a href="#calculator" className="btn-primary">
							今すぐ計算する
						</a>
						<a href="#features" className="btn-secondary">
							詳しく見る
						</a>
					</div>

					{/* 信頼性バッジ - ミニマル */}
					<div className="flex flex-wrap justify-center gap-6 mt-12 animate-fade-up delay-300">
						{['完全無料', '登録不要', '即時計算', '西暦・和暦対応'].map((badge, i) => (
							<span
								key={badge}
								className="text-sm font-medium"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								{badge}
							</span>
						))}
					</div>
				</div>

				{/* 装飾グラデーション */}
				<div 
					className="absolute inset-0 pointer-events-none"
					style={{
						background: 'radial-gradient(ellipse 80% 50% at 50% -20%, var(--color-accent-pale), transparent)',
						opacity: 0.6,
					}}
				/>
			</section>

			{/* メイン計算セクション */}
			<section 
				id="calculator" 
				className="py-16 sm:py-24"
				style={{ background: 'var(--color-bg-secondary)' }}
			>
				<div className="max-w-6xl mx-auto px-6">
					{/* セクションヘッダー */}
					<div className="text-center mb-12">
						<h2 className="section-title">学歴を計算</h2>
						<p className="section-subtitle mt-3">
							生年月日を入力するだけで、すべての入学・卒業年度がわかります
						</p>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
						{/* 入力フォーム */}
						<div className="animate-fade-up">
							<div className="card p-8">
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

								{/* アクションボタン */}
								{result?.type === 'forward' && result.data && (
									<div className="mt-8 space-y-4">
										<CopyButton
											getText={getResumeText}
											label={t.copyResume}
											className="w-full justify-center"
										/>
										<div className="grid grid-cols-2 gap-3">
											<ShareButton getShareData={getShareData} />
											<PDFButton
												events={result.data.events}
												birthYear={parseInt(formState.birthYear, 10)}
												birthMonth={parseInt(formState.birthMonth, 10)}
												birthDay={parseInt(formState.birthDay, 10)}
											/>
										</div>
										<InfographicGenerator
											events={result.data.events}
											birthYear={parseInt(formState.birthYear, 10)}
											birthMonth={parseInt(formState.birthMonth, 10)}
											birthDay={parseInt(formState.birthDay, 10)}
										/>
									</div>
								)}
							</div>
						</div>

						{/* 結果表示 */}
						<div className="space-y-6 animate-fade-up delay-100">
							{result?.type === 'forward' && result.data && (
								<>
									<HistoryTimeline events={result.data.events} />
									<AIResumeGenerator
										events={result.data.events}
										birthYear={parseInt(formState.birthYear, 10)}
										birthMonth={parseInt(formState.birthMonth, 10)}
										birthDay={parseInt(formState.birthDay, 10)}
									/>
								</>
							)}

							{result?.type === 'reverse' && reverseResultData && (
								<ReverseResult {...reverseResultData} />
							)}

							{!result && (
								<div className="card p-12 text-center">
									<div
										className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5"
										style={{ background: 'var(--color-bg-secondary)' }}
									>
										<svg
											className="w-8 h-8"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											style={{ color: 'var(--color-text-muted)' }}
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={1.5}
												d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
											/>
										</svg>
									</div>
									<p className="text-lg" style={{ color: 'var(--color-text-secondary)' }}>
										{formState.calcMode === 'forward'
											? t.resultPlaceholder
											: t.reversePlaceholder}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			{/* 同い年の有名人 & あるある */}
			{result?.type === 'forward' && result.data && (
				<section className="py-16 sm:py-20" style={{ background: 'var(--color-bg)' }}>
					<div className="max-w-6xl mx-auto px-6 space-y-8">
						<Celebrities
							birthYear={parseInt(formState.birthYear, 10)}
							birthMonth={parseInt(formState.birthMonth, 10)}
							birthDay={parseInt(formState.birthDay, 10)}
						/>
						<InArticleAd slot="YOUR_AD_SLOT_1" />
						<GenerationAruaru birthYear={parseInt(formState.birthYear, 10)} />
						<ShareCard
							birthYear={parseInt(formState.birthYear, 10)}
							birthMonth={parseInt(formState.birthMonth, 10)}
							birthDay={parseInt(formState.birthDay, 10)}
						/>
					</div>
				</section>
			)}

			{/* 機能紹介セクション */}
			<section 
				id="features" 
				className="py-20 sm:py-28"
				style={{ background: 'var(--color-bg-secondary)' }}
			>
				<div className="max-w-6xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="section-title">こんな時に便利</h2>
						<p className="section-subtitle mt-3">
							履歴書作成から学歴確認まで、あらゆるシーンで活躍
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{[
							{
								icon: '📋',
								title: '履歴書・ES作成',
								desc: '就活や転職で学歴欄を記入する際に、入学・卒業年度をすぐに確認',
							},
							{
								icon: '🎓',
								title: '卒業年度の確認',
								desc: '「何年に大学を卒業したっけ？」そんな疑問をすぐに解決',
							},
							{
								icon: '👨‍👩‍👧',
								title: 'お子さんの入学時期',
								desc: '早生まれ・遅生まれも考慮して、正確な入学年度を計算',
							},
							{
								icon: '📅',
								title: '和暦・西暦の変換',
								desc: '令和・平成・昭和の和暦と西暦を相互に変換',
							},
						].map((feature, i) => (
							<div
								key={feature.title}
								className="card p-8 hover-lift"
								style={{ animationDelay: `${i * 0.1}s` }}
							>
								<span className="text-4xl mb-4 block">{feature.icon}</span>
								<h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--color-text)' }}>
									{feature.title}
								</h3>
								<p style={{ color: 'var(--color-text-secondary)' }}>
									{feature.desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* 関連ツール */}
			<section className="py-20 sm:py-28" style={{ background: 'var(--color-bg)' }}>
				<div className="max-w-6xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="section-title">{t.relatedTools}</h2>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
						{[
							{ href: '/quiz', icon: '🎯', title: t.quiz, desc: t.quizDescription, highlight: true },
							{ href: '/birth', icon: '📆', title: t.yearlyTable, desc: t.yearlyTableDesc },
							{ href: '/wareki', icon: '📅', title: t.warekiConverter, desc: t.warekiConverterDesc },
							{ href: '/age', icon: '🎂', title: t.ageTable, desc: t.ageTableDesc },
							{ href: '/recruiter', icon: '💼', title: t.recruiter, desc: t.recruiterDesc },
						].map((tool) => (
							<a
								key={tool.href}
								href={tool.href}
								className={`card p-6 hover-lift ${tool.highlight ? 'ring-2 ring-offset-2' : ''}`}
								style={tool.highlight ? { 
									borderColor: 'var(--color-accent)',
									boxShadow: '0 0 0 2px var(--color-accent-pale)',
								} : {}}
							>
								<span className="text-3xl mb-4 block">{tool.icon}</span>
								<h3 className="font-semibold mb-1" style={{ color: 'var(--color-text)' }}>
									{tool.title}
								</h3>
								<p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
									{tool.desc}
								</p>
							</a>
						))}
					</div>
				</div>
			</section>

			{/* FAQ */}
			<section className="py-16 sm:py-20" style={{ background: 'var(--color-bg-secondary)' }}>
				<div className="max-w-4xl mx-auto px-6">
					<FAQ />
				</div>
			</section>

			{/* おすすめサービス */}
			<section className="py-16" style={{ background: 'var(--color-bg)' }}>
				<div className="max-w-6xl mx-auto px-6">
					<RecommendedServices />
				</div>
			</section>

			<FooterAd slot="YOUR_AD_SLOT_2" />

			{/* SEOキーワード */}
			<section className="py-8" style={{ background: 'var(--color-bg-secondary)' }}>
				<div className="max-w-4xl mx-auto px-6 text-center">
					<div className="flex flex-wrap justify-center gap-3">
						{[
							'卒業年度計算',
							'入学年度計算',
							'学歴早見表',
							'履歴書学歴',
							'和暦西暦変換',
							'生年月日から卒業年',
							'令和平成昭和変換',
						].map((keyword) => (
							<span
								key={keyword}
								className="px-4 py-2 rounded-full text-sm"
								style={{ 
									background: 'var(--color-bg)',
									color: 'var(--color-text-muted)',
								}}
							>
								#{keyword}
							</span>
						))}
					</div>
				</div>
			</section>

			{/* JSON-LD */}
			<script
				type="application/ld+json"
				dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
			/>

			{/* フッター */}
			<footer 
				className="py-12"
				style={{ 
					background: 'var(--color-bg)',
					borderTop: '1px solid var(--color-border)',
				}}
			>
				<div className="max-w-6xl mx-auto px-6">
					{/* ナビゲーション */}
					<nav className="flex flex-wrap justify-center gap-6 mb-8">
						{[
							{ href: '/wareki', label: '和暦西暦変換' },
							{ href: '/age', label: '年齢計算' },
							{ href: '/birth', label: '生年月日一覧' },
							{ href: '/quiz', label: 'クイズ' },
							{ href: '/privacy', label: 'プライバシーポリシー' },
						].map((link) => (
							<a
								key={link.href}
								href={link.href}
								className="text-sm link-arrow"
								style={{ color: 'var(--color-accent)' }}
							>
								{link.label}
							</a>
						))}
					</nav>

					{/* 注意書き */}
					<div className="text-center space-y-2 mb-8">
						<p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
							{t.footerNote1}
						</p>
						<p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
							{t.footerNote2}
						</p>
					</div>

					{/* コピーライト */}
					<p 
						className="text-center text-xs"
						style={{ color: 'var(--color-text-muted)' }}
					>
						© {new Date().getFullYear()} 学歴早見表 - 入学・卒業年度自動計算ツール
					</p>
				</div>
			</footer>
		</main>
	);
}
