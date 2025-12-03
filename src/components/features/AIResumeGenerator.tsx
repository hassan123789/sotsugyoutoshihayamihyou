'use client';

import { useState } from 'react';
import { toWareki } from '@/lib/academic';
import type { AcademicEvent } from '@/lib/types';

interface AIResumeGeneratorProps {
	events: AcademicEvent[];
	birthYear: number;
	birthMonth: number;
	birthDay: number;
}

// 履歴書形式で生成（シンプル版）
function generateResumeText(
	events: AcademicEvent[],
	_birthYear: number,
	_birthMonth: number,
	_birthDay: number
): string {
	const lines: string[] = [];

	lines.push('【学歴】');
	lines.push('');

	events.forEach((event) => {
		const wareki = toWareki(event.year, event.month);
		const monthStr = event.month.toString().padStart(2, ' ');
		lines.push(`${wareki}${monthStr}月\t${event.event}`);
	});

	lines.push('');
	lines.push('以上');

	return lines.join('\n');
}

// より詳細な履歴書形式
function generateDetailedResume(
	events: AcademicEvent[],
	birthYear: number,
	birthMonth: number,
	birthDay: number
): string {
	const lines: string[] = [];
	const wareki = toWareki(birthYear, birthMonth);

	lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	lines.push('【履歴書 - 学歴欄】');
	lines.push('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
	lines.push('');
	lines.push(`生年月日：${birthYear}年${birthMonth}月${birthDay}日（${wareki}）`);
	lines.push('');
	lines.push('─────────────────────────────');
	lines.push('');

	events.forEach((event) => {
		const eventWareki = toWareki(event.year, event.month);
		const monthStr = event.month.toString().padStart(2, ' ');
		lines.push(`${event.year}年（${eventWareki}）${monthStr}月`);
		lines.push(`　　${event.event}`);
		lines.push('');
	});

	lines.push('─────────────────────────────');
	lines.push('');
	lines.push('※ 本データは学歴早見表にて自動生成されました');
	lines.push('※ 実際の履歴書作成時は、正式な学校名に修正してください');

	return lines.join('\n');
}

export function AIResumeGenerator({
	events,
	birthYear,
	birthMonth,
	birthDay,
}: AIResumeGeneratorProps) {
	const [resume, setResume] = useState<string | null>(null);
	const [copied, setCopied] = useState(false);
	const [format, setFormat] = useState<'simple' | 'detailed'>('simple');

	const generateResume = () => {
		const text =
			format === 'simple'
				? generateResumeText(events, birthYear, birthMonth, birthDay)
				: generateDetailedResume(events, birthYear, birthMonth, birthDay);
		setResume(text);
	};

	const copyToClipboard = async () => {
		if (!resume) return;

		try {
			await navigator.clipboard.writeText(resume);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (err) {
			console.error('Copy failed:', err);
		}
	};

	return (
		<div className="card p-6">
			<h3
				className="text-lg font-bold mb-4 flex items-center gap-2"
				style={{ color: 'var(--color-text)' }}
			>
				<span className="text-xl">📝</span>
				履歴書形式で出力
			</h3>

			{!resume ? (
				<div>
					<p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
						学歴データを履歴書に適した形式で自動生成します。
					</p>

					{/* フォーマット選択 */}
					<div className="flex gap-2 mb-4">
						<button
							onClick={() => setFormat('simple')}
							className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all"
							style={{
								background: format === 'simple' ? 'var(--color-primary)' : 'var(--color-card)',
								color: format === 'simple' ? 'white' : 'var(--color-text-secondary)',
								border: '1px solid var(--color-border)',
							}}
						>
							シンプル
						</button>
						<button
							onClick={() => setFormat('detailed')}
							className="flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all"
							style={{
								background: format === 'detailed' ? 'var(--color-primary)' : 'var(--color-card)',
								color: format === 'detailed' ? 'white' : 'var(--color-text-secondary)',
								border: '1px solid var(--color-border)',
							}}
						>
							詳細
						</button>
					</div>

					<button
						onClick={generateResume}
						className="w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
						style={{
							background:
								'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
							color: 'white',
						}}
					>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						履歴書形式で生成
					</button>
				</div>
			) : (
				<div>
					<div
						className="p-4 rounded-lg mb-4 font-mono text-sm whitespace-pre-wrap"
						style={{
							background: 'var(--color-border-light)',
							color: 'var(--color-text)',
							maxHeight: '300px',
							overflowY: 'auto',
						}}
					>
						{resume}
					</div>

					<div className="flex gap-3">
						<button
							onClick={copyToClipboard}
							className="flex-1 px-4 py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
							style={{
								background: copied ? 'var(--color-success, #38a169)' : 'var(--color-primary)',
								color: 'white',
							}}
						>
							{copied ? (
								<>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M5 13l4 4L19 7"
										/>
									</svg>
									コピーしました
								</>
							) : (
								<>
									<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
										/>
									</svg>
									コピー
								</>
							)}
						</button>

						<button
							onClick={() => setResume(null)}
							className="px-4 py-2 rounded-lg font-medium transition-all"
							style={{
								background: 'var(--color-card)',
								color: 'var(--color-text-secondary)',
								border: '1px solid var(--color-border)',
							}}
						>
							やり直す
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
