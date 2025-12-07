/**
 * Zod バリデーションスキーマ
 * 入力検証を厳格化し、セキュリティを強化
 */
import { z } from 'zod';

// ========== 基本スキーマ ==========

/** 生年月日スキーマ */
export const birthDateSchema = z.object({
	year: z
		.number()
		.int('年は整数で入力してください')
		.min(1900, '1900年以降を入力してください')
		.max(new Date().getFullYear(), '未来の年は入力できません'),
	month: z
		.number()
		.int('月は整数で入力してください')
		.min(1, '1〜12の範囲で入力してください')
		.max(12, '1〜12の範囲で入力してください'),
	day: z
		.number()
		.int('日は整数で入力してください')
		.min(1, '1〜31の範囲で入力してください')
		.max(31, '1〜31の範囲で入力してください'),
});

/** 大学修業年数スキーマ */
export const universityDurationSchema = z.enum(['0', '2', '3', '4', '6', '6-master', '9-doctor']);

/** 浪人・留年年数スキーマ */
export const extraYearsSchema = z.object({
	delay: z.number().int().min(0).max(10).default(0),
	highschool: z.number().int().min(0).max(5).default(0),
	university: z.number().int().min(0).max(5).default(0),
	graduate: z.number().int().min(0).max(5).default(0),
});

/** 履歴書フォーマットスキーマ */
export const resumeFormatSchema = z.enum(['both', 'wareki', 'seireki']);

/** 計算モードスキーマ */
export const calcModeSchema = z.enum(['forward', 'reverse']);

/** 逆算学校種別スキーマ */
export const reverseSchoolTypeSchema = z.enum(['university', 'highschool', 'junior']);

// ========== 複合スキーマ ==========

/** 学歴計算入力スキーマ */
export const academicCalculationInputSchema = z.object({
	birthDate: birthDateSchema,
	universityDuration: universityDurationSchema,
	extraYears: extraYearsSchema,
	resumeFormat: resumeFormatSchema.optional().default('both'),
});

/** 逆算入力スキーマ */
export const reverseCalculationInputSchema = z.object({
	graduationYear: z
		.number()
		.int()
		.min(1950, '1950年以降を入力してください')
		.max(new Date().getFullYear() + 10, '年が範囲外です'),
	schoolType: reverseSchoolTypeSchema,
});

// ========== 型エクスポート ==========

export type BirthDateInput = z.infer<typeof birthDateSchema>;
export type UniversityDuration = z.infer<typeof universityDurationSchema>;
export type ExtraYearsInput = z.infer<typeof extraYearsSchema>;
export type ResumeFormatInput = z.infer<typeof resumeFormatSchema>;
export type CalcModeInput = z.infer<typeof calcModeSchema>;
export type AcademicCalculationInput = z.infer<typeof academicCalculationInputSchema>;
export type ReverseCalculationInput = z.infer<typeof reverseCalculationInputSchema>;

// ========== バリデーションヘルパー ==========

/**
 * 安全な入力パース
 * 失敗時はnullを返す（エラーをスローしない）
 */
export function safeParseBirthDate(input: unknown) {
	return birthDateSchema.safeParse(input);
}

export function safeParseAcademicInput(input: unknown) {
	return academicCalculationInputSchema.safeParse(input);
}

/**
 * 日付の妥当性チェック（月ごとの日数を考慮）
 */
export function isValidDate(year: number, month: number, day: number): boolean {
	const date = new Date(year, month - 1, day);
	return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

/**
 * 完全な生年月日バリデーション
 */
export function validateBirthDate(year: number, month: number, day: number) {
	// 基本バリデーション
	const result = birthDateSchema.safeParse({ year, month, day });
	if (!result.success) {
		return { success: false as const, error: result.error.issues[0]?.message ?? '入力エラー' };
	}

	// 日付妥当性チェック
	if (!isValidDate(year, month, day)) {
		return { success: false as const, error: '無効な日付です（例: 2月30日など）' };
	}

	return { success: true as const, data: result.data };
}
