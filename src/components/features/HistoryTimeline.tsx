'use client';

import { toWareki } from '@/lib/academic';
import { useLocale } from '@/lib/i18n';
import { getNostalgia } from '@/lib/nostalgia';
import type { AcademicEvent } from '@/lib/types';

interface HistoryTimelineProps {
	events: AcademicEvent[];
}

export function HistoryTimeline({ events }: HistoryTimelineProps) {
	const { t } = useLocale();

	if (events.length === 0) {
		return null;
	}

	return (
		<div className="card p-6">
			<h2
				className="text-xl font-bold mb-6"
				style={{ color: 'var(--color-text)' }}
			>
				{t.timeline}
			</h2>

			<div className="relative">
				{/* タイムラインの縦線 */}
				<div
					className="absolute left-3 top-2 bottom-2 w-0.5"
					style={{
						background:
							'linear-gradient(180deg, var(--color-primary) 0%, var(--color-accent) 100%)',
					}}
				/>

				<div className="space-y-5">
					{events.map((item, index) => {
						const nostalgia = getNostalgia(item.year);
						const isLast = index === events.length - 1;

						return (
							<div
								key={`${item.year}-${item.event}-${index}`}
								className="relative pl-10 animate-slide-in"
								style={{ animationDelay: `${index * 80}ms` }}
							>
								{/* タイムラインのドット */}
								<div
									className="absolute left-1.5 w-4 h-4 rounded-full border-2"
									style={{
										borderColor: isLast
											? 'var(--color-accent)'
											: 'var(--color-primary)',
										background: isLast
											? 'var(--color-accent)'
											: 'var(--color-card)',
									}}
								/>

								{/* カード */}
								<div
									className="rounded-xl p-4 transition-all hover:translate-x-1"
									style={{
										background: isLast
											? 'var(--color-accent-pale)'
											: 'var(--color-card)',
										border: isLast
											? '1px solid var(--color-accent)'
											: '1px solid var(--color-border)',
									}}
								>
									{/* 年度ヘッダー */}
									<div className="flex items-center justify-between mb-2">
										<div>
											<div
												className="font-bold"
												style={{ color: 'var(--color-text)' }}
											>
												{item.year}年（{toWareki(item.year, item.month)}）
												{item.month}月
											</div>
										</div>
										{isLast && (
											<span
												className="px-2.5 py-0.5 text-xs font-medium rounded-full"
												style={{
													background: 'var(--color-accent)',
													color: 'white',
												}}
											>
												{t.latest}
											</span>
										)}
									</div>

									{/* イベント */}
									<div
										className="font-medium mb-1"
										style={{ color: 'var(--color-text-secondary)' }}
									>
										{item.event}
									</div>

									{/* 年齢 */}
									<div
										className="text-sm mb-3"
										style={{ color: 'var(--color-text-muted)' }}
									>
										{item.age}
										{t.ageUnit}
										{item.isEarlyBorn && (
											<span
												className="ml-2 px-2 py-0.5 text-xs rounded-full"
												style={{
													background: 'var(--color-accent-pale)',
													color: 'var(--color-primary)',
												}}
											>
												{t.earlyBorn}
											</span>
										)}
									</div>

									{/* ノスタルジア */}
									{nostalgia && (
										<div
											className="mt-3 pt-3 border-t"
											style={{ borderColor: 'var(--color-border)' }}
										>
											<div
												className="text-xs font-medium mb-2"
												style={{ color: 'var(--color-accent)' }}
											>
												この年の出来事
											</div>
											<div className="space-y-1.5 text-xs">
												{nostalgia.hit && (
													<div className="flex items-start gap-2">
														<span style={{ color: 'var(--color-accent)' }}>
															♪
														</span>
														<span style={{ color: 'var(--color-text-muted)' }}>
															{nostalgia.hit}
														</span>
													</div>
												)}
												{nostalgia.culture && (
													<div className="flex items-start gap-2">
														<span style={{ color: 'var(--color-primary)' }}>
															◆
														</span>
														<span style={{ color: 'var(--color-text-muted)' }}>
															{nostalgia.culture}
														</span>
													</div>
												)}
												{nostalgia.news && (
													<div className="flex items-start gap-2">
														<span style={{ color: 'var(--color-info)' }}>
															●
														</span>
														<span style={{ color: 'var(--color-text-muted)' }}>
															{nostalgia.news}
														</span>
													</div>
												)}
											</div>
										</div>
									)}
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

interface ReverseResultProps {
	graduationYear: number;
	schoolLabel: string;
	earliest: number;
	latest: number;
	earliestWareki: string;
	latestWareki: string;
	delayYears: number;
	hasExtraYears: boolean;
}

export function ReverseResult({
	graduationYear,
	schoolLabel,
	earliest,
	latest,
	earliestWareki,
	latestWareki,
	delayYears,
	hasExtraYears,
}: ReverseResultProps) {
	return (
		<div className="card p-6">
			<h2
				className="text-xl font-bold mb-6"
				style={{ color: 'var(--color-text)' }}
			>
				逆算結果
			</h2>

			<div
				className="rounded-xl p-6"
				style={{
					background: 'var(--color-accent-pale)',
					border: '1px solid var(--color-border)',
				}}
			>
				<div className="text-center mb-5">
					<div style={{ color: 'var(--color-text-secondary)' }}>
						{graduationYear}年に{schoolLabel}を卒業した場合
					</div>
				</div>

				<div className="flex justify-center items-center gap-6 flex-wrap">
					<div className="text-center">
						<div
							className="text-sm mb-1"
							style={{ color: 'var(--color-text-muted)' }}
						>
							遅生まれ（4/2〜12/31）
						</div>
						<div
							className="text-2xl font-bold"
							style={{ color: 'var(--color-primary)' }}
						>
							{earliest}年
						</div>
						<div
							className="text-sm"
							style={{ color: 'var(--color-text-muted)' }}
						>
							（{earliestWareki}）
						</div>
					</div>

					<div
						className="text-2xl"
						style={{ color: 'var(--color-text-muted)' }}
					>
						〜
					</div>

					<div className="text-center">
						<div
							className="text-sm mb-1"
							style={{ color: 'var(--color-text-muted)' }}
						>
							早生まれ（1/1〜4/1）
						</div>
						<div
							className="text-2xl font-bold"
							style={{ color: 'var(--color-accent)' }}
						>
							{latest}年
						</div>
						<div
							className="text-sm"
							style={{ color: 'var(--color-text-muted)' }}
						>
							（{latestWareki}）
						</div>
					</div>
				</div>

				{(delayYears > 0 || hasExtraYears) && (
					<div
						className="mt-5 pt-4 border-t text-center text-sm"
						style={{
							borderColor: 'var(--color-border)',
							color: 'var(--color-text-muted)',
						}}
					>
						※ 浪人・留年・休学を考慮した場合の生年です
					</div>
				)}
			</div>
		</div>
	);
}
