import crypto from 'crypto';
import { type NextRequest, NextResponse } from 'next/server';

// LINE Messaging API設定
const CHANNEL_SECRET = process.env.LINE_CHANNEL_SECRET || '';
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN || '';

// 署名検証
function verifySignature(body: string, signature: string): boolean {
	const hash = crypto
		.createHmac('sha256', CHANNEL_SECRET)
		.update(body)
		.digest('base64');
	return hash === signature;
}

// 学歴計算ロジック（簡易版）
function calculateAcademicHistory(birthDate: string): string {
	const match = birthDate.match(/(\d{4})[年/-](\d{1,2})[月/-](\d{1,2})/);
	if (!match) {
		return '生年月日の形式が正しくありません。\n\n例: 1990年4月1日、1990/4/1、1990-04-01';
	}

	const year = parseInt(match[1], 10);
	const month = parseInt(match[2], 10);
	const day = parseInt(match[3], 10);

	if (year < 1900 || year > new Date().getFullYear()) {
		return '年は1900〜現在の範囲で入力してください。';
	}

	// 早生まれ判定
	const isEarlyBorn = month < 4 || (month === 4 && day === 1);

	// 小学校入学年
	const elementaryEntrance = year + (isEarlyBorn ? 6 : 7);

	// 和暦変換
	const toWareki = (y: number, m: number): string => {
		const date = new Date(y, m - 1, 1);
		const eras = [
			{ name: '令和', start: new Date(2019, 4, 1) },
			{ name: '平成', start: new Date(1989, 0, 8) },
			{ name: '昭和', start: new Date(1926, 11, 25) },
		];
		for (const era of eras) {
			if (date >= era.start) {
				const eraYear = y - era.start.getFullYear() + 1;
				return `${era.name}${eraYear === 1 ? '元' : eraYear}年`;
			}
		}
		return '';
	};

	const events = [
		{ year: elementaryEntrance, month: 4, event: '小学校 入学' },
		{ year: elementaryEntrance + 6, month: 3, event: '小学校 卒業' },
		{ year: elementaryEntrance + 6, month: 4, event: '中学校 入学' },
		{ year: elementaryEntrance + 9, month: 3, event: '中学校 卒業' },
		{ year: elementaryEntrance + 9, month: 4, event: '高等学校 入学' },
		{ year: elementaryEntrance + 12, month: 3, event: '高等学校 卒業' },
		{ year: elementaryEntrance + 12, month: 4, event: '大学 入学' },
		{ year: elementaryEntrance + 16, month: 3, event: '大学 卒業' },
	];

	const lines = [
		`📚 学歴早見表`,
		`━━━━━━━━━━━━━━━`,
		`生年月日: ${year}年${month}月${day}日`,
		isEarlyBorn ? `⚡ 早生まれです` : '',
		``,
	];

	events.forEach((e) => {
		const wareki = toWareki(e.year, e.month);
		lines.push(`${e.year}年${e.month}月（${wareki}）`);
		lines.push(`  ${e.event}`);
	});

	lines.push('');
	lines.push('━━━━━━━━━━━━━━━');
	lines.push('🔗 詳細はこちら');
	lines.push('https://sotsugyoutoshihayamihyou.vercel.app');

	return lines.filter((l) => l !== '').join('\n');
}

// LINEにメッセージを送信
async function replyMessage(replyToken: string, text: string) {
	await fetch('https://api.line.me/v2/bot/message/reply', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
		},
		body: JSON.stringify({
			replyToken,
			messages: [{ type: 'text', text }],
		}),
	});
}

export async function POST(request: NextRequest) {
	try {
		const body = await request.text();
		const signature = request.headers.get('x-line-signature') || '';

		// 署名検証（本番環境のみ）
		if (CHANNEL_SECRET && !verifySignature(body, signature)) {
			return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
		}

		const data = JSON.parse(body);
		const events = data.events || [];

		for (const event of events) {
			if (event.type === 'message' && event.message.type === 'text') {
				const userMessage = event.message.text.trim();
				const replyToken = event.replyToken;

				// ヘルプメッセージ
				if (
					userMessage === 'ヘルプ' ||
					userMessage === 'help' ||
					userMessage === '使い方'
				) {
					await replyMessage(
						replyToken,
						`📚 学歴早見表Bot 使い方\n\n` +
							`生年月日を送信すると、学歴年表を計算します。\n\n` +
							`【入力例】\n` +
							`・1990年4月1日\n` +
							`・1990/4/1\n` +
							`・1990-04-01\n\n` +
							`💡 日本の学校制度に基づいて計算します。`,
					);
					continue;
				}

				// 学歴計算
				const result = calculateAcademicHistory(userMessage);
				await replyMessage(replyToken, result);
			}
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error('LINE Bot error:', error);
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 },
		);
	}
}

// Webhook URL確認用
export async function GET() {
	return NextResponse.json({
		status: 'ok',
		message: 'LINE Bot webhook is ready',
		usage: 'Send birth date (e.g., 1990年4月1日) to get academic history',
	});
}
