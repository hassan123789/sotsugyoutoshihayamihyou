'use client';

import { useMemo } from 'react';
import { getNostalgia } from '@/lib/nostalgia';

interface GenerationAruaruProps {
	birthYear: number;
}

// 世代別の「あるある」データ
interface GenerationData {
	generation: string;
	color: string;
	aruaru: string[];
	techMemory: string[];
	schoolMemory: string[];
}

function getGenerationData(birthYear: number): GenerationData | null {
	// 団塊ジュニア世代 (1971-1974)
	if (birthYear >= 1971 && birthYear <= 1974) {
		return {
			generation: '団塊ジュニア世代',
			color: 'from-amber-500 to-orange-500',
			aruaru: [
				'ファミコンは友達の家でやるもの',
				'「おニャン子クラブ」でアイドルに目覚めた',
				'トレンディドラマに憧れた',
				'バブル時代を学生として経験',
			],
			techMemory: [
				'ポケベルで「14106」（アイシテル）',
				'カセットテープで音楽ダビング',
				'ワープロで論文作成',
			],
			schoolMemory: [
				'受験戦争のピーク世代',
				'校内暴力が社会問題に',
				'ブルマは当たり前だった',
			],
		};
	}

	// 氷河期世代 (1975-1981)
	if (birthYear >= 1975 && birthYear <= 1981) {
		return {
			generation: '氷河期世代',
			color: 'from-blue-500 to-indigo-500',
			aruaru: [
				'就活で「100社落ちた」は普通',
				'ドラクエの発売日は社会現象',
				'エヴァンゲリオンの衝撃',
				'ポケベル→PHS→携帯の進化を体験',
			],
			techMemory: [
				'テレホーダイでネット三昧',
				'iモードに感動した',
				'MDプレーヤーを持ち歩いた',
			],
			schoolMemory: [
				'「ゆとり教育」直前世代',
				'土曜日は半ドン（午前授業）',
				'たまごっちを学校に隠し持っていた',
			],
		};
	}

	// プレッシャー世代 (1982-1987)
	if (birthYear >= 1982 && birthYear <= 1987) {
		return {
			generation: 'プレッシャー世代',
			color: 'from-purple-500 to-pink-500',
			aruaru: [
				'モー娘。全盛期を経験',
				'「ガングロ」「アムラー」を見てきた',
				'2ちゃんねるの黎明期',
				'mixiで友達作り',
			],
			techMemory: [
				'着うた♪が革命的だった',
				'ガラケーのデコメに命をかけた',
				'iPodで音楽スタイルが変わった',
			],
			schoolMemory: [
				'ゆとり教育初期世代',
				'プリクラ手帳を交換',
				'ルーズソックス世代',
			],
		};
	}

	// ゆとり世代 (1988-1995)
	if (birthYear >= 1988 && birthYear <= 1995) {
		return {
			generation: 'ゆとり世代',
			color: 'from-green-500 to-teal-500',
			aruaru: [
				'「ゆとりwww」と煽られた経験',
				'ニコニコ動画で育った',
				'AKB48全盛期を経験',
				'LINEで「既読」に悩まされた',
			],
			techMemory: [
				'ガラケー→スマホの転換期',
				'Twitterで情報収集',
				'YouTuberという職業の誕生',
			],
			schoolMemory: [
				'土曜授業がなくなった',
				'「円周率は3」と言われた（実際は違う）',
				'「学力低下」とメディアに叩かれた',
			],
		};
	}

	// Z世代 (1996-2009)
	if (birthYear >= 1996 && birthYear <= 2009) {
		return {
			generation: 'Z世代',
			color: 'from-cyan-500 to-blue-500',
			aruaru: [
				'スマホネイティブ',
				'TikTokで流行をキャッチ',
				'「推し活」が当たり前',
				'オンライン授業経験者',
			],
			techMemory: [
				'生まれた時からインターネット',
				'YouTubeで勉強',
				'InstagramでQOL向上',
			],
			schoolMemory: [
				'コロナ禍で卒業式が縮小',
				'GIGAスクール構想でタブレット配布',
				'「SDGs」を授業で習った',
			],
		};
	}

	// α世代 (2010-)
	if (birthYear >= 2010 && birthYear <= 2020) {
		return {
			generation: 'α世代',
			color: 'from-pink-500 to-rose-500',
			aruaru: [
				'生まれた時からYouTubeがある',
				'ChatGPTで宿題？',
				'「鬼滅の刃」がバイブル',
				'推しの子・SPY×FAMILYで育つ',
			],
			techMemory: [
				'Switchが初めてのゲーム機',
				'タブレット学習が当たり前',
				'音声アシスタントと会話',
			],
			schoolMemory: [
				'プログラミング教育必修',
				'デジタル教科書導入',
				'コロナ禍の影響を受けた学校生活',
			],
		};
	}

	return null;
}

// 学年時代のヒット曲・出来事を取得
function getSchoolMemories(birthYear: number): {
	elementary: { year: number; event: string }[];
	juniorHigh: { year: number; event: string }[];
	highSchool: { year: number; event: string }[];
} {
	const memories = {
		elementary: [] as { year: number; event: string }[],
		juniorHigh: [] as { year: number; event: string }[],
		highSchool: [] as { year: number; event: string }[],
	};

	// 小学校時代 (7-12歳)
	for (let age = 7; age <= 12; age++) {
		const year = birthYear + age;
		const nostalgia = getNostalgia(year);
		if (nostalgia) {
			if (age === 7 || age === 10 || age === 12) {
				memories.elementary.push({
					year,
					event: nostalgia.culture || nostalgia.hit,
				});
			}
		}
	}

	// 中学時代 (13-15歳)
	for (let age = 13; age <= 15; age++) {
		const year = birthYear + age;
		const nostalgia = getNostalgia(year);
		if (nostalgia) {
			memories.juniorHigh.push({
				year,
				event: nostalgia.hit || nostalgia.culture,
			});
		}
	}

	// 高校時代 (16-18歳)
	for (let age = 16; age <= 18; age++) {
		const year = birthYear + age;
		const nostalgia = getNostalgia(year);
		if (nostalgia) {
			memories.highSchool.push({
				year,
				event: nostalgia.hit || nostalgia.culture,
			});
		}
	}

	return memories;
}

export function GenerationAruaru({ birthYear }: GenerationAruaruProps) {
	const generationData = useMemo(
		() => getGenerationData(birthYear),
		[birthYear],
	);
	const schoolMemories = useMemo(
		() => getSchoolMemories(birthYear),
		[birthYear],
	);

	if (!generationData) {
		return null;
	}

	return (
		<div className="mt-8 p-6 rounded-2xl shadow-lg" style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}>
			<h2 className="text-2xl font-bold mb-6 flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
				<span className="text-3xl">🎓</span>
				<span
					className={`bg-gradient-to-r ${generationData.color} bg-clip-text text-transparent`}
				>
					{generationData.generation}
				</span>
				<span>あるある</span>
			</h2>

			{/* 世代あるある */}
			<div className="grid md:grid-cols-3 gap-4 mb-6">
				<div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-secondary)' }}>
					<h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
						<span>💭</span> 世代あるある
					</h3>
					<ul className="space-y-2">
						{generationData.aruaru.map((item, i) => (
							<li
								key={i}
								className="text-sm flex items-start gap-2"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								<span style={{ color: 'var(--color-accent)' }}>•</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-secondary)' }}>
					<h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
						<span>📱</span> テクノロジーの思い出
					</h3>
					<ul className="space-y-2">
						{generationData.techMemory.map((item, i) => (
							<li
								key={i}
								className="text-sm flex items-start gap-2"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								<span style={{ color: 'var(--color-accent)' }}>•</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>

				<div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-secondary)' }}>
					<h3 className="font-bold mb-3 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
						<span>🏫</span> 学校の思い出
					</h3>
					<ul className="space-y-2">
						{generationData.schoolMemory.map((item, i) => (
							<li
								key={i}
								className="text-sm flex items-start gap-2"
								style={{ color: 'var(--color-text-secondary)' }}
							>
								<span style={{ color: 'var(--color-accent)' }}>•</span>
								<span>{item}</span>
							</li>
						))}
					</ul>
				</div>
			</div>

			{/* 学生時代のヒット */}
			<div className="p-4 rounded-xl" style={{ background: 'var(--color-bg-secondary)' }}>
				<h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
					<span>🎵</span> あなたの学生時代に流行っていたもの
				</h3>

				<div className="grid md:grid-cols-3 gap-4 text-sm">
					{schoolMemories.elementary.length > 0 && (
						<div>
							<h4 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
								🎒 小学生時代
							</h4>
							<ul className="space-y-1">
								{schoolMemories.elementary.map((m, i) => (
									<li key={i} style={{ color: 'var(--color-text-muted)' }}>
										{m.year}年: {m.event}
									</li>
								))}
							</ul>
						</div>
					)}

					{schoolMemories.juniorHigh.length > 0 && (
						<div>
							<h4 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
								📚 中学生時代
							</h4>
							<ul className="space-y-1">
								{schoolMemories.juniorHigh.map((m, i) => (
									<li key={i} style={{ color: 'var(--color-text-muted)' }}>
										{m.year}年: {m.event}
									</li>
								))}
							</ul>
						</div>
					)}

					{schoolMemories.highSchool.length > 0 && (
						<div>
							<h4 className="font-semibold mb-2" style={{ color: 'var(--color-primary)' }}>
								🎓 高校生時代
							</h4>
							<ul className="space-y-1">
								{schoolMemories.highSchool.map((m, i) => (
									<li key={i} style={{ color: 'var(--color-text-muted)' }}>
										{m.year}年: {m.event}
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
