"use strict";
function toYearJp(year) {
    const eras = [
        { name: '令和', start: 2019 },
        { name: '平成', start: 1989 },
        { name: '昭和', start: 1926 },
        { name: '大正', start: 1912 },
        { name: '明治', start: 1868 },
    ];
    for (const era of eras) {
        if (year >= era.start) {
            const eraYear = year - era.start + 1;
            // 元年表示：1年目は「元年」と表示する
            const yearStr = eraYear === 1 ? '元' : String(eraYear);
            return `${era.name}${yearStr}`;
        }
    }
    return '';
}
function calculateSchoolHistory(year, month, universityDuration, delayYears) {
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
        const duration = parseInt(universityDuration);
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
    let result = '';
    let entranceYearOffset = month >= 4 ? 1 : 0;
    let currentYear = year + entranceYearOffset + 6 + delayYears;
    for (const school of schoolYears) {
        const graduationYear = currentYear + school.duration;
        result += `<h3>${school.name}入学</h3>`;
        result += `<p>${currentYear}年 ${toYearJp(currentYear)}年 4月</p>`;
        result += `<h3>${school.name}卒業</h3>`;
        result += `<p>${graduationYear}年 ${toYearJp(graduationYear)}年 3月</p>`;
        result += `<p>${school.duration}年間修業</p>`;
        currentYear = graduationYear;
    }
    return result;
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
    const delayYears = parseInt(form.elements.namedItem("delayYears").value);
    // 入力値のバリデーション
    const validationError = validateInput(year, month, day);
    if (validationError) {
        output.innerHTML = `<p class="error-message">${validationError}</p>`;
        return;
    }
    // 学歴の入学・卒業年度を計算する
    const result = calculateSchoolHistory(year, month, universityDuration, delayYears);
    // 結果を表示する
    output.innerHTML = "<h2>あなたの学歴</h2>" + result;
});
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
