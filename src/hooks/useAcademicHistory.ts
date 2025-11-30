'use client';

import { useState, useCallback, useMemo } from 'react';
import {
  calculateHistory,
  estimateBirthYear,
  formatForResume,
  validateBirthDate,
  validateGraduationYear,
  toWareki,
  type CalculatedResult,
} from '@/lib/academic';
import type {
  ExtraYears,
  CalcMode,
  ReverseSchoolType,
  ResumeFormat,
  UniversityDuration,
} from '@/lib/types';

/** フォームの状態 */
export interface FormState {
  // 計算モード
  calcMode: CalcMode;
  // 生年月日（順方向）
  birthYear: string;
  birthMonth: string;
  birthDay: string;
  // 卒業年（逆算）
  reverseYear: string;
  reverseSchoolType: ReverseSchoolType;
  // 共通設定
  universityDuration: UniversityDuration;
  delayYears: number;
  highschoolExtra: number;
  universityExtra: number;
  graduateExtra: number;
  // 履歴書フォーマット
  resumeFormat: ResumeFormat;
}

/** 計算結果 */
export interface CalculationResult {
  type: 'forward' | 'reverse';
  data?: CalculatedResult;
  birthRange?: { earliest: number; latest: number };
  error?: string;
}

/** LocalStorageのキー */
const STORAGE_KEY = 'academicCalculatorData';

/** 初期状態 */
const initialState: FormState = {
  calcMode: 'forward',
  birthYear: '',
  birthMonth: '',
  birthDay: '',
  reverseYear: '',
  reverseSchoolType: 'university',
  universityDuration: '4',
  delayYears: 0,
  highschoolExtra: 0,
  universityExtra: 0,
  graduateExtra: 0,
  resumeFormat: 'both',
};

/** 学歴計算のカスタムフック */
export function useAcademicHistory() {
  const [formState, setFormState] = useState<FormState>(initialState);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // ExtraYears オブジェクトを生成
  const extraYears: ExtraYears = useMemo(
    () => ({
      delay: formState.delayYears,
      highschool: formState.highschoolExtra,
      university: formState.universityExtra,
      graduate: formState.graduateExtra,
    }),
    [formState.delayYears, formState.highschoolExtra, formState.universityExtra, formState.graduateExtra]
  );

  // フォーム値の更新
  const updateField = useCallback(<K extends keyof FormState>(
    field: K,
    value: FormState[K]
  ) => {
    setFormState((prev: FormState) => ({ ...prev, [field]: value }));
  }, []);

  // 複数フィールドの一括更新
  const updateFields = useCallback((updates: Partial<FormState>) => {
    setFormState((prev: FormState) => ({ ...prev, ...updates }));
  }, []);

  // 計算モード切替
  const setCalcMode = useCallback((mode: CalcMode) => {
    updateField('calcMode', mode);
    setResult(null);
  }, [updateField]);

  // 順方向計算
  const calculateForward = useCallback(() => {
    const year = parseInt(formState.birthYear);
    const month = parseInt(formState.birthMonth);
    const day = parseInt(formState.birthDay);

    const validation = validateBirthDate(year, month, day);
    if (!validation.valid) {
      setResult({ type: 'forward', error: validation.error });
      return null;
    }

    const data = calculateHistory(
      year,
      month,
      day,
      formState.universityDuration,
      extraYears
    );
    setResult({ type: 'forward', data });
    return data;
  }, [formState.birthYear, formState.birthMonth, formState.birthDay, formState.universityDuration, extraYears]);

  // 逆算
  const calculateReverse = useCallback(() => {
    const year = parseInt(formState.reverseYear);

    const validation = validateGraduationYear(year);
    if (!validation.valid) {
      setResult({ type: 'reverse', error: validation.error });
      return null;
    }

    const birthRange = estimateBirthYear(
      year,
      formState.reverseSchoolType,
      formState.universityDuration,
      extraYears
    );
    setResult({ type: 'reverse', birthRange });
    return birthRange;
  }, [formState.reverseYear, formState.reverseSchoolType, formState.universityDuration, extraYears]);

  // 計算実行
  const calculate = useCallback(() => {
    if (formState.calcMode === 'forward') {
      return calculateForward();
    } else {
      return calculateReverse();
    }
  }, [formState.calcMode, calculateForward, calculateReverse]);

  // 自動計算（入力時）
  const autoCalculate = useCallback(() => {
    if (formState.calcMode === 'forward') {
      if (formState.birthYear && formState.birthMonth && formState.birthDay) {
        calculateForward();
      }
    } else {
      if (formState.reverseYear) {
        calculateReverse();
      }
    }
  }, [formState, calculateForward, calculateReverse]);

  // 履歴書形式でフォーマット
  const getResumeText = useCallback(() => {
    if (result?.type === 'forward' && result.data) {
      return formatForResume(result.data.history, formState.resumeFormat);
    }
    return '';
  }, [result, formState.resumeFormat]);

  // 逆算結果のテキスト生成
  const getReverseResultText = useCallback(() => {
    if (result?.type !== 'reverse' || !result.birthRange) return null;

    const { earliest, latest } = result.birthRange;
    const year = parseInt(formState.reverseYear);
    const schoolLabelMap: Record<ReverseSchoolType, string> = {
      junior: '中学校',
      highschool: '高等学校',
      university: '大学等',
    };
    const schoolLabel = schoolLabelMap[formState.reverseSchoolType];

    return {
      graduationYear: year,
      schoolLabel,
      earliest,
      latest,
      earliestWareki: toWareki(earliest, 4),
      latestWareki: toWareki(latest, 4),
      delayYears: extraYears.delay,
      hasExtraYears: extraYears.highschool + extraYears.university + extraYears.graduate > 0,
    };
  }, [result, formState.reverseYear, formState.reverseSchoolType, extraYears]);

  // LocalStorageへ保存
  const saveToStorage = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formState));
    } catch {
      // 保存失敗は無視
    }
  }, [formState]);

  // LocalStorageから復元
  const restoreFromStorage = useCallback(() => {
    if (typeof window === 'undefined') return;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as Partial<FormState>;
        setFormState((prev: FormState) => ({ ...prev, ...data }));
      }
    } catch {
      // 復元失敗は無視
    }
    setIsInitialized(true);
  }, []);

  // UI表示制御用のフラグ
  const showUniversityFields = useMemo(() => {
    if (formState.calcMode === 'reverse') {
      return formState.reverseSchoolType === 'university';
    }
    return formState.universityDuration !== '0';
  }, [formState.calcMode, formState.reverseSchoolType, formState.universityDuration]);

  const showGraduateFields = useMemo(() => {
    return (
      formState.universityDuration.includes('master') ||
      formState.universityDuration.includes('doctor')
    );
  }, [formState.universityDuration]);

  const showDelayFields = useMemo(() => {
    if (formState.calcMode === 'reverse') {
      return formState.reverseSchoolType === 'university';
    }
    return formState.universityDuration !== '0';
  }, [formState.calcMode, formState.reverseSchoolType, formState.universityDuration]);

  const showHighschoolFields = useMemo(() => {
    if (formState.calcMode === 'reverse') {
      return formState.reverseSchoolType !== 'junior';
    }
    return true;
  }, [formState.calcMode, formState.reverseSchoolType]);

  return {
    // 状態
    formState,
    result,
    isInitialized,
    extraYears,

    // アクション
    updateField,
    updateFields,
    setCalcMode,
    calculate,
    autoCalculate,

    // ユーティリティ
    getResumeText,
    getReverseResultText,
    saveToStorage,
    restoreFromStorage,

    // UI制御フラグ
    showUniversityFields,
    showGraduateFields,
    showDelayFields,
    showHighschoolFields,
  };
}
