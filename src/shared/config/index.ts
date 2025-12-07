/**
 * Shared Config - アプリケーション設定
 */

/** サイト情報 */
export const SITE_CONFIG = {
	name: '学歴早見表',
	url: 'https://sotsugyoutoshihayamihyou.vercel.app',
	description: '生年月日から入学・卒業年度を自動計算',
	author: '学歴早見表',
	locale: 'ja_JP',
} as const;

/** SEO設定 */
export const SEO_CONFIG = {
	titleTemplate: '%s | 学歴早見表',
	defaultTitle: '入学・卒業年度自動計算｜学歴早見表【西暦・和暦対応】',
	twitter: '@gakureki_hayami',
	googleSiteVerification: 'V1-keVq1sImNfHStAjHPsSXQ_5Z5JABh8dJnq3zkDlU',
	adsensePublisher: 'ca-pub-2145087068476394',
} as const;

/** 計算設定 */
export const CALCULATION_CONFIG = {
	minBirthYear: 1900,
	maxBirthYear: new Date().getFullYear(),
	maxDelayYears: 10,
	maxExtraYears: 5,
} as const;

/** 対応言語 */
export const SUPPORTED_LOCALES = ['ja', 'en', 'zh', 'ko'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
