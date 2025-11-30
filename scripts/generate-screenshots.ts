import * as fs from 'fs';
import * as path from 'path';

const screenshotsDir = path.join(process.cwd(), 'public', 'screenshots');

// SVGでプレースホルダースクリーンショットを生成
function generatePlaceholderScreenshot(
	filename: string,
	title: string,
	subtitle: string,
) {
	const svg = `<svg width="1080" height="1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FAFBFC"/>
      <stop offset="100%" style="stop-color:#EDF2F7"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#D53F8C"/>
    </linearGradient>
  </defs>
  
  <rect width="1080" height="1920" fill="url(#bg)"/>
  <rect width="1080" height="8" fill="url(#accent)"/>
  
  <circle cx="540" cy="400" r="120" fill="url(#accent)"/>
  <text x="540" y="420" text-anchor="middle" font-size="80" fill="white">🎓</text>
  
  <text x="540" y="620" text-anchor="middle" font-size="64" font-weight="bold" fill="#2C5282">${title}</text>
  <text x="540" y="720" text-anchor="middle" font-size="36" fill="#4A5568">${subtitle}</text>
  
  <rect x="80" y="850" width="920" height="200" rx="20" fill="white" stroke="#E2E8F0" stroke-width="2"/>
  <text x="540" y="960" text-anchor="middle" font-size="32" fill="#4A5568">生年月日を入力</text>
  
  <rect x="80" y="1100" width="920" height="400" rx="20" fill="white" stroke="#E2E8F0" stroke-width="2"/>
  <text x="540" y="1250" text-anchor="middle" font-size="28" fill="#718096">学歴タイムライン</text>
  <text x="540" y="1320" text-anchor="middle" font-size="24" fill="#A0AEC0">入学・卒業年度を自動計算</text>
  
  <rect x="80" y="1600" width="920" height="100" rx="16" fill="url(#accent)"/>
  <text x="540" y="1665" text-anchor="middle" font-size="32" fill="white">今すぐ計算する</text>
  
  <text x="540" y="1850" text-anchor="middle" font-size="24" fill="#A0AEC0">sotsugyoutoshihayamihyou.vercel.app</text>
</svg>`;

	fs.writeFileSync(path.join(screenshotsDir, filename), svg);
	console.log(`Generated: ${filename}`);
}

if (!fs.existsSync(screenshotsDir)) {
	fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('Generating screenshots...');
generatePlaceholderScreenshot(
	'screenshot-1.svg',
	'卒業年度早見表',
	'生年月日から学歴を自動計算',
);
generatePlaceholderScreenshot(
	'screenshot-2.svg',
	'計算結果',
	'入学・卒業年度がすぐわかる',
);
console.log('Done!');
