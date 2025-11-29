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
            return `${era.name}${year - era.start + 1}`;
        }
    }
    return '';
}
function calculateSchoolHistory(year, month) {
    const schoolYears = [
        { name: '小学校', duration: 6 },
        { name: '中学校', duration: 3 },
        { name: '高等学校', duration: 3 },
        { name: '大学／専門学校', duration: 4 },
    ];
    let result = '';
    let entranceYearOffset = month >= 4 ? 1 : 0;
    let currentYear = year + entranceYearOffset + 6;
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
const form = document.getElementById("form");
const output = document.getElementById("output");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const year = parseInt(form.elements.namedItem("year").value);
    const month = parseInt(form.elements.namedItem("month").value);
    // 入力値のバリデーション
    if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) {
        output.innerHTML = "<p style='color:red;'>年・月・日には有効な数字を入力してください。</p>";
        return;
    }
    // 学歴の入学・卒業年度を計算する
    const result = calculateSchoolHistory(year, month);
    // 結果を表示する
    output.innerHTML = "<h2>あなたの学歴</h2>" + result;
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
