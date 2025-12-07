// Lib - ユーティリティ関数・型定義
// 使用例: import { toWareki, getNostalgia, type AcademicEvent } from '@/lib';

export * from './academic';
export * from './nostalgia';
export * from './types';

// Validation - 名前衝突を避けるため選択的エクスポート
export {
	type AcademicCalculationInput,
	academicCalculationInputSchema,
	type BirthDateInput,
	birthDateSchema,
	type CalcModeInput,
	calcModeSchema,
	type ExtraYearsInput,
	extraYearsSchema,
	isValidDate,
	type ResumeFormatInput,
	type ReverseCalculationInput,
	resumeFormatSchema,
	reverseCalculationInputSchema,
	reverseSchoolTypeSchema,
	safeParseAcademicInput,
	safeParseBirthDate,
	type UniversityDuration as ZodUniversityDuration,
	universityDurationSchema,
	validateBirthDate as zodValidateBirthDate,
} from './validation';
