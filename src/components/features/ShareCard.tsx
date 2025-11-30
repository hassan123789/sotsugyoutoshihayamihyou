'use client';

import { useCallback, useRef, useState } from 'react';
import { getCelebritiesByAcademicYear } from '@/data/celebrities';
import { toWareki } from '@/lib/academic';
import { useLocale } from '@/lib/i18n/LocaleContext';

interface ShareCardProps {
	birthYear: number;
	birthMonth: number;
	birthDay: number;
}

// 干支計算
const ETOS = [
	'子',
	'丑',
	'寅',
	'卯',
	'辰',
	'巳',
	'午',
	'未',
	'申',
	'酉',
	'戌',
	'亥',
];
const ETO_ANIMALS = [
	'🐭',
	'🐮',
	'🐯',
	'🐰',
	'🐲',
	'🐍',
	'🐴',
	'🐏',
	'🐵',
	'🐔',
	'🐶',
	'🐗',
];

function getEto(year: number) {
	const index = (year - 4) % 12;
	return { kanji: ETOS[index], emoji: ETO_ANIMALS[index] };
}

export function ShareCard({ birthYear, birthMonth, birthDay }: ShareCardProps) {
	const { t } = useLocale();
	const [isGenerating, setIsGenerating] = useState(false);
	const [cardImage, setCardImage] = useState<string | null>(null);
	const _cardRef = useRef<HTMLDivElement>(null);

	const celebrities = getCelebritiesByAcademicYear(
		birthYear,
		birthMonth,
		birthDay,
		3,
	);
	const eto = getEto(birthYear);
	const wareki = toWareki(birthYear, birthMonth);

	// Canvas を使ってカード画像を生成
	const generateCard = useCallback(async () => {
		setIsGenerating(true);

		try {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');
			if (!ctx) return;

			// カードサイズ（Instagram推奨サイズ 1:1）
			const width = 1080;
			const height = 1080;
			canvas.width = width;
			canvas.height = height;

			// 背景グラデーション
			const gradient = ctx.createLinearGradient(0, 0, width, height);
			gradient.addColorStop(0, '#FAFBFC');
			gradient.addColorStop(1, '#EDF2F7');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, width, height);

			// 上部アクセントバー
			const accentGradient = ctx.createLinearGradient(0, 0, width, 0);
			accentGradient.addColorStop(0, '#2C5282');
			accentGradient.addColorStop(1, '#D53F8C');
			ctx.fillStyle = accentGradient;
			ctx.fillRect(0, 0, width, 16);

			// 装飾（桜の花びら風）
			ctx.fillStyle = 'rgba(213, 63, 140, 0.15)';
			for (let i = 0; i < 5; i++) {
				const x = 80 + i * 30;
				const y = 80 + (i % 2) * 20;
				ctx.beginPath();
				ctx.arc(x, y, 12, 0, Math.PI * 2);
				ctx.fill();
			}

			// タイトル
			ctx.fillStyle = '#4A5568';
			ctx.font = 'bold 48px "Noto Sans JP", sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText('同い年診断カード', width / 2, 180);

			// メイン年度
			ctx.fillStyle = '#2C5282';
			ctx.font = 'bold 120px "Noto Sans JP", sans-serif';
			ctx.fillText(`${birthYear}年生まれ`, width / 2, 340);

			// 和暦
			ctx.fillStyle = '#D53F8C';
			ctx.font = 'bold 48px "Noto Sans JP", sans-serif';
			ctx.fillText(`（${wareki}生まれ）`, width / 2, 420);

			// 干支
			ctx.font = '80px sans-serif';
			ctx.fillText(eto.emoji, width / 2, 520);
			ctx.fillStyle = '#4A5568';
			ctx.font = 'bold 36px "Noto Sans JP", sans-serif';
			ctx.fillText(`${eto.kanji}年`, width / 2, 580);

			// 同い年の有名人
			if (celebrities.length > 0) {
				ctx.fillStyle = '#2C5282';
				ctx.font = 'bold 36px "Noto Sans JP", sans-serif';
				ctx.fillText('同い年の有名人', width / 2, 680);

				ctx.fillStyle = '#4A5568';
				ctx.font = '32px "Noto Sans JP", sans-serif';
				celebrities.forEach((celeb, i) => {
					ctx.fillText(celeb.name, width / 2, 740 + i * 50);
				});
			}

			// フッター
			ctx.fillStyle = '#2C5282';
			ctx.fillRect(0, height - 100, width, 100);
			ctx.fillStyle = 'white';
			ctx.font = '28px "Noto Sans JP", sans-serif';
			ctx.fillText(
				'🎓 学歴早見表 sotsugyoutoshihayamihyou.vercel.app',
				width / 2,
				height - 45,
			);

			// 画像として保存
			const dataUrl = canvas.toDataURL('image/png');
			setCardImage(dataUrl);
		} catch (error) {
			console.error('カード生成エラー:', error);
		} finally {
			setIsGenerating(false);
		}
	}, [birthYear, wareki, eto, celebrities]);

	// 画像をダウンロード
	const downloadCard = useCallback(() => {
		if (!cardImage) return;

		const link = document.createElement('a');
		link.href = cardImage;
		link.download = `同い年診断_${birthYear}年生まれ.png`;
		link.click();
	}, [cardImage, birthYear]);

	// Xでシェア
	const shareToX = useCallback(() => {
		const text = `私は${birthYear}年（${wareki}）生まれ！${eto.emoji}\n同い年の有名人: ${celebrities.map((c) => c.name).join('、')}\n\n#同い年診断 #学歴早見表`;
		const url = `https://sotsugyoutoshihayamihyou.vercel.app/birth/${birthYear}`;
		const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
		window.open(shareUrl, '_blank', 'width=600,height=400');
	}, [birthYear, wareki, eto, celebrities]);

	// LINEでシェア
	const shareToLine = useCallback(() => {
		const text = `${birthYear}年生まれの学歴早見表\n同い年の有名人: ${celebrities.map((c) => c.name).join('、')}`;
		const url = `https://sotsugyoutoshihayamihyou.vercel.app/birth/${birthYear}`;
		const shareUrl = `https://line.me/R/msg/text/?${encodeURIComponent(`${text}\n${url}`)}`;
		window.open(shareUrl, '_blank');
	}, [birthYear, celebrities]);

	// NaN チェック
	if (
		Number.isNaN(birthYear) ||
		Number.isNaN(birthMonth) ||
		Number.isNaN(birthDay)
	) {
		return null;
	}

	return (
		<div className="mt-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-indigo-100 dark:border-gray-600 shadow-lg">
			<h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
				<span className="text-2xl">🎴</span>
				{t.shareCardTitle}
			</h2>

			<p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
				{t.shareCardSubtitle}
			</p>

			{/* カード生成ボタン */}
			{!cardImage && (
				<button
					onClick={generateCard}
					disabled={isGenerating}
					className="w-full py-3 px-4 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
				>
					{isGenerating ? (
						<>
							<svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
								<circle
									className="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									strokeWidth="4"
									fill="none"
								/>
								<path
									className="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
								/>
							</svg>
							{t.generating}
						</>
					) : (
						<>
							<span>🎨</span>
							{t.shareCardGenerate}
						</>
					)}
				</button>
			)}

			{/* 生成されたカード */}
			{cardImage && (
				<div className="space-y-4">
					<div className="rounded-xl overflow-hidden shadow-lg">
						<img src={cardImage} alt={t.shareCardTitle} className="w-full" />
					</div>

					{/* シェアボタン */}
					<div className="grid grid-cols-3 gap-3">
						<button
							onClick={downloadCard}
							className="py-3 px-4 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
						>
							<span>💾</span>
							{t.save}
						</button>
						<button
							onClick={shareToX}
							className="py-3 px-4 bg-black text-white font-medium rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
						>
							<span>𝕏</span>
							{t.share}
						</button>
						<button
							onClick={shareToLine}
							className="py-3 px-4 bg-[#00B900] text-white font-medium rounded-xl hover:bg-[#00A000] transition-colors flex items-center justify-center gap-2"
						>
							<span>💬</span>
							LINE
						</button>
					</div>

					{/* 再生成ボタン */}
					<button
						onClick={generateCard}
						disabled={isGenerating}
						className="w-full py-2 px-4 text-primary dark:text-blue-300 font-medium rounded-xl border border-primary dark:border-blue-300 hover:bg-primary/10 transition-colors"
					>
						🔄 {t.shareCardGenerate}
					</button>
				</div>
			)}
		</div>
	);
}
