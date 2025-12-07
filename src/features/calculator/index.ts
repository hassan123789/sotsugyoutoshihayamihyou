/**
 * Calculator Feature - 学歴計算機能
 *
 * UI, Model (状態管理), API を一箇所にまとめる
 */

// Model (状態管理・ロジック)
export { useAcademicHistory } from '../../hooks/useAcademicHistory';

// API (計算ロジック)
export {
	calculateHistory,
	getElementaryEntranceYear,
	isEarlyBorn,
	toWareki,
} from '../../lib/academic';

// Types
export type {
	AcademicEvent,
	AcademicHistory,
	CalcMode,
	ExtraYears,
	ResumeFormat,
} from '../../lib/types';

// Validation
export {
	academicCalculationInputSchema,
	birthDateSchema,
	validateBirthDate,
} from '../../lib/validation';
