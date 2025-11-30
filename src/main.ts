/** 学歴情報 */
interface AcademicHistory {
  schoolName: string;
  entranceYear: number;
  graduationYear: number;
  entranceWareki: string;
  graduationWareki: string;
}

/** 学校情報 */
interface SchoolInfo {
  name: string;
  duration: number;
  category: 'elementary' | 'junior' | 'highschool' | 'university' | 'graduate';
}

/** 計算パラメータ（共通） */
interface ExtraYears {
  delay: number;
  highschool: number;
  university: number;
  graduate: number;
}

/** 元号定義 */
const ERA_BOUNDARIES = [
  { name: '令和', start: new Date(2019, 4, 1) },
  { name: '平成', start: new Date(1989, 0, 8) },
  { name: '昭和', start: new Date(1926, 11, 25) },
  { name: '大正', start: new Date(1912, 6, 30) },
  { name: '明治', start: new Date(1868, 8, 8) },
];

/** 大学種別マッピング */
const UNIVERSITY_MAP: Record<string, SchoolInfo[]> = {
  '0': [],
  '2': [{ name: '短大・専門学校', duration: 2, category: 'university' }],
  '3': [{ name: '専門学校', duration: 3, category: 'university' }],
  '4': [{ name: '大学／専門学校', duration: 4, category: 'university' }],
  '6': [{ name: '大学（医学部・薬学部等）', duration: 6, category: 'university' }],
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
const BASE_SCHOOLS: SchoolInfo[] = [
  { name: '小学校', duration: 6, category: 'elementary' },
  { name: '中学校', duration: 3, category: 'junior' },
  { name: '高等学校', duration: 3, category: 'highschool' },
];

// ========== ノスタルジアデータベース ==========

/** 年代別の出来事・流行 */
interface NostalgiaData {
  hit: string;      // ヒット曲・流行語
  news: string;     // 主なニュース
  culture: string;  // 文化・トレンド
}

const NOSTALGIA_DB: Record<number, NostalgiaData> = {
  // 1980年代
  1980: { hit: '「ダンシング・オールナイト」もんた&ブラザーズ', news: 'モスクワ五輪ボイコット', culture: 'ウォークマン普及' },
  1981: { hit: '「ルビーの指環」寺尾聰', news: 'スペースシャトル初飛行', culture: 'なめ猫ブーム' },
  1982: { hit: '「待つわ」あみん', news: 'ホテルニュージャパン火災', culture: 'E.T.公開' },
  1983: { hit: '「めだかの兄妹」わらべ', news: '東京ディズニーランド開園', culture: 'ファミコン発売' },
  1984: { hit: '「もしも明日が…」わらべ', news: 'グリコ・森永事件', culture: 'エリマキトカゲブーム' },
  1985: { hit: '「恋におちて」小林明子', news: '日航機墜落事故', culture: 'スーパーマリオブラザーズ発売' },
  1986: { hit: '「CHA-CHA-CHA」石井明美', news: 'チェルノブイリ原発事故', culture: 'ドラクエ発売' },
  1987: { hit: '「命くれない」瀬川瑛子', news: '国鉄分割民営化', culture: 'ファイナルファンタジー発売' },
  1988: { hit: '「パラダイス銀河」光GENJI', news: '青函トンネル開通', culture: 'ドラゴンボール人気' },
  1989: { hit: '「Diamonds」プリンセスプリンセス', news: '昭和天皇崩御・平成へ', culture: 'ゲームボーイ発売' },
  // 1990年代
  1990: { hit: '「おどるポンポコリン」B.B.クィーンズ', news: '東西ドイツ統一', culture: 'スーパーファミコン発売' },
  1991: { hit: '「ラブ・ストーリーは突然に」小田和正', news: '湾岸戦争勃発', culture: '東京ラブストーリー大ヒット' },
  1992: { hit: '「君がいるだけで」米米CLUB', news: 'バルセロナ五輪', culture: 'たまごっち前夜' },
  1993: { hit: '「YAH YAH YAH」CHAGE&ASKA', news: 'Jリーグ開幕', culture: '「ポケベル」全盛期' },
  1994: { hit: '「innocent world」Mr.Children', news: '関西国際空港開港', culture: 'プレイステーション発売' },
  1995: { hit: '「LOVE LOVE LOVE」DREAMS COME TRUE', news: '阪神・淡路大震災', culture: 'Windows 95発売' },
  1996: { hit: '「名もなき詩」Mr.Children', news: 'O157集団食中毒', culture: 'たまごっち発売・ポケモン発売' },
  1997: { hit: '「CAN YOU CELEBRATE?」安室奈美恵', news: '消費税5%へ', culture: 'もののけ姫公開' },
  1998: { hit: '「夜空ノムコウ」SMAP', news: '長野冬季五輪', culture: 'iMac発売' },
  1999: { hit: '「だんご3兄弟」', news: '2000年問題騒動', culture: '「だっちゅーの」流行' },
  // 2000年代
  2000: { hit: '「TSUNAMI」サザンオールスターズ', news: 'シドニー五輪・高橋尚子金メダル', culture: 'PS2発売・ミレニアム' },
  2001: { hit: '「Can You Keep A Secret?」宇多田ヒカル', news: 'アメリカ同時多発テロ', culture: '千と千尋の神隠し公開' },
  2002: { hit: '「Life goes on」Dragon Ash', news: '日韓W杯開催', culture: '着うた開始' },
  2003: { hit: '「世界に一つだけの花」SMAP', news: 'イラク戦争開戦', culture: '六本木ヒルズ開業' },
  2004: { hit: '「瞳をとじて」平井堅', news: 'アテネ五輪', culture: 'ニンテンドーDS発売' },
  2005: { hit: '「青春アミーゴ」修二と彰', news: '愛・地球博開催', culture: '「電車男」ブーム' },
  2006: { hit: '「Real Face」KAT-TUN', news: 'トリノ五輪・荒川静香金メダル', culture: 'Wii発売・mixiブーム' },
  2007: { hit: '「千の風になって」秋川雅史', news: '参院選で自民大敗', culture: '初音ミク誕生・iPhone発売' },
  2008: { hit: '「キセキ」GReeeeN', news: '北京五輪・リーマンショック', culture: '「アラフォー」流行語' },
  2009: { hit: '「Believe」嵐', news: '政権交代・民主党政権', culture: '「草食系男子」流行' },
  // 2010年代
  2010: { hit: '「Beginner」AKB48', news: '小惑星探査機「はやぶさ」帰還', culture: 'iPad発売・「ゲゲゲ」流行' },
  2011: { hit: '「フライングゲット」AKB48', news: '東日本大震災', culture: '「なでしこジャパン」W杯優勝' },
  2012: { hit: '「真夏のSounds good!」AKB48', news: 'ロンドン五輪', culture: '「ワイルドだろぉ」流行語' },
  2013: { hit: '「恋するフォーチュンクッキー」AKB48', news: '東京五輪開催決定', culture: '「今でしょ！」「倍返しだ！」' },
  2014: { hit: '「ラブラドール・レトリバー」AKB48', news: '消費税8%へ', culture: '「アナと雪の女王」大ヒット' },
  2015: { hit: '「R.Y.U.S.E.I.」三代目 J Soul Brothers', news: '北陸新幹線開業', culture: '「爆買い」流行語' },
  2016: { hit: '「恋」星野源', news: 'リオ五輪・熊本地震', culture: '「ポケモンGO」大流行・PPAP' },
  2017: { hit: '「打上花火」DAOKO×米津玄師', news: '「忖度」問題', culture: '「インスタ映え」流行語' },
  2018: { hit: '「Lemon」米津玄師', news: '平昌五輪・西日本豪雨', culture: '「そだねー」流行語' },
  2019: { hit: '「Pretender」Official髭男dism', news: '令和へ改元・ラグビーW杯', culture: '「ONE TEAM」流行語' },
  // 2020年代
  2020: { hit: '「紅蓮華」LiSA', news: 'コロナパンデミック・東京五輪延期', culture: '鬼滅の刃ブーム・「3密」' },
  2021: { hit: '「ドライフラワー」優里', news: '東京五輪開催', culture: '「リアル二刀流」大谷翔平' },
  2022: { hit: '「新時代」Ado', news: '安倍元首相銃撃事件', culture: 'ONE PIECE FILM RED' },
  2023: { hit: '「アイドル」YOASOBI', news: 'WBC日本優勝', culture: '「推しの子」ブーム' },
  2024: { hit: '「晩餐歌」tuki.', news: '新紙幣発行・能登半島地震', culture: '大谷翔平50-50達成' },
  2025: { hit: '「ライラック」Mrs. GREEN APPLE', news: '大阪・関西万博開催', culture: 'AI・生成AI普及' },
};

/** 年のノスタルジア情報を取得 */
function getNostalgia(year: number): NostalgiaData | null {
  return NOSTALGIA_DB[year] || null;
}

// ========== ユーティリティ関数 ==========

/** 和暦変換 */
function toWareki(year: number, month: number): string {
  const date = new Date(year, month - 1, 1);
  for (const era of ERA_BOUNDARIES) {
    if (date >= era.start) {
      const eraYear = year - era.start.getFullYear() + 1;
      return `${era.name}${eraYear === 1 ? '元' : eraYear}`;
    }
  }
  return '';
}

/** 早生まれ判定を含む小学校入学年度算出 */
function getElementaryEntranceYear(birthYear: number, birthMonth: number, birthDay: number): number {
  const isEarlyBorn = birthMonth < 4 || (birthMonth === 4 && birthDay === 1);
  return birthYear + (isEarlyBorn ? 6 : 7);
}

/** 学校リスト取得 */
function getSchoolList(universityDuration: string): SchoolInfo[] {
  return [...BASE_SCHOOLS, ...(UNIVERSITY_MAP[universityDuration] || UNIVERSITY_MAP['4'])];
}

/** カテゴリ別の追加年数取得 */
function getExtraYears(category: SchoolInfo['category'], extra: ExtraYears): number {
  const map: Record<string, number> = {
    highschool: extra.highschool,
    university: extra.university,
    graduate: extra.graduate,
  };
  return map[category] || 0;
}

// ========== 計算ロジック ==========

/** 学歴計算（順方向） */
function calculateHistory(
  birthYear: number, birthMonth: number, birthDay: number,
  universityDuration: string, extra: ExtraYears
): AcademicHistory[] {
  const schools = getSchoolList(universityDuration);
  let currentYear = getElementaryEntranceYear(birthYear, birthMonth, birthDay);
  let delayApplied = false;

  return schools.map(school => {
    // 大学入学時に浪人年数を加算
    if (!delayApplied && (school.category === 'university' || school.category === 'graduate')) {
      currentYear += extra.delay;
      delayApplied = true;
    }

    const entranceYear = currentYear;
    const extraYears = getExtraYears(school.category, extra);
    const graduationYear = currentYear + school.duration + extraYears;
    currentYear = graduationYear;

    return {
      schoolName: school.name,
      entranceYear,
      graduationYear,
      entranceWareki: toWareki(entranceYear, 4),
      graduationWareki: toWareki(graduationYear, 3),
    };
  });
}

/** 逆算（卒業年から生年を推定） */
function estimateBirthYear(
  graduationYear: number,
  schoolType: 'university' | 'highschool' | 'junior',
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

// ========== HTML生成 ==========

/** 履歴書形式のフォーマット種別 */
type ResumeFormat = 'both' | 'western' | 'japanese';

/** 履歴書形式でテキストを生成 */
function formatForResume(history: AcademicHistory[], format: ResumeFormat = 'both'): string {
  return history.flatMap(h => {
    const entranceDate = formatResumeDate(h.entranceYear, 4, h.entranceWareki, format);
    const graduationDate = formatResumeDate(h.graduationYear, 3, h.graduationWareki, format);
    return [
      `${entranceDate}  ${h.schoolName} 入学`,
      `${graduationDate}  ${h.schoolName} 卒業`,
    ];
  }).join('\n');
}

/** 履歴書用の日付フォーマット */
function formatResumeDate(year: number, month: number, wareki: string, format: ResumeFormat): string {
  const monthStr = String(month).padStart(2, ' ') + '月';
  switch (format) {
    case 'western':
      return `${year}年${monthStr}`;
    case 'japanese':
      return `${wareki}年${monthStr}`;
    case 'both':
    default:
      return `${year}年(${wareki}年)${monthStr}`;
  }
}

/** 学校カテゴリのアイコンを取得 */
function getSchoolIcon(schoolName: string): string {
  if (schoolName.includes('小学校')) return '🎒';
  if (schoolName.includes('中学校')) return '📚';
  if (schoolName.includes('高等学校')) return '🏫';
  if (schoolName.includes('大学院')) return '🎓';
  if (schoolName.includes('大学') || schoolName.includes('専門')) return '🎓';
  return '📖';
}

/** タイムライン形式で学歴を表示 */
function renderHistory(history: AcademicHistory[]): string {
  const timelineItems = history.flatMap(h => {
    const icon = getSchoolIcon(h.schoolName);
    const entranceNostalgia = getNostalgia(h.entranceYear);
    const graduationNostalgia = getNostalgia(h.graduationYear);
    
    return [
      // 入学
      `<div class="timeline-item timeline-entrance">
        <div class="timeline-marker">
          <span class="timeline-icon">${icon}</span>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-year">${h.entranceYear}年</span>
            <span class="timeline-wareki">（${h.entranceWareki}年）</span>
            <span class="timeline-month">4月</span>
          </div>
          <h3 class="timeline-title">${h.schoolName} 入学</h3>
          ${entranceNostalgia ? `
          <div class="nostalgia-box">
            <div class="nostalgia-item"><span class="nostalgia-label">🎵</span>${entranceNostalgia.hit}</div>
            <div class="nostalgia-item"><span class="nostalgia-label">📰</span>${entranceNostalgia.news}</div>
            <div class="nostalgia-item"><span class="nostalgia-label">✨</span>${entranceNostalgia.culture}</div>
          </div>` : ''}
        </div>
      </div>`,
      // 卒業
      `<div class="timeline-item timeline-graduation">
        <div class="timeline-marker">
          <span class="timeline-icon">🌸</span>
        </div>
        <div class="timeline-content">
          <div class="timeline-header">
            <span class="timeline-year">${h.graduationYear}年</span>
            <span class="timeline-wareki">（${h.graduationWareki}年）</span>
            <span class="timeline-month">3月</span>
          </div>
          <h3 class="timeline-title">${h.schoolName} 卒業</h3>
          ${graduationNostalgia ? `
          <div class="nostalgia-box">
            <div class="nostalgia-item"><span class="nostalgia-label">🎵</span>${graduationNostalgia.hit}</div>
            <div class="nostalgia-item"><span class="nostalgia-label">📰</span>${graduationNostalgia.news}</div>
            <div class="nostalgia-item"><span class="nostalgia-label">✨</span>${graduationNostalgia.culture}</div>
          </div>` : ''}
        </div>
      </div>`
    ];
  });

  return `<div class="timeline">${timelineItems.join('')}</div>`;
}

function renderReverseResult(
  graduationYear: number,
  schoolType: 'university' | 'highschool' | 'junior',
  extra: ExtraYears,
  universityDuration: string
): string {
  const { earliest, latest } = estimateBirthYear(graduationYear, schoolType, universityDuration, extra);
  const label = { junior: '中学校', highschool: '高等学校', university: '大学等' }[schoolType];
  
  let result = `
    <h2>逆算結果</h2>
    <p><strong>${graduationYear}年3月に${label}を卒業した場合：</strong></p>
    <p>推定生年月日の範囲：</p>
    <p>${earliest}年4月2日 〜 ${latest}年4月1日</p>
    <p class="note">（${toWareki(earliest, 4)}年 〜 ${toWareki(latest, 4)}年生まれ）</p>
  `;
  
  if (extra.delay > 0) result += `<p class="note">※ 浪人${extra.delay}年を考慮</p>`;
  if (extra.highschool + extra.university + extra.graduate > 0) {
    result += `<p class="note">※ 留年・休学年数を考慮</p>`;
  }
  return result;
}

// ========== バリデーション ==========

function validateDate(year: number, month: number, day: number): string | null {
  const currentYear = new Date().getFullYear();
  if (isNaN(year)) return '年を入力してください。';
  if (year < 1900 || year > currentYear) return `年は1900〜${currentYear}年の範囲で入力してください。`;
  if (isNaN(month) || month < 1 || month > 12) return '月は1〜12の範囲で入力してください。';
  if (isNaN(day) || day < 1 || day > 31) return '日は1〜31の範囲で入力してください。';
  
  const daysInMonth = new Date(year, month, 0).getDate();
  if (day > daysInMonth) return `${month}月は${daysInMonth}日までです。`;
  return null;
}

// ========== フォームコントローラー ==========

const STORAGE_KEY = 'academicCalculatorData';

/** 保存するデータの型 */
interface StoredData {
  year: string;
  month: string;
  day: string;
  universityDuration: string;
  delayYears: string;
  highschoolExtra: string;
  universityExtra: string;
  graduateExtra: string;
  resumeFormat: ResumeFormat;
}

class FormController {
  private form = document.getElementById("form") as HTMLFormElement;
  private output = document.getElementById("output") as HTMLDivElement;
  private forwardInput = document.getElementById("forward-input") as HTMLElement;
  private reverseInput = document.getElementById("reverse-input") as HTMLElement;
  private debounceTimeout: number | null = null;
  private lastCalculatedHistory: AcademicHistory[] | null = null;

  constructor() {
    this.init();
  }

  private init(): void {
    const currentYear = new Date().getFullYear();
    this.getInput("year").max = String(currentYear);
    this.getInput("reverseYear").max = String(currentYear + 30);

    // LocalStorageから復元
    this.restoreFromStorage();

    // イベント設定
    this.form.querySelectorAll('input[name="calcMode"]').forEach(r => 
      r.addEventListener("change", () => this.toggleMode())
    );
    this.form.addEventListener("submit", e => { e.preventDefault(); this.calculate(); });
    this.form.querySelectorAll('input, select').forEach(el => {
      el.addEventListener("change", () => {
        this.autoCalculate();
        this.saveToStorage();
      });
      if ((el as HTMLInputElement).type === 'number') {
        el.addEventListener("input", () => this.debounce(() => {
          this.autoCalculate();
          this.saveToStorage();
        }, 300));
      }
    });

    // 大学修業年数変更時にUI連動
    this.getSelect("universityDuration").addEventListener("change", () => this.updateExtraFieldsVisibility());
    // 逆算の学校種別変更時にUI連動
    this.getSelect("reverseSchoolType").addEventListener("change", () => this.updateExtraFieldsVisibility());

    // 履歴書形式コピーボタン
    document.getElementById("copy-resume-btn")?.addEventListener("click", () => this.copyToClipboard());

    // 初期表示を更新
    this.updateExtraFieldsVisibility();

    // 復元後に自動計算
    const { year, month, day } = this.getBirthDate();
    if (year && month && day) {
      this.calculate();
    }
  }

  /** LocalStorageに保存 */
  private saveToStorage(): void {
    const resumeFormatEl = document.getElementById("resumeFormat") as HTMLSelectElement | null;
    const data: StoredData = {
      year: this.getInput("year").value,
      month: this.getInput("month").value,
      day: this.getInput("day").value,
      universityDuration: this.getSelect("universityDuration").value,
      delayYears: this.getSelect("delayYears").value,
      highschoolExtra: this.getSelect("highschoolExtra").value,
      universityExtra: this.getSelect("universityExtra").value,
      graduateExtra: this.getSelect("graduateExtra").value,
      resumeFormat: (resumeFormatEl?.value as ResumeFormat) || 'both',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /** LocalStorageから復元 */
  private restoreFromStorage(): void {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return;

    try {
      const data: StoredData = JSON.parse(stored);
      if (data.year) this.getInput("year").value = data.year;
      if (data.month) this.getInput("month").value = data.month;
      if (data.day) this.getInput("day").value = data.day;
      if (data.universityDuration) this.getSelect("universityDuration").value = data.universityDuration;
      if (data.delayYears) this.getSelect("delayYears").value = data.delayYears;
      if (data.highschoolExtra) this.getSelect("highschoolExtra").value = data.highschoolExtra;
      if (data.universityExtra) this.getSelect("universityExtra").value = data.universityExtra;
      if (data.graduateExtra) this.getSelect("graduateExtra").value = data.graduateExtra;
      if (data.resumeFormat) {
        const formatSelect = document.getElementById("resumeFormat") as HTMLSelectElement | null;
        if (formatSelect) formatSelect.value = data.resumeFormat;
      }
    } catch {
      // 無効なデータの場合は無視
    }
  }

  /** クリップボードにコピー */
  private async copyToClipboard(): Promise<void> {
    if (!this.lastCalculatedHistory || this.lastCalculatedHistory.length === 0) {
      this.showToast('先に計算を実行してください', 'error');
      return;
    }

    const resumeFormatEl = document.getElementById("resumeFormat") as HTMLSelectElement | null;
    const format = (resumeFormatEl?.value as ResumeFormat) || 'both';
    const text = formatForResume(this.lastCalculatedHistory, format);

    try {
      await navigator.clipboard.writeText(text);
      this.showToast('コピーしました！', 'success');
    } catch {
      // フォールバック
      this.fallbackCopy(text);
    }
  }

  /** コピーのフォールバック（古いブラウザ対応） */
  private fallbackCopy(text: string): void {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      this.showToast('コピーしました！', 'success');
    } catch {
      this.showToast('コピーに失敗しました', 'error');
    }
    document.body.removeChild(textarea);
  }

  /** トースト通知を表示 */
  private showToast(message: string, type: 'success' | 'error'): void {
    // 既存のトーストを削除
    document.querySelectorAll('.toast').forEach(el => el.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // アニメーション用にrequestAnimationFrameで遅延
    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    // 3秒後に消す
    setTimeout(() => {
      toast.classList.remove('toast-show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /** 大学種別や計算モードに応じて留年・休学フィールドの表示を切り替え */
  private updateExtraFieldsVisibility(): void {
    const universityDuration = this.getSelect("universityDuration").value;
    const calcMode = this.getCalcMode();
    const schoolType = this.getSelect("reverseSchoolType").value;

    const universityItem = document.getElementById("universityExtra")?.closest(".adjustment-item") as HTMLElement;
    const graduateItem = document.getElementById("graduateExtra")?.closest(".adjustment-item") as HTMLElement;
    const highschoolItem = document.getElementById("highschoolExtra")?.closest(".adjustment-item") as HTMLElement;
    const delayGroup = this.getSelect("delayYears").closest(".form-group") as HTMLElement;
    const universityGroup = this.getSelect("universityDuration").closest(".form-group") as HTMLElement;

    // デフォルト表示
    if (highschoolItem) highschoolItem.style.display = 'flex';
    if (universityItem) universityItem.style.display = 'flex';
    if (graduateItem) graduateItem.style.display = 'flex';
    if (delayGroup) delayGroup.style.display = 'block';
    if (universityGroup) universityGroup.style.display = 'block';

    // 逆算モードで学校種別に応じて調整
    if (calcMode === 'reverse') {
      if (schoolType === 'junior') {
        // 中卒：大学、大学院、高校関連すべて非表示
        if (highschoolItem) highschoolItem.style.display = 'none';
        if (universityItem) universityItem.style.display = 'none';
        if (graduateItem) graduateItem.style.display = 'none';
        if (delayGroup) delayGroup.style.display = 'none';
        if (universityGroup) universityGroup.style.display = 'none';
      } else if (schoolType === 'highschool') {
        // 高卒：大学関連非表示
        if (universityItem) universityItem.style.display = 'none';
        if (graduateItem) graduateItem.style.display = 'none';
        if (delayGroup) delayGroup.style.display = 'none';
        if (universityGroup) universityGroup.style.display = 'none';
      }
    }

    // 順方向で進学しない場合
    if (calcMode === 'forward' && universityDuration === '0') {
      if (universityItem) universityItem.style.display = 'none';
      if (graduateItem) graduateItem.style.display = 'none';
      if (delayGroup) delayGroup.style.display = 'none';
    }

    // 大学院がない場合
    if (!universityDuration.includes('master') && !universityDuration.includes('doctor')) {
      if (graduateItem) graduateItem.style.display = 'none';
    }
  }

  private getInput(name: string): HTMLInputElement {
    return this.form.elements.namedItem(name) as HTMLInputElement;
  }

  private getSelect(name: string): HTMLSelectElement {
    return this.form.elements.namedItem(name) as HTMLSelectElement;
  }

  private getExtra(): ExtraYears {
    return {
      delay: parseInt(this.getSelect("delayYears").value) || 0,
      highschool: parseInt(this.getSelect("highschoolExtra").value) || 0,
      university: parseInt(this.getSelect("universityExtra").value) || 0,
      graduate: parseInt(this.getSelect("graduateExtra").value) || 0,
    };
  }

  private getCalcMode(): string {
    return (this.form.querySelector('input[name="calcMode"]:checked') as HTMLInputElement)?.value || 'forward';
  }

  private debounce(fn: () => void, ms: number): void {
    if (this.debounceTimeout) clearTimeout(this.debounceTimeout);
    this.debounceTimeout = window.setTimeout(fn, ms);
  }

  private toggleMode(): void {
    const isForward = this.getCalcMode() === 'forward';
    this.forwardInput.style.display = isForward ? 'block' : 'none';
    this.reverseInput.style.display = isForward ? 'none' : 'block';
    this.output.innerHTML = '<p class="output-placeholder">ここに結果が表示されます。</p>';
    this.updateExtraFieldsVisibility();
  }

  private autoCalculate(): void {
    if (this.getCalcMode() === 'forward') {
      const { year, month, day } = this.getBirthDate();
      if (year && month && day) this.calculate();
    } else {
      if (this.getInput("reverseYear").value) this.calculate();
    }
  }

  private getBirthDate() {
    return {
      year: this.getInput("year").value,
      month: this.getInput("month").value,
      day: this.getInput("day").value,
    };
  }

  private calculate(): void {
    if (this.getCalcMode() === 'forward') {
      this.calculateForward();
    } else {
      this.calculateReverse();
    }
  }

  private calculateForward(): void {
    const year = parseInt(this.getInput("year").value);
    const month = parseInt(this.getInput("month").value);
    const day = parseInt(this.getInput("day").value);

    const error = validateDate(year, month, day);
    if (error) {
      this.output.innerHTML = `<p class="error-message">${error}</p>`;
      this.lastCalculatedHistory = null;
      return;
    }

    const history = calculateHistory(year, month, day, this.getSelect("universityDuration").value, this.getExtra());
    this.lastCalculatedHistory = history;
    this.output.innerHTML = "<h2>あなたの学歴</h2>" + renderHistory(history);
  }

  private calculateReverse(): void {
    const year = parseInt(this.getInput("reverseYear").value);
    if (isNaN(year) || year < 1950 || year > 2100) {
      this.output.innerHTML = `<p class="error-message">有効な卒業年を入力してください。</p>`;
      this.lastCalculatedHistory = null;
      return;
    }

    const schoolType = this.getSelect("reverseSchoolType").value as 'university' | 'highschool' | 'junior';
    this.lastCalculatedHistory = null; // 逆算時はコピー非対応
    this.output.innerHTML = renderReverseResult(year, schoolType, this.getExtra(), this.getSelect("universityDuration").value);
  }
}

// ========== 初期化 ==========

document.getElementById("dark-mode-toggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

new FormController();
