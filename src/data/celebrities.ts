// 同い年の有名人データ（生年月日順）
export interface Celebrity {
	name: string;
	birthYear: number;
	birthMonth?: number;
	birthDay?: number;
	profession: string;
}

// 主要な有名人データ（各年代から抽出）
export const CELEBRITIES: Celebrity[] = [
	// 2010年代生まれ
	{
		name: '芦田愛菜',
		birthYear: 2004,
		birthMonth: 6,
		birthDay: 23,
		profession: '女優',
	},
	{
		name: '鈴木福',
		birthYear: 2004,
		birthMonth: 6,
		birthDay: 17,
		profession: '俳優',
	},

	// 2000年代生まれ
	{
		name: '本田望結',
		birthYear: 2004,
		birthMonth: 6,
		birthDay: 1,
		profession: 'フィギュアスケーター・女優',
	},
	{
		name: '久保建英',
		birthYear: 2001,
		birthMonth: 6,
		birthDay: 4,
		profession: 'サッカー選手',
	},
	{
		name: '平野紫耀',
		birthYear: 1997,
		birthMonth: 1,
		birthDay: 29,
		profession: 'アイドル',
	},
	{
		name: '永瀬廉',
		birthYear: 1999,
		birthMonth: 1,
		birthDay: 23,
		profession: 'アイドル',
	},
	{
		name: '道枝駿佑',
		birthYear: 2002,
		birthMonth: 7,
		birthDay: 25,
		profession: 'アイドル',
	},
	{
		name: '橋本環奈',
		birthYear: 1999,
		birthMonth: 2,
		birthDay: 3,
		profession: '女優',
	},
	{
		name: '浜辺美波',
		birthYear: 2000,
		birthMonth: 8,
		birthDay: 29,
		profession: '女優',
	},
	{
		name: '広瀬すず',
		birthYear: 1998,
		birthMonth: 6,
		birthDay: 19,
		profession: '女優',
	},
	{
		name: '永野芽郁',
		birthYear: 1999,
		birthMonth: 9,
		birthDay: 24,
		profession: '女優',
	},
	{
		name: '清原果耶',
		birthYear: 2002,
		birthMonth: 1,
		birthDay: 30,
		profession: '女優',
	},
	{
		name: '大谷翔平',
		birthYear: 1994,
		birthMonth: 7,
		birthDay: 5,
		profession: '野球選手',
	},
	{
		name: '藤井聡太',
		birthYear: 2002,
		birthMonth: 7,
		birthDay: 19,
		profession: '棋士',
	},

	// 1990年代生まれ
	{
		name: '羽生結弦',
		birthYear: 1994,
		birthMonth: 12,
		birthDay: 7,
		profession: 'フィギュアスケーター',
	},
	{
		name: '菅田将暉',
		birthYear: 1993,
		birthMonth: 2,
		birthDay: 21,
		profession: '俳優',
	},
	{
		name: '山﨑賢人',
		birthYear: 1994,
		birthMonth: 9,
		birthDay: 7,
		profession: '俳優',
	},
	{
		name: '吉沢亮',
		birthYear: 1994,
		birthMonth: 2,
		birthDay: 1,
		profession: '俳優',
	},
	{
		name: '新垣結衣',
		birthYear: 1988,
		birthMonth: 6,
		birthDay: 11,
		profession: '女優',
	},
	{
		name: '石原さとみ',
		birthYear: 1986,
		birthMonth: 12,
		birthDay: 24,
		profession: '女優',
	},
	{
		name: '北川景子',
		birthYear: 1986,
		birthMonth: 8,
		birthDay: 22,
		profession: '女優',
	},
	{
		name: '有村架純',
		birthYear: 1993,
		birthMonth: 2,
		birthDay: 13,
		profession: '女優',
	},
	{
		name: '吉岡里帆',
		birthYear: 1993,
		birthMonth: 1,
		birthDay: 15,
		profession: '女優',
	},
	{
		name: '土屋太鳳',
		birthYear: 1995,
		birthMonth: 2,
		birthDay: 3,
		profession: '女優',
	},
	{
		name: 'あいみょん',
		birthYear: 1995,
		birthMonth: 3,
		birthDay: 6,
		profession: 'シンガーソングライター',
	},
	{
		name: 'YOASOBI ikura',
		birthYear: 1998,
		birthMonth: 11,
		birthDay: 19,
		profession: '歌手',
	},

	// 1980年代生まれ
	{
		name: '松本潤',
		birthYear: 1983,
		birthMonth: 8,
		birthDay: 30,
		profession: 'アイドル・俳優',
	},
	{
		name: '櫻井翔',
		birthYear: 1982,
		birthMonth: 1,
		birthDay: 25,
		profession: 'アイドル・キャスター',
	},
	{
		name: '相葉雅紀',
		birthYear: 1982,
		birthMonth: 12,
		birthDay: 24,
		profession: 'アイドル',
	},
	{
		name: '二宮和也',
		birthYear: 1983,
		birthMonth: 6,
		birthDay: 17,
		profession: 'アイドル・俳優',
	},
	{
		name: '大野智',
		birthYear: 1980,
		birthMonth: 11,
		birthDay: 26,
		profession: 'アイドル',
	},
	{
		name: '錦織圭',
		birthYear: 1989,
		birthMonth: 12,
		birthDay: 29,
		profession: 'テニス選手',
	},
	{
		name: '本田圭佑',
		birthYear: 1986,
		birthMonth: 6,
		birthDay: 13,
		profession: 'サッカー選手',
	},
	{
		name: '長友佑都',
		birthYear: 1986,
		birthMonth: 9,
		birthDay: 12,
		profession: 'サッカー選手',
	},
	{
		name: '香川真司',
		birthYear: 1989,
		birthMonth: 3,
		birthDay: 17,
		profession: 'サッカー選手',
	},
	{
		name: '綾瀬はるか',
		birthYear: 1985,
		birthMonth: 3,
		birthDay: 24,
		profession: '女優',
	},
	{
		name: '長澤まさみ',
		birthYear: 1987,
		birthMonth: 6,
		birthDay: 3,
		profession: '女優',
	},
	{
		name: '戸田恵梨香',
		birthYear: 1988,
		birthMonth: 8,
		birthDay: 17,
		profession: '女優',
	},
	{
		name: '堀北真希',
		birthYear: 1988,
		birthMonth: 10,
		birthDay: 6,
		profession: '元女優',
	},
	{
		name: '佐々木希',
		birthYear: 1988,
		birthMonth: 2,
		birthDay: 8,
		profession: '女優・モデル',
	},
	{
		name: '星野源',
		birthYear: 1981,
		birthMonth: 1,
		birthDay: 28,
		profession: '歌手・俳優',
	},
	{
		name: '米津玄師',
		birthYear: 1991,
		birthMonth: 3,
		birthDay: 10,
		profession: 'シンガーソングライター',
	},

	// 1970年代生まれ
	{
		name: '木村拓哉',
		birthYear: 1972,
		birthMonth: 11,
		birthDay: 13,
		profession: '俳優',
	},
	{
		name: '中居正広',
		birthYear: 1972,
		birthMonth: 8,
		birthDay: 18,
		profession: 'タレント',
	},
	{
		name: '草彅剛',
		birthYear: 1974,
		birthMonth: 7,
		birthDay: 9,
		profession: '俳優',
	},
	{
		name: '香取慎吾',
		birthYear: 1977,
		birthMonth: 1,
		birthDay: 31,
		profession: 'タレント・俳優',
	},
	{
		name: '稲垣吾郎',
		birthYear: 1973,
		birthMonth: 12,
		birthDay: 8,
		profession: '俳優',
	},
	{
		name: '松嶋菜々子',
		birthYear: 1973,
		birthMonth: 10,
		birthDay: 13,
		profession: '女優',
	},
	{
		name: '竹内結子',
		birthYear: 1980,
		birthMonth: 4,
		birthDay: 1,
		profession: '女優',
	},
	{
		name: '深田恭子',
		birthYear: 1982,
		birthMonth: 11,
		birthDay: 2,
		profession: '女優',
	},
	{
		name: 'イチロー',
		birthYear: 1973,
		birthMonth: 10,
		birthDay: 22,
		profession: '元野球選手',
	},
	{
		name: '松井秀喜',
		birthYear: 1974,
		birthMonth: 6,
		birthDay: 12,
		profession: '元野球選手',
	},
	{
		name: '中田英寿',
		birthYear: 1977,
		birthMonth: 1,
		birthDay: 22,
		profession: '元サッカー選手',
	},
	{
		name: '宇多田ヒカル',
		birthYear: 1983,
		birthMonth: 1,
		birthDay: 19,
		profession: 'シンガーソングライター',
	},
	{
		name: '浜崎あゆみ',
		birthYear: 1978,
		birthMonth: 10,
		birthDay: 2,
		profession: '歌手',
	},
	{
		name: '安室奈美恵',
		birthYear: 1977,
		birthMonth: 9,
		birthDay: 20,
		profession: '元歌手',
	},

	// 1960年代生まれ
	{
		name: '明石家さんま',
		birthYear: 1955,
		birthMonth: 7,
		birthDay: 1,
		profession: 'お笑い芸人',
	},
	{
		name: 'ビートたけし',
		birthYear: 1947,
		birthMonth: 1,
		birthDay: 18,
		profession: 'お笑い芸人・映画監督',
	},
	{
		name: 'タモリ',
		birthYear: 1945,
		birthMonth: 8,
		birthDay: 22,
		profession: 'タレント',
	},
	{
		name: '所ジョージ',
		birthYear: 1955,
		birthMonth: 1,
		birthDay: 26,
		profession: 'タレント',
	},
	{
		name: 'ダウンタウン 松本人志',
		birthYear: 1963,
		birthMonth: 9,
		birthDay: 8,
		profession: 'お笑い芸人',
	},
	{
		name: 'ダウンタウン 浜田雅功',
		birthYear: 1963,
		birthMonth: 5,
		birthDay: 11,
		profession: 'お笑い芸人',
	},
	{
		name: 'とんねるず 石橋貴明',
		birthYear: 1961,
		birthMonth: 10,
		birthDay: 22,
		profession: 'お笑い芸人',
	},
	{
		name: 'とんねるず 木梨憲武',
		birthYear: 1962,
		birthMonth: 3,
		birthDay: 9,
		profession: 'お笑い芸人',
	},
];

/**
 * 指定した年度の卒業生と同い年の有名人を取得
 * @param birthYear 生年
 * @param limit 最大取得数
 */
export function getCelebritiesByBirthYear(birthYear: number, limit: number = 5): Celebrity[] {
	return CELEBRITIES.filter((c) => c.birthYear === birthYear).slice(0, limit);
}

/**
 * 指定した年度範囲の有名人を取得（学年が同じ人）
 * @param academicYear 学年度（4月2日〜翌年4月1日生まれ）
 */
export function getCelebritiesByAcademicYear(
	birthYear: number,
	birthMonth: number,
	birthDay: number,
	limit: number = 5
): Celebrity[] {
	// 早生まれ判定
	const isEarlyBorn = birthMonth < 4 || (birthMonth === 4 && birthDay === 1);
	const academicStartYear = isEarlyBorn ? birthYear - 1 : birthYear;

	return CELEBRITIES.filter((c) => {
		if (!c.birthMonth || !c.birthDay) {
			// 月日が不明の場合は年だけで判定
			return c.birthYear === birthYear;
		}
		const cIsEarlyBorn = c.birthMonth < 4 || (c.birthMonth === 4 && c.birthDay === 1);
		const cAcademicStartYear = cIsEarlyBorn ? c.birthYear - 1 : c.birthYear;
		return cAcademicStartYear === academicStartYear;
	}).slice(0, limit);
}
