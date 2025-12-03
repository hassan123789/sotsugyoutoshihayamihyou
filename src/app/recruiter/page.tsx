'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { toWareki } from '@/lib/academic';
import { useLocale } from '@/lib/i18n';

interface EstimatedBirth {
	earliest: { year: number; month: number; day: number };
	latest: { year: number; month: number; day: number };
}

export default function RecruiterPage() {
	const { t } = useLocale();
	const currentYear = new Date().getFullYear();

	const [graduationYear, setGraduationYear] = useState(currentYear);
	const [graduationMonth, setGraduationMonth] = useState(3);
	const [schoolType, setSchoolType] = useState<
		'university4' | 'university6' | 'master' | 'highschool' | 'junior'
	>('university4');

	// 生年月日を逆算
	const estimatedBirth = useMemo((): EstimatedBirth | null => {
		// 学校種別ごとの入学からの年数
		const schoolYears: Record<string, number> = {
			junior: 9, // 小6 + 中3
			highschool: 12, // 小6 + 中3 + 高3
			university4: 16, // 小6 + 中3 + 高3 + 大4
			university6: 18, // 小6 + 中3 + 高3 + 大6（医学部等）
			master: 18, // 小6 + 中3 + 高3 + 大4 + 修士2
		};

		const years = schoolYears[schoolType];
		if (!years) return null;

		// 卒業年月から入学年を逆算
		const entranceYear = graduationYear - years;

		// 小学校入学年 = 誕生年 + 6（早生まれ）or + 7（通常）
		// 入学年 = 誕生年 + 6 or 7
		// 誕生年 = 入学年 - 6 or -7

		return {
			earliest: {
				year: entranceYear - 7,
				month: 4,
				day: 2,
			},
			latest: {
				year: entranceYear - 6,
				month: 4,
				day: 1,
			},
		};
	}, [graduationYear, schoolType]);

	// 現在の年齢を計算
	const calculateAge = (birthYear: number, birthMonth: number, birthDay: number): number => {
		const today = new Date();
		const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
			age--;
		}
		return age;
	};

	// 年度ごとの卒業生早見表
	const graduationTable = useMemo(() => {
		const table = [];
		for (let year = currentYear + 2; year >= currentYear - 10; year--) {
			const entranceYear = year - 16; // 大学4年制の場合
			const birthYearEarly = entranceYear - 6; // 早生まれ
			const birthYearNormal = entranceYear - 7; // 通常

			table.push({
				graduationYear: year,
				birthYearRange: `${birthYearNormal}年4月2日〜${birthYearEarly}年4月1日`,
				currentAge: calculateAge(birthYearNormal, 4, 2),
				fiscalYear: `${year}年度卒（${year}年3月卒業）`,
			});
		}
		return table;
	}, [currentYear, calculateAge]);

	return (
		<main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
			{/* ヘッダー */}
			<header className="text-center mb-10">
				<div
					className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
					style={{
						background:
							'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
						boxShadow: '0 4px 14px var(--color-shadow)',
					}}
				>
					<svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</div>
				<h1
					className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
					style={{ color: 'var(--color-text)' }}
				>
					{t.recruiterTitle}
				</h1>
				<p style={{ color: 'var(--color-text-secondary)' }}>{t.recruiterDescription}</p>
			</header>

			<div className="grid gap-8 lg:grid-cols-2">
				{/* 逆算ツール */}
				<div className="card p-6">
					<h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
						🔍 {t.reverseCalc}
					</h2>

					<div className="space-y-4">
						{/* 卒業年入力 */}
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								{t.graduationYear}
							</label>
							<div className="flex gap-2">
								<input
									type="number"
									value={graduationYear}
									onChange={(e) => setGraduationYear(parseInt(e.target.value, 10) || currentYear)}
									className="input-field flex-1"
									min={1950}
									max={2100}
								/>
								<span
									className="flex items-center px-3"
									style={{ color: 'var(--color-text-secondary)' }}
								>
									年
								</span>
								<select
									value={graduationMonth}
									onChange={(e) => setGraduationMonth(parseInt(e.target.value, 10))}
									className="input-field w-24"
								>
									<option value={3}>3月</option>
									<option value={9}>9月</option>
								</select>
							</div>
						</div>

						{/* 学校種別 */}
						<div>
							<label
								className="block text-sm font-medium mb-2"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								最終学歴
							</label>
							<select
								value={schoolType}
								onChange={(e) => setSchoolType(e.target.value as typeof schoolType)}
								className="input-field w-full"
							>
								<option value="university4">大学卒（4年制）</option>
								<option value="university6">大学卒（6年制・医学部等）</option>
								<option value="master">大学院修士卒</option>
								<option value="highschool">高校卒</option>
								<option value="junior">中学卒</option>
							</select>
						</div>
					</div>

					{/* 結果表示 */}
					{estimatedBirth && (
						<div
							className="mt-6 p-4 rounded-xl"
							style={{
								background: 'var(--color-accent-pale)',
								border: '1px solid var(--color-border)',
							}}
						>
							<h3 className="font-bold mb-3" style={{ color: 'var(--color-text)' }}>
								📅 {t.estimatedBirthYear}
							</h3>
							<div className="space-y-2">
								<div className="flex justify-between">
									<span style={{ color: 'var(--color-text-secondary)' }}>{t.earlyBornCase}:</span>
									<span className="font-medium" style={{ color: 'var(--color-text)' }}>
										{estimatedBirth.latest.year}
										{t.years}
										{estimatedBirth.latest.month}
										{t.months}
										{estimatedBirth.latest.day}
										{t.days}まで
										<span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
											({toWareki(estimatedBirth.latest.year, estimatedBirth.latest.month)}
											年)
										</span>
									</span>
								</div>
								<div className="flex justify-between">
									<span style={{ color: 'var(--color-text-secondary)' }}>{t.normalCase}:</span>
									<span className="font-medium" style={{ color: 'var(--color-text)' }}>
										{estimatedBirth.earliest.year}
										{t.years}
										{estimatedBirth.earliest.month}
										{t.months}
										{estimatedBirth.earliest.day}
										{t.days}以降
										<span className="ml-2 text-sm" style={{ color: 'var(--color-text-muted)' }}>
											({toWareki(estimatedBirth.earliest.year, estimatedBirth.earliest.month)}
											年)
										</span>
									</span>
								</div>
								<hr className="my-3" style={{ borderColor: 'var(--color-border)' }} />
								<div className="flex justify-between">
									<span style={{ color: 'var(--color-text-secondary)' }}>{t.currentAge}:</span>
									<span className="font-bold text-lg" style={{ color: 'var(--color-primary)' }}>
										{calculateAge(estimatedBirth.earliest.year, 4, 2)}〜
										{calculateAge(estimatedBirth.latest.year, 4, 1)}
										{t.ageUnit}
									</span>
								</div>
							</div>
						</div>
					)}
				</div>

				{/* 便利機能 */}
				<div className="card p-6">
					<h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
						💼 {t.usefulFeatures}
					</h2>

					<div className="space-y-4">
						{/* 年齢制限チェッカー */}
						<div
							className="p-4 rounded-xl"
							style={{
								background: 'var(--color-card)',
								border: '1px solid var(--color-border)',
							}}
						>
							<h3 className="font-bold mb-2" style={{ color: 'var(--color-text)' }}>
								⚠️ {t.ageRestrictionNote}
							</h3>
							<ul className="space-y-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
								<li>• {t.ageRestrictionNote}</li>
							</ul>
						</div>

						{/* 早生まれ解説 */}
						<div
							className="p-4 rounded-xl"
							style={{
								background: 'var(--color-card)',
								border: '1px solid var(--color-border)',
							}}
						>
							<h3 className="font-bold mb-2" style={{ color: 'var(--color-text)' }}>
								🎂 {t.earlyBornExplanation}
							</h3>
							<p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
								{t.earlyBornExplanationDetail}
							</p>
						</div>

						{/* リンク */}
						<Link
							href="/"
							className="block text-center px-4 py-3 rounded-xl font-medium transition-all"
							style={{
								background: 'var(--color-primary)',
								color: 'white',
							}}
						>
							{t.useDetailedTool} →
						</Link>
					</div>
				</div>
			</div>

			{/* 卒業年度早見表 */}
			<div className="card p-6 mt-8">
				<h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
					📋 {t.graduationTable}
				</h2>

				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr style={{ borderBottom: '2px solid var(--color-border)' }}>
								<th
									className="py-3 px-4 text-left"
									style={{ color: 'var(--color-text-secondary)' }}
								>
									{t.fiscalYear}
								</th>
								<th
									className="py-3 px-4 text-left"
									style={{ color: 'var(--color-text-secondary)' }}
								>
									{t.birthYearRange}
								</th>
								<th
									className="py-3 px-4 text-right"
									style={{ color: 'var(--color-text-secondary)' }}
								>
									{t.currentAge}
								</th>
							</tr>
						</thead>
						<tbody>
							{graduationTable.map((row, index) => (
								<tr
									key={row.graduationYear}
									style={{
										borderBottom: '1px solid var(--color-border)',
										background:
											row.graduationYear === currentYear
												? 'var(--color-accent-pale)'
												: index % 2 === 0
													? 'transparent'
													: 'var(--color-card)',
									}}
								>
									<td className="py-3 px-4 font-medium" style={{ color: 'var(--color-text)' }}>
										{row.fiscalYear}
										{row.graduationYear === currentYear && (
											<span
												className="ml-2 px-2 py-0.5 text-xs rounded-full"
												style={{
													background: 'var(--color-primary)',
													color: 'white',
												}}
											>
												{t.thisYear}
											</span>
										)}
										{row.graduationYear === currentYear + 1 && (
											<span
												className="ml-2 px-2 py-0.5 text-xs rounded-full"
												style={{
													background: 'var(--color-accent)',
													color: 'white',
												}}
											>
												{t.nextYear}
											</span>
										)}
									</td>
									<td className="py-3 px-4" style={{ color: 'var(--color-text-secondary)' }}>
										{row.birthYearRange}
									</td>
									<td
										className="py-3 px-4 text-right font-medium"
										style={{ color: 'var(--color-primary)' }}
									>
										{row.currentAge}〜{row.currentAge + 1}
										{t.ageUnit}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<p className="mt-4 text-sm" style={{ color: 'var(--color-text-muted)' }}>
					{t.ageNote}
				</p>
			</div>

			{/* FAQ */}
			<div className="card p-6 mt-8">
				<h2 className="text-xl font-bold mb-6" style={{ color: 'var(--color-text)' }}>
					❓ よくある質問
				</h2>

				<div className="space-y-4">
					<details className="group">
						<summary
							className="cursor-pointer py-3 font-medium flex justify-between items-center"
							style={{ color: 'var(--color-text)' }}
						>
							卒業年と入社年が違う場合は？
							<span className="ml-2 transition-transform group-open:rotate-180">▼</span>
						</summary>
						<p className="pb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
							浪人・留年・ギャップイヤーなどにより、標準的な卒業年と異なる場合があります。
							正確な生年月日は履歴書や本人確認書類でご確認ください。
						</p>
					</details>

					<details className="group">
						<summary
							className="cursor-pointer py-3 font-medium flex justify-between items-center"
							style={{ color: 'var(--color-text)' }}
						>
							秋入学・秋卒業の場合は？
							<span className="ml-2 transition-transform group-open:rotate-180">▼</span>
						</summary>
						<p className="pb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
							一部の大学や海外留学者は9月入学・卒業の場合があります。
							その場合は半年ずれるため、卒業月を「9月」に変更して計算してください。
						</p>
					</details>

					<details className="group">
						<summary
							className="cursor-pointer py-3 font-medium flex justify-between items-center"
							style={{ color: 'var(--color-text)' }}
						>
							中途採用の年齢確認で使えますか？
							<span className="ml-2 transition-transform group-open:rotate-180">▼</span>
						</summary>
						<p className="pb-4 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
							はい、中途採用でも卒業年がわかれば年齢の目安を確認できます。
							ただし、転職回数や職歴によって経験年数は変わりますのでご注意ください。
						</p>
					</details>
				</div>
			</div>

			{/* 戻るリンク */}
			<div className="mt-8 text-center">
				<Link
					href="/"
					className="inline-flex items-center gap-2 text-sm font-medium transition-colors"
					style={{ color: 'var(--color-primary)' }}
				>
					<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M10 19l-7-7m0 0l7-7m-7 7h18"
						/>
					</svg>
					{t.backToTop}
				</Link>
			</div>
		</main>
	);
}
