"use strict";
/**
 * 和暦変換クラス
 * 改元日を正確に判定する和暦変換ロジック
 */
class JapaneseEraConverter {
    /**
     * 指定された日付を和暦に変換する
     * @param date 変換対象の日付
     * @returns 和暦文字列（例: "令和元", "平成31"）
     */
    static toWareki(date) {
        for (const era of this.ERA_BOUNDARIES) {
            if (date >= era.startDate) {
                let eraYear = date.getFullYear() - era.startDate.getFullYear();
                if (
                    date.getMonth() > era.startDate.getMonth() ||
                    (date.getMonth() === era.startDate.getMonth() && date.getDate() >= era.startDate.getDate())
                ) {
                    eraYear++;
                }
                // 元年表示：1年目は「元」と表示する
                const yearStr = eraYear === 1 ? '元' : String(eraYear);
                return `${era.name}${yearStr}`;
            }
        }
        return '';
    }
    /**
     * 西暦年と月から和暦を取得する（入学・卒業月用）
     * @param year 西暦年
     * @param month 月（1-12）
     * @returns 和暦文字列
     */
    static toWarekiFromYearMonth(year, month) {
        // 月の1日で判定（入学は4月1日、卒業は3月1日を想定）
        const date = new Date(year, month - 1, 1);
        return this.toWareki(date);
    }
}
/**
 * 元号の境界日付を定義
 * 各元号の開始日を厳密に定義
 */
JapaneseEraConverter.ERA_BOUNDARIES = [
    { name: '令和', startDate: new Date(2019, 4, 1) }, // 2019年5月1日〜
    { name: '平成', startDate: new Date(1989, 0, 8) }, // 1989年1月8日〜2019年4月30日
    { name: '昭和', startDate: new Date(1926, 11, 25) }, // 1926年12月25日〜1989年1月7日
    { name: '大正', startDate: new Date(1912, 6, 30) }, // 1912年7月30日〜1926年12月24日
    { name: '明治', startDate: new Date(1868, 8, 8) }, // 1868年9月8日〜1912年7月29日
];
/**
 * 学年度計算クラス
 * 早生まれ判定を含む基準年度算出
 */
class AcademicYearCalculator {
    /**
     * 早生まれ判定を含む基準学年年度を算出
     * 日本の学校教育法に基づき:
     * - 4月1日生まれ: 前の学年（早生まれ）
     * - 4月2日以降生まれ: 次の学年
     *
     * @param birthDate 生年月日
     * @returns 小学校入学年度（西暦）
     */
    static getBaseSchoolYear(birthDate) {
        const birthYear = birthDate.getFullYear();
        const birthMonth = birthDate.getMonth() + 1; // 0-indexed to 1-indexed
        const birthDay = birthDate.getDate();
        // 早生まれ判定: 1月1日〜4月1日は早生まれ（前の学年）
        // 4月2日以降は次の学年
        if (birthMonth < 4 || (birthMonth === 4 && birthDay === 1)) {
            // 早生まれ: 前の暦年(4月2日〜12月31日)生まれと同じ学年に所属（小学校入学は誕生年+6年後）
            return birthYear + 6;
        }
        else {
            // 通常: 当年度の学年に所属（小学校入学は誕生年+7年後）
            return birthYear + 7;
        }
    }
    /**
     * 学校情報リストを生成
     * @param universityDuration 大学/専門学校の修業年数
     * @returns 学校情報の配列
     */
    static getSchoolList(universityDuration) {
        const schoolYears = [
            { name: '小学校', duration: 6 },
            { name: '中学校', duration: 3 },
            { name: '高等学校', duration: 3 },
        ];
        // 大学/専門学校の修業年数を追加
        if (universityDuration === '6-master') {
            // 大学院修士まで（学部4年+修士2年）
            schoolYears.push({ name: '大学（学部）', duration: 4 });
            schoolYears.push({ name: '大学院（修士）', duration: 2 });
        }
        else {
            const duration = parseInt(universityDuration, 10);
            if (duration === 6) {
                schoolYears.push({ name: '大学（医学部・薬学部等）', duration: 6 });
            }
            else if (duration === 2) {
                schoolYears.push({ name: '短大・専門学校', duration: 2 });
            }
            else if (duration === 3) {
                schoolYears.push({ name: '専門学校', duration: 3 });
            }
            else {
                schoolYears.push({ name: '大学／専門学校', duration: 4 });
            }
        }
        return schoolYears;
    }
    /**
     * 学歴を計算する
     * @param birthDate 生年月日
     * @param universityDuration 大学/専門学校の修業年数
     * @param delayYears 入学遅延年数（浪人等）
     * @returns 学歴情報の配列
     */
    static calculateHistory(birthDate, universityDuration, delayYears) {
        const history = [];
        const schoolList = this.getSchoolList(universityDuration);
        // 小学校入学年度を算出
        let currentYear = this.getBaseSchoolYear(birthDate) + delayYears;
        for (const school of schoolList) {
            const entranceYear = currentYear;
            const graduationYear = currentYear + school.duration;
            const academicHistory = {
                schoolName: school.name,
                entranceYear: entranceYear,
                entranceMonth: 4,
                graduationYear: graduationYear,
                graduationMonth: 3,
                duration: school.duration,
                entranceWareki: JapaneseEraConverter.toWarekiFromYearMonth(entranceYear, 4),
                graduationWareki: JapaneseEraConverter.toWarekiFromYearMonth(graduationYear, 3),
            };
            history.push(academicHistory);
            currentYear = graduationYear;
        }
        return history;
    }
}
/**
 * 学歴HTMLレンダラークラス
 * AcademicHistory[] からHTMLを生成
 */
class AcademicHistoryRenderer {
    /**
     * 学歴情報をHTMLに変換する
     * @param history 学歴情報の配列
     * @returns HTML文字列
     */
    static render(history) {
        let result = '';
        for (const item of history) {
            result += `<h3>${item.schoolName}入学</h3>`;
            result += `<p>${item.entranceYear}年 ${item.entranceWareki}年 ${item.entranceMonth}月</p>`;
            result += `<h3>${item.schoolName}卒業</h3>`;
            result += `<p>${item.graduationYear}年 ${item.graduationWareki}年 ${item.graduationMonth}月</p>`;
            result += `<p>${item.duration}年間修業</p>`;
        }
        return result;
    }
}
/**
 * 学歴計算の統合関数（既存APIとの互換性のため）
 */
function calculateSchoolHistory(year, month, day, universityDuration, delayYears) {
    const birthDate = new Date(year, month - 1, day);
    const history = AcademicYearCalculator.calculateHistory(birthDate, universityDuration, delayYears);
    return AcademicHistoryRenderer.render(history);
}
function validateInput(year, month, day) {
    const currentYear = new Date().getFullYear();
    // 年のバリデーション
    if (isNaN(year)) {
        return '年を入力してください。';
    }
    if (year < 1900) {
        return '年は1900年以降を入力してください。';
    }
    if (year > currentYear) {
        return `年は${currentYear}年以前を入力してください。`;
    }
    // 月のバリデーション
    if (isNaN(month)) {
        return '月を入力してください。';
    }
    if (month < 1 || month > 12) {
        return '月は1〜12の範囲で入力してください。';
    }
    // 日のバリデーション
    if (isNaN(day)) {
        return '日を入力してください。';
    }
    if (day < 1 || day > 31) {
        return '日は1〜31の範囲で入力してください。';
    }
    // 月ごとの日数チェック
    const daysInMonth = new Date(year, month, 0).getDate();
    if (day > daysInMonth) {
        return `${month}月は${daysInMonth}日までです。`;
    }
    return null;
}
const form = document.getElementById("form");
const output = document.getElementById("output");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const year = parseInt(form.elements.namedItem("year").value);
    const month = parseInt(form.elements.namedItem("month").value);
    const day = parseInt(form.elements.namedItem("day").value);
    const universityDuration = form.elements.namedItem("universityDuration").value;
    const delayYears = parseInt(form.elements.namedItem("delayYears").value, 10);
    // 入力値のバリデーション
    const validationError = validateInput(year, month, day);
    if (validationError) {
        output.innerHTML = `<p class="error-message">${validationError}</p>`;
        return;
    }
    // 学歴の入学・卒業年度を計算する
    const result = calculateSchoolHistory(year, month, day, universityDuration, delayYears);
    // 結果を表示する
    output.innerHTML = "<h2>あなたの学歴</h2>" + result;
});
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
