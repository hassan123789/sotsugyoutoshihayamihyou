import {
  ERA_BOUNDARIES,
  BASE_SCHOOLS,
  UNIVERSITY_MAP,
  type AcademicEvent,
  type AcademicHistory,
  type SchoolInfo,
  type SchoolCategory,
  type ExtraYears,
  type ResumeFormat,
  type ReverseSchoolType,
} from './types';

// ========== ユーティリティ関数 ==========

/** 和暦変換 */
export function toWareki(year: number, month: number): string {
  const date = new Date(year, month - 1, 1);
  for (const era of ERA_BOUNDARIES) {
    if (date >= era.start) {
      const eraYear = year - era.start.getFullYear() + 1;
      return `${era.name}${eraYear === 1 ? '元' : eraYear}`;
    }
  }
  return '';
}

/** 早生まれ判定 */
export function isEarlyBorn(birthMonth: number, birthDay: number): boolean {
  return birthMonth < 4 || (birthMonth === 4 && birthDay === 1);
}

/** 早生まれ判定を含む小学校入学年度算出 */
export function getElementaryEntranceYear(
  birthYear: number,
  birthMonth: number,
  birthDay: number
): number {
  return birthYear + (isEarlyBorn(birthMonth, birthDay) ? 6 : 7);
}

/** 学校リスト取得 */
export function getSchoolList(universityDuration: string): SchoolInfo[] {
  return [...BASE_SCHOOLS, ...(UNIVERSITY_MAP[universityDuration] || UNIVERSITY_MAP['4'])];
}

/** カテゴリ別の追加年数取得 */
function getExtraYearsForCategory(
  category: SchoolCategory,
  extra: ExtraYears
): number {
  const map: Record<string, number> = {
    highschool: extra.highschool,
    university: extra.university,
    graduate: extra.graduate,
  };
  return map[category] || 0;
}

// ========== 計算ロジック ==========

/** 計算結果の詳細 */
export interface CalculatedResult {
  events: AcademicEvent[];
  history: AcademicHistory[];
}

/** 学歴計算（順方向）- イベントリストと履歴書用リストの両方を返す */
export function calculateHistory(
  birthYear: number,
  birthMonth: number,
  birthDay: number,
  universityDuration: string,
  extra: ExtraYears
): CalculatedResult {
  const schools = getSchoolList(universityDuration);
  let currentYear = getElementaryEntranceYear(birthYear, birthMonth, birthDay);
  let delayApplied = false;
  const earlyBorn = isEarlyBorn(birthMonth, birthDay);

  const events: AcademicEvent[] = [];
  const history: AcademicHistory[] = [];

  schools.forEach((school) => {
    // 大学入学時に浪人年数を加算
    if (!delayApplied && (school.category === 'university' || school.category === 'graduate')) {
      currentYear += extra.delay;
      delayApplied = true;
    }

    const entranceYear = currentYear;
    const extraYears = getExtraYearsForCategory(school.category, extra);
    const graduationYear = currentYear + school.duration + extraYears;
    currentYear = graduationYear;

    // 年齢計算（入学時と卒業時）
    const entranceAge = entranceYear - birthYear - (earlyBorn ? 1 : 0);
    const graduationAge = graduationYear - birthYear - (earlyBorn ? 1 : 0);

    // イベントリスト（タイムライン用）
    events.push({
      year: entranceYear,
      month: 4,
      event: `${school.name} 入学`,
      age: entranceAge,
      isEarlyBorn: earlyBorn,
      schoolType: school.category,
    });
    events.push({
      year: graduationYear,
      month: 3,
      event: `${school.name} 卒業`,
      age: graduationAge,
      isEarlyBorn: earlyBorn,
      schoolType: school.category,
    });

    // 履歴書用リスト
    history.push({
      schoolName: school.name,
      entranceYear,
      graduationYear,
      entranceWareki: toWareki(entranceYear, 4),
      graduationWareki: toWareki(graduationYear, 3),
      schoolType: school.category,
    });
  });

  return { events, history };
}

/** 逆算（卒業年から生年を推定） */
export function estimateBirthYear(
  graduationYear: number,
  schoolType: ReverseSchoolType,
  universityDuration: string,
  extra: ExtraYears
): { earliest: number; latest: number } {
  let years = 9; // 小学校6年 + 中学校3年

  if (schoolType === 'highschool') {
    years += 3 + extra.highschool;
  } else if (schoolType === 'university') {
    years += 3 + extra.highschool + extra.delay;
    for (const school of getSchoolList(universityDuration)) {
      if (school.category === 'university') years += school.duration + extra.university;
      if (school.category === 'graduate') years += school.duration + extra.graduate;
    }
  }

  const entranceYear = graduationYear - years;
  return { earliest: entranceYear - 7, latest: entranceYear - 6 };
}

// ========== 履歴書フォーマット ==========

/** 履歴書用の日付フォーマット */
function formatResumeDate(
  year: number,
  month: number,
  wareki: string,
  format: ResumeFormat
): string {
  const monthStr = String(month).padStart(2, ' ') + '月';
  switch (format) {
    case 'seireki':
      return `${year}年${monthStr}`;
    case 'wareki':
      return `${wareki}年${monthStr}`;
    case 'both':
    default:
      return `${year}年(${wareki}年)${monthStr}`;
  }
}

/** 履歴書形式でテキストを生成 */
export function formatForResume(
  history: AcademicHistory[],
  format: ResumeFormat = 'both'
): string {
  return history
    .flatMap((h) => {
      const entranceDate = formatResumeDate(h.entranceYear, 4, h.entranceWareki, format);
      const graduationDate = formatResumeDate(h.graduationYear, 3, h.graduationWareki, format);
      return [
        `${entranceDate}  ${h.schoolName} 入学`,
        `${graduationDate}  ${h.schoolName} 卒業`,
      ];
    })
    .join('\n');
}

// ========== バリデーション ==========

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateBirthDate(
  year: number,
  month: number,
  day: number
): ValidationResult {
  const currentYear = new Date().getFullYear();

  if (isNaN(year)) {
    return { valid: false, error: '年を入力してください。' };
  }
  if (year < 1900 || year > currentYear) {
    return { valid: false, error: `年は1900〜${currentYear}年の範囲で入力してください。` };
  }
  if (isNaN(month) || month < 1 || month > 12) {
    return { valid: false, error: '月は1〜12の範囲で入力してください。' };
  }
  if (isNaN(day) || day < 1 || day > 31) {
    return { valid: false, error: '日は1〜31の範囲で入力してください。' };
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) {
    return { valid: false, error: `${month}月は${daysInMonth}日までです。` };
  }

  return { valid: true };
}

export function validateGraduationYear(year: number): ValidationResult {
  if (isNaN(year) || year < 1950 || year > 2100) {
    return { valid: false, error: '有効な卒業年を入力してください。' };
  }
  return { valid: true };
}

// ========== ユーティリティ ==========

/** 学校カテゴリのアイコンを取得 */
export function getSchoolIcon(category: SchoolCategory): string {
  switch (category) {
    case 'elementary': return '🎒';
    case 'junior': return '📚';
    case 'highschool': return '🏫';
    case 'graduate': return '🎓';
    case 'university': return '🎓';
    default: return '📖';
  }
}
