// OGP画像を生成するビルドスクリプト
// npm run generate:ogp で実行

import * as fs from 'fs';
import * as path from 'path';

// 和暦変換
function toWareki(year: number): string {
  if (year >= 2019) {
    return `令和${year - 2018}年`;
  } else if (year >= 1989) {
    return `平成${year - 1988}年`;
  } else if (year >= 1926) {
    return `昭和${year - 1925}年`;
  } else {
    return `${year}年`;
  }
}

// OGP用SVG生成
function generateOGPSVG(year: number): string {
  const wareki = toWareki(year);
  
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
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
  
  <!-- 背景 -->
  <rect width="1200" height="630" fill="url(#bg)"/>
  
  <!-- 上部アクセントライン -->
  <rect x="0" y="0" width="1200" height="8" fill="url(#accent)"/>
  
  <!-- 桜の装飾（左上） -->
  <g transform="translate(50, 50)" opacity="0.15">
    <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="#D53F8C"/>
    <path d="M60 30 L63 40 L73 43 L63 46 L60 56 L57 46 L47 43 L57 40 Z" fill="#D53F8C"/>
    <path d="M30 60 L34 73 L47 77 L34 81 L30 94 L26 81 L13 77 L26 73 Z" fill="#D53F8C"/>
  </g>
  
  <!-- 桜の装飾（右下） -->
  <g transform="translate(1050, 480)" opacity="0.15">
    <path d="M20 0 L25 15 L40 20 L25 25 L20 40 L15 25 L0 20 L15 15 Z" fill="#D53F8C"/>
    <path d="M60 30 L63 40 L73 43 L63 46 L60 56 L57 46 L47 43 L57 40 Z" fill="#D53F8C"/>
    <path d="M30 60 L34 73 L47 77 L34 81 L30 94 L26 81 L13 77 L26 73 Z" fill="#D53F8C"/>
  </g>
  
  <!-- メインコンテンツ -->
  <text x="600" y="180" text-anchor="middle" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="36" fill="#4A5568">
    学歴早見表
  </text>
  
  <!-- 年度（大きく表示） -->
  <text x="600" y="300" text-anchor="middle" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="96" font-weight="bold" fill="#2C5282">
    ${year}年生まれ
  </text>
  
  <!-- 和暦 -->
  <text x="600" y="370" text-anchor="middle" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="36" fill="#D53F8C">
    （${wareki}生まれ）
  </text>
  
  <!-- 学歴情報 -->
  <text x="600" y="450" text-anchor="middle" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="32" fill="#4A5568">
    小学校${year + 6}年入学 → 大学${year + 22}年卒業
  </text>
  
  <!-- フッター -->
  <rect x="0" y="560" width="1200" height="70" fill="#2C5282"/>
  <text x="600" y="605" text-anchor="middle" font-family="'Noto Sans JP', 'Hiragino Sans', sans-serif" font-size="24" fill="white">
    sotsugyoutoshihayamihyou.vercel.app
  </text>
</svg>`;
}

// メイン処理
function main() {
  const outputDir = path.join(process.cwd(), 'public', 'ogp');
  
  // ディレクトリ作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // 1950〜2020年のOGP画像を生成
  for (let year = 1950; year <= 2020; year++) {
    const svg = generateOGPSVG(year);
    const filename = path.join(outputDir, `${year}.svg`);
    fs.writeFileSync(filename, svg, 'utf-8');
    console.log(`Generated: ${filename}`);
  }
  
  console.log(`\nTotal: ${2020 - 1950 + 1} OGP images generated in ${outputDir}`);
}

main();
