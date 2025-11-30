// ========== 型定義 ==========

/** 学校カテゴリー */
export type SchoolCategory =
	| 'elementary'
	| 'junior'
	| 'highschool'
	| 'university'
	| 'graduate';

/** 学歴イベント（タイムライン用） */
export interface AcademicEvent {
	year: number;
	month: number;
	event: string;
	age: number;
	isEarlyBorn: boolean;
	schoolType: SchoolCategory;
}

/** 学歴情報（履歴書用） */
export interface AcademicHistory {
	schoolName: string;
	entranceYear: number;
	graduationYear: number;
	entranceWareki: string;
	graduationWareki: string;
	schoolType: SchoolCategory;
}

/** 学校情報 */
export interface SchoolInfo {
	name: string;
	duration: number;
	category: SchoolCategory;
}

/** 計算パラメータ */
export interface ExtraYears {
	delay: number;
	highschool: number;
	university: number;
	graduate: number;
}

/** 履歴書フォーマット種別 */
export type ResumeFormat = 'both' | 'wareki' | 'seireki';

/** 計算モード */
export type CalcMode = 'forward' | 'reverse';

/** 逆算の学校種別 */
export type ReverseSchoolType = 'university' | 'highschool' | 'junior';

/** 大学修業年数の選択肢 */
export type UniversityDuration =
	| '0'
	| '2'
	| '3'
	| '4'
	| '6'
	| '6-master'
	| '9-doctor';

// ========== 定数 ==========

/** 元号定義 */
export const ERA_BOUNDARIES = [
	{ name: '令和', start: new Date(2019, 4, 1) },
	{ name: '平成', start: new Date(1989, 0, 8) },
	{ name: '昭和', start: new Date(1926, 11, 25) },
	{ name: '大正', start: new Date(1912, 6, 30) },
	{ name: '明治', start: new Date(1868, 8, 8) },
] as const;

/** 大学種別マッピング */
export const UNIVERSITY_MAP: Record<string, SchoolInfo[]> = {
	'0': [],
	'2': [{ name: '短大・専門学校', duration: 2, category: 'university' }],
	'3': [{ name: '専門学校', duration: 3, category: 'university' }],
	'4': [{ name: '大学／専門学校', duration: 4, category: 'university' }],
	'6': [
		{ name: '大学（医学部・薬学部等）', duration: 6, category: 'university' },
	],
	'6-master': [
		{ name: '大学（学部）', duration: 4, category: 'university' },
		{ name: '大学院（修士）', duration: 2, category: 'graduate' },
	],
	'9-doctor': [
		{ name: '大学（学部）', duration: 4, category: 'university' },
		{ name: '大学院（博士）', duration: 5, category: 'graduate' },
	],
};

/** 基礎学校リスト */
export const BASE_SCHOOLS: SchoolInfo[] = [
	{ name: '小学校', duration: 6, category: 'elementary' },
	{ name: '中学校', duration: 3, category: 'junior' },
	{ name: '高等学校', duration: 3, category: 'highschool' },
];

/** 大学修業年数の選択肢 */
export const UNIVERSITY_OPTIONS = [
	{ value: '0', label: '進学しない（高卒）' },
	{ value: '2', label: '短大・専門学校（2年制）' },
	{ value: '3', label: '専門学校（3年制）' },
	{ value: '4', label: '大学・専門学校（4年制）' },
	{ value: '6', label: '医学部・薬学部等（6年制）' },
	{ value: '6-master', label: '大学院修士まで（学部4年+修士2年）' },
	{ value: '9-doctor', label: '大学院博士まで（学部4年+博士5年）' },
] as const;

/** 浪人年数の選択肢 */
export const DELAY_OPTIONS = [
	{ value: 0, label: 'なし（0年）' },
	{ value: 1, label: '1年' },
	{ value: 2, label: '2年' },
	{ value: 3, label: '3年' },
	{ value: 4, label: '4年' },
	{ value: 5, label: '5年' },
] as const;

/** 留年・休学年数の選択肢 */
export const EXTRA_YEARS_OPTIONS = [
	{ value: 0, label: '+0年' },
	{ value: 1, label: '+1年' },
	{ value: 2, label: '+2年' },
	{ value: 3, label: '+3年' },
] as const;

/** 大学留年の選択肢（最大4年） */
export const UNIVERSITY_EXTRA_OPTIONS = [
	...EXTRA_YEARS_OPTIONS,
	{ value: 4, label: '+4年' },
] as const;

/** 逆算の学校種別選択肢 */
export const REVERSE_SCHOOL_OPTIONS = [
	{ value: 'university', label: '大学卒業' },
	{ value: 'highschool', label: '高校卒業' },
	{ value: 'junior', label: '中学校卒業' },
] as const;

/** 履歴書フォーマット選択肢 */
export const RESUME_FORMAT_OPTIONS = [
	{ value: 'both', label: '西暦・和暦併記' },
	{ value: 'western', label: '西暦のみ' },
	{ value: 'japanese', label: '和暦のみ' },
] as const;
