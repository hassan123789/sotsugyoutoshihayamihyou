'use client';

import { useRef, useState } from 'react';
import { toWareki } from '@/lib/academic';
import type { AcademicEvent } from '@/lib/types';

interface InfographicGeneratorProps {
	events: AcademicEvent[];
	birthYear: number;
	birthMonth: number;
	birthDay: number;
}

export function InfographicGenerator({
	events,
	birthYear,
	birthMonth,
	birthDay,
}: InfographicGeneratorProps) {
	const [isGenerating, setIsGenerating] = useState(false);
	const [previewUrl, setPreviewUrl] = useState<string | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const generateInfographic = async () => {
		setIsGenerating(true);

		try {
			// Canvas作成（Instagram Stories サイズ: 1080x1920）
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d')!;

			canvas.width = 1080;
			canvas.height = 1920;

			// グラデーション背景
			const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
			gradient.addColorStop(0, '#2C5282');
			gradient.addColorStop(0.5, '#4A5568');
			gradient.addColorStop(1, '#D53F8C');
			ctx.fillStyle = gradient;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// 装飾パターン
			ctx.globalAlpha = 0.05;
			for (let i = 0; i < 20; i++) {
				ctx.beginPath();
				ctx.arc(
					Math.random() * canvas.width,
					Math.random() * canvas.height,
					Math.random() * 100 + 50,
					0,
					Math.PI * 2
				);
				ctx.fillStyle = '#ffffff';
				ctx.fill();
			}
			ctx.globalAlpha = 1;

			// ヘッダー
			ctx.fillStyle = '#ffffff';
			ctx.font = 'bold 64px "Hiragino Sans", sans-serif';
			ctx.textAlign = 'center';
			ctx.fillText('📚 学歴タイムライン', canvas.width / 2, 120);

			// 生年月日
			ctx.font = '36px "Hiragino Sans", sans-serif';
			ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
			ctx.fillText(`${birthYear}年${birthMonth}月${birthDay}日生まれ`, canvas.width / 2, 180);

			// 早生まれバッジ
			const isEarlyBorn = events[0]?.isEarlyBorn;
			if (isEarlyBorn) {
				ctx.font = '28px "Hiragino Sans", sans-serif';
				ctx.fillStyle = '#FED7E2';
				ctx.fillText('⚡ 早生まれ', canvas.width / 2, 230);
			}

			// タイムライン
			const startY = 300;
			const lineX = 150;
			const endY = canvas.height - 200;

			// 中央線
			ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.moveTo(lineX, startY);
			ctx.lineTo(lineX, endY);
			ctx.stroke();

			// イベント配置
			const eventSpacing = (endY - startY) / (events.length + 1);

			events.forEach((event, index) => {
				const y = startY + eventSpacing * (index + 1);
				const isEntrance = event.event.includes('入学');

				// ドット
				ctx.beginPath();
				ctx.arc(lineX, y, 16, 0, Math.PI * 2);
				ctx.fillStyle = isEntrance ? '#D53F8C' : '#2C5282';
				ctx.fill();
				ctx.strokeStyle = '#ffffff';
				ctx.lineWidth = 3;
				ctx.stroke();

				// カード背景
				const cardX = 200;
				const cardWidth = canvas.width - cardX - 50;
				const cardHeight = 100;

				ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
				ctx.beginPath();
				ctx.roundRect(cardX, y - cardHeight / 2, cardWidth, cardHeight, 16);
				ctx.fill();

				// 年度
				ctx.fillStyle = '#ffffff';
				ctx.font = 'bold 32px "Hiragino Sans", sans-serif';
				ctx.textAlign = 'left';
				ctx.fillText(`${event.year}年${event.month}月`, cardX + 20, y - 10);

				// 和暦
				ctx.font = '24px "Hiragino Sans", sans-serif';
				ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
				ctx.fillText(`(${toWareki(event.year, event.month)}年)`, cardX + 220, y - 10);

				// イベント名
				ctx.font = 'bold 28px "Hiragino Sans", sans-serif';
				ctx.fillStyle = isEntrance ? '#FED7E2' : '#BEE3F8';
				ctx.fillText(event.event, cardX + 20, y + 30);

				// 年齢
				ctx.font = '24px "Hiragino Sans", sans-serif';
				ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
				ctx.textAlign = 'right';
				ctx.fillText(`${event.age}歳`, canvas.width - 70, y + 10);
			});

			// フッター
			ctx.textAlign = 'center';
			ctx.font = '28px "Hiragino Sans", sans-serif';
			ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
			ctx.fillText('sotsugyoutoshihayamihyou.vercel.app', canvas.width / 2, canvas.height - 80);

			// 生成日
			ctx.font = '24px "Hiragino Sans", sans-serif';
			ctx.fillText(
				`Generated: ${new Date().toLocaleDateString('ja-JP')}`,
				canvas.width / 2,
				canvas.height - 40
			);

			// プレビューURL生成
			const url = canvas.toDataURL('image/png');
			setPreviewUrl(url);
		} catch (error) {
			console.error('Infographic generation failed:', error);
			alert('画像生成に失敗しました。');
		} finally {
			setIsGenerating(false);
		}
	};

	const downloadImage = () => {
		if (!previewUrl) return;

		const link = document.createElement('a');
		link.download = `学歴タイムライン_${birthYear}年${birthMonth}月${birthDay}日生まれ.png`;
		link.href = previewUrl;
		link.click();
	};

	const shareToTwitter = () => {
		const text = encodeURIComponent(
			`📚 ${birthYear}年${birthMonth}月${birthDay}日生まれの学歴タイムライン\n\n#学歴早見表 #卒業年`
		);
		const url = encodeURIComponent('https://sotsugyoutoshihayamihyou.vercel.app');
		window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
	};

	return (
		<div className="space-y-4">
			{/* 生成ボタン */}
			<button
				onClick={generateInfographic}
				disabled={isGenerating}
				className="w-full px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
				style={{
					background: isGenerating
						? 'var(--color-border)'
						: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
					color: 'white',
					cursor: isGenerating ? 'not-allowed' : 'pointer',
					boxShadow: isGenerating ? 'none' : '0 4px 14px var(--color-shadow-accent)',
				}}
			>
				{isGenerating ? (
					<>
						<svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								strokeWidth="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
						生成中...
					</>
				) : (
					<>
						<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
							/>
						</svg>
						📱 インフォグラフィック生成
					</>
				)}
			</button>

			{/* プレビュー */}
			{previewUrl && (
				<div className="space-y-4">
					<div
						className="rounded-xl overflow-hidden border"
						style={{ borderColor: 'var(--color-border)' }}
					>
						<img
							src={previewUrl}
							alt="学歴インフォグラフィック"
							className="w-full h-auto"
							style={{
								maxHeight: '500px',
								objectFit: 'contain',
								background: 'var(--color-bg-secondary)',
							}}
						/>
					</div>

					{/* アクションボタン */}
					<div className="grid grid-cols-2 gap-3">
						<button
							onClick={downloadImage}
							className="px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
							style={{
								background: 'var(--color-card)',
								color: 'var(--color-primary)',
								border: '1px solid var(--color-border)',
							}}
						>
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
								/>
							</svg>
							保存
						</button>
						<button
							onClick={shareToTwitter}
							className="px-4 py-3 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
							style={{
								background: '#1DA1F2',
								color: 'white',
							}}
						>
							<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
							</svg>
							Xでシェア
						</button>
					</div>
				</div>
			)}

			<canvas ref={canvasRef} style={{ display: 'none' }} />
		</div>
	);
}
