"use strict";
var _a;
/** 元号定義 */
const ERA_BOUNDARIES = [
    { name: '令和', start: new Date(2019, 4, 1) },
    { name: '平成', start: new Date(1989, 0, 8) },
    { name: '昭和', start: new Date(1926, 11, 25) },
    { name: '大正', start: new Date(1912, 6, 30) },
    { name: '明治', start: new Date(1868, 8, 8) },
];
/** 大学種別マッピング */
const UNIVERSITY_MAP = {
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
const BASE_SCHOOLS = [
    { name: '小学校', duration: 6, category: 'elementary' },
    { name: '中学校', duration: 3, category: 'junior' },
    { name: '高等学校', duration: 3, category: 'highschool' },
];
// ========== ユーティリティ関数 ==========
/** 和暦変換 */
function toWareki(year, month) {
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
function getElementaryEntranceYear(birthYear, birthMonth, birthDay) {
    const isEarlyBorn = birthMonth < 4 || (birthMonth === 4 && birthDay === 1);
    return birthYear + (isEarlyBorn ? 6 : 7);
}
/** 学校リスト取得 */
function getSchoolList(universityDuration) {
    return [...BASE_SCHOOLS, ...(UNIVERSITY_MAP[universityDuration] || UNIVERSITY_MAP['4'])];
}
/** カテゴリ別の追加年数取得 */
function getExtraYears(category, extra) {
    const map = {
        highschool: extra.highschool,
        university: extra.university,
        graduate: extra.graduate,
    };
    return map[category] || 0;
}
// ========== 計算ロジック ==========
/** 学歴計算（順方向） */
function calculateHistory(birthYear, birthMonth, birthDay, universityDuration, extra) {
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
function estimateBirthYear(graduationYear, schoolType, universityDuration, extra) {
    let years = 9; // 小学校6年 + 中学校3年
    if (schoolType === 'highschool') {
        years += 3 + extra.highschool;
    }
    else if (schoolType === 'university') {
        years += 3 + extra.highschool + extra.delay;
        for (const school of getSchoolList(universityDuration)) {
            if (school.category === 'university')
                years += school.duration + extra.university;
            if (school.category === 'graduate')
                years += school.duration + extra.graduate;
        }
    }
    const entranceYear = graduationYear - years;
    return { earliest: entranceYear - 7, latest: entranceYear - 6 };
}
// ========== HTML生成 ==========
function renderHistory(history) {
    return history.map(h => `
    <h3>${h.schoolName}入学</h3>
    <p>${h.entranceYear}年（${h.entranceWareki}年）4月</p>
    <h3>${h.schoolName}卒業</h3>
    <p>${h.graduationYear}年（${h.graduationWareki}年）3月</p>
  `).join('');
}
function renderReverseResult(graduationYear, schoolType, extra, universityDuration) {
    const { earliest, latest } = estimateBirthYear(graduationYear, schoolType, universityDuration, extra);
    const label = { junior: '中学校', highschool: '高等学校', university: '大学等' }[schoolType];
    let result = `
    <h2>逆算結果</h2>
    <p><strong>${graduationYear}年3月に${label}を卒業した場合：</strong></p>
    <p>推定生年月日の範囲：</p>
    <p>${earliest}年4月2日 〜 ${latest}年4月1日</p>
    <p class="note">（${toWareki(earliest, 4)}年 〜 ${toWareki(latest, 4)}年生まれ）</p>
  `;
    if (extra.delay > 0)
        result += `<p class="note">※ 浪人${extra.delay}年を考慮</p>`;
    if (extra.highschool + extra.university + extra.graduate > 0) {
        result += `<p class="note">※ 留年・休学年数を考慮</p>`;
    }
    return result;
}
// ========== バリデーション ==========
function validateDate(year, month, day) {
    const currentYear = new Date().getFullYear();
    if (isNaN(year))
        return '年を入力してください。';
    if (year < 1900 || year > currentYear)
        return `年は1900〜${currentYear}年の範囲で入力してください。`;
    if (isNaN(month) || month < 1 || month > 12)
        return '月は1〜12の範囲で入力してください。';
    if (isNaN(day) || day < 1 || day > 31)
        return '日は1〜31の範囲で入力してください。';
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth)
        return `${month}月は${daysInMonth}日までです。`;
    return null;
}
// ========== フォームコントローラー ==========
class FormController {
    constructor() {
        this.form = document.getElementById("form");
        this.output = document.getElementById("output");
        this.forwardInput = document.getElementById("forward-input");
        this.reverseInput = document.getElementById("reverse-input");
        this.debounceTimeout = null;
        this.init();
    }
    init() {
        const currentYear = new Date().getFullYear();
        this.getInput("year").max = String(currentYear);
        this.getInput("reverseYear").max = String(currentYear + 30);
        // イベント設定
        this.form.querySelectorAll('input[name="calcMode"]').forEach(r => r.addEventListener("change", () => this.toggleMode()));
        this.form.addEventListener("submit", e => { e.preventDefault(); this.calculate(); });
        this.form.querySelectorAll('input, select').forEach(el => {
            el.addEventListener("change", () => this.autoCalculate());
            if (el.type === 'number') {
                el.addEventListener("input", () => this.debounce(() => this.autoCalculate(), 300));
            }
        });
        // 大学修業年数変更時にUI連動
        this.getSelect("universityDuration").addEventListener("change", () => this.updateExtraFieldsVisibility());
        // 逆算の学校種別変更時にUI連動
        this.getSelect("reverseSchoolType").addEventListener("change", () => this.updateExtraFieldsVisibility());
        // 初期表示を更新
        this.updateExtraFieldsVisibility();
    }
    /** 大学種別や計算モードに応じて留年・休学フィールドの表示を切り替え */
    updateExtraFieldsVisibility() {
        var _a, _b, _c;
        const universityDuration = this.getSelect("universityDuration").value;
        const calcMode = this.getCalcMode();
        const schoolType = this.getSelect("reverseSchoolType").value;
        const universityItem = (_a = document.getElementById("universityExtra")) === null || _a === void 0 ? void 0 : _a.closest(".adjustment-item");
        const graduateItem = (_b = document.getElementById("graduateExtra")) === null || _b === void 0 ? void 0 : _b.closest(".adjustment-item");
        const highschoolItem = (_c = document.getElementById("highschoolExtra")) === null || _c === void 0 ? void 0 : _c.closest(".adjustment-item");
        const delayGroup = this.getSelect("delayYears").closest(".form-group");
        const universityGroup = this.getSelect("universityDuration").closest(".form-group");
        // デフォルト表示
        if (highschoolItem)
            highschoolItem.style.display = 'flex';
        if (universityItem)
            universityItem.style.display = 'flex';
        if (graduateItem)
            graduateItem.style.display = 'flex';
        if (delayGroup)
            delayGroup.style.display = 'block';
        if (universityGroup)
            universityGroup.style.display = 'block';
        // 逆算モードで学校種別に応じて調整
        if (calcMode === 'reverse') {
            if (schoolType === 'junior') {
                // 中卒：大学、大学院、高校関連すべて非表示
                if (highschoolItem)
                    highschoolItem.style.display = 'none';
                if (universityItem)
                    universityItem.style.display = 'none';
                if (graduateItem)
                    graduateItem.style.display = 'none';
                if (delayGroup)
                    delayGroup.style.display = 'none';
                if (universityGroup)
                    universityGroup.style.display = 'none';
            }
            else if (schoolType === 'highschool') {
                // 高卒：大学関連非表示
                if (universityItem)
                    universityItem.style.display = 'none';
                if (graduateItem)
                    graduateItem.style.display = 'none';
                if (delayGroup)
                    delayGroup.style.display = 'none';
                if (universityGroup)
                    universityGroup.style.display = 'none';
            }
        }
        // 順方向で進学しない場合
        if (calcMode === 'forward' && universityDuration === '0') {
            if (universityItem)
                universityItem.style.display = 'none';
            if (graduateItem)
                graduateItem.style.display = 'none';
            if (delayGroup)
                delayGroup.style.display = 'none';
        }
        // 大学院がない場合
        if (!universityDuration.includes('master') && !universityDuration.includes('doctor')) {
            if (graduateItem)
                graduateItem.style.display = 'none';
        }
    }
    getInput(name) {
        return this.form.elements.namedItem(name);
    }
    getSelect(name) {
        return this.form.elements.namedItem(name);
    }
    getExtra() {
        return {
            delay: parseInt(this.getSelect("delayYears").value) || 0,
            highschool: parseInt(this.getSelect("highschoolExtra").value) || 0,
            university: parseInt(this.getSelect("universityExtra").value) || 0,
            graduate: parseInt(this.getSelect("graduateExtra").value) || 0,
        };
    }
    getCalcMode() {
        var _a;
        return ((_a = this.form.querySelector('input[name="calcMode"]:checked')) === null || _a === void 0 ? void 0 : _a.value) || 'forward';
    }
    debounce(fn, ms) {
        if (this.debounceTimeout)
            clearTimeout(this.debounceTimeout);
        this.debounceTimeout = window.setTimeout(fn, ms);
    }
    toggleMode() {
        const isForward = this.getCalcMode() === 'forward';
        this.forwardInput.style.display = isForward ? 'block' : 'none';
        this.reverseInput.style.display = isForward ? 'none' : 'block';
        this.output.innerHTML = '<p class="output-placeholder">ここに結果が表示されます。</p>';
        this.updateExtraFieldsVisibility();
    }
    autoCalculate() {
        if (this.getCalcMode() === 'forward') {
            const { year, month, day } = this.getBirthDate();
            if (year && month && day)
                this.calculate();
        }
        else {
            if (this.getInput("reverseYear").value)
                this.calculate();
        }
    }
    getBirthDate() {
        return {
            year: this.getInput("year").value,
            month: this.getInput("month").value,
            day: this.getInput("day").value,
        };
    }
    calculate() {
        if (this.getCalcMode() === 'forward') {
            this.calculateForward();
        }
        else {
            this.calculateReverse();
        }
    }
    calculateForward() {
        const year = parseInt(this.getInput("year").value);
        const month = parseInt(this.getInput("month").value);
        const day = parseInt(this.getInput("day").value);
        const error = validateDate(year, month, day);
        if (error) {
            this.output.innerHTML = `<p class="error-message">${error}</p>`;
            return;
        }
        const history = calculateHistory(year, month, day, this.getSelect("universityDuration").value, this.getExtra());
        this.output.innerHTML = "<h2>あなたの学歴</h2>" + renderHistory(history);
    }
    calculateReverse() {
        const year = parseInt(this.getInput("reverseYear").value);
        if (isNaN(year) || year < 1950 || year > 2100) {
            this.output.innerHTML = `<p class="error-message">有効な卒業年を入力してください。</p>`;
            return;
        }
        const schoolType = this.getSelect("reverseSchoolType").value;
        this.output.innerHTML = renderReverseResult(year, schoolType, this.getExtra(), this.getSelect("universityDuration").value);
    }
}
// ========== 初期化 ==========
(_a = document.getElementById("dark-mode-toggle")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
new FormController();
