// OGP画像をPNG形式で生成するスクリプト
// npx ts-node scripts/generate-ogp-png.ts

import * as path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');

// メインOGP画像（1200x630）
async function generateMainOGP(): Promise<void> {
	const width = 1200;
	const height = 630;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
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
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  
  <!-- 上部アクセントライン -->
  <rect x="0" y="0" width="${width}" height="8" fill="url(#accent)"/>
  
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
  
  <!-- アイコン -->
  <g transform="translate(540, 120)">
    <rect x="0" y="0" width="120" height="120" rx="24" fill="url(#accent)"/>
    <g transform="translate(30, 30)">
      <path d="M30 7l27 15-27 15-27-15 27-15z" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M30 22l18.5-10.3a36 36 0 012 19.4A36 36 0 0130 40a36 36 0 01-20.5-9A36 36 0 0111.5 12L30 22z" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M18 32v-22l12-7" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
  
  <!-- メインタイトル -->
  <text x="600" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#1A202C">学歴早見表</text>
  
  <!-- サブタイトル -->
  <text x="600" y="370" text-anchor="middle" font-family="Arial, sans-serif" font-size="32" fill="#4A5568">入学・卒業年度を自動計算</text>
  
  <!-- 特徴タグ -->
  <g transform="translate(250, 420)">
    <rect x="0" y="0" width="180" height="50" rx="25" fill="#2C5282" opacity="0.1"/>
    <text x="90" y="33" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#2C5282">📅 西暦・和暦対応</text>
  </g>
  <g transform="translate(460, 420)">
    <rect x="0" y="0" width="180" height="50" rx="25" fill="#D53F8C" opacity="0.1"/>
    <text x="90" y="33" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#D53F8C">📋 履歴書形式</text>
  </g>
  <g transform="translate(670, 420)">
    <rect x="0" y="0" width="180" height="50" rx="25" fill="#38A169" opacity="0.1"/>
    <text x="90" y="33" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" fill="#38A169">🆓 完全無料</text>
  </g>
  
  <!-- URL -->
  <text x="600" y="580" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="#718096">sotsugyoutoshihayamihyou.vercel.app</text>
</svg>`;

	await sharp(Buffer.from(svg))
		.png()
		.toFile(path.join(publicDir, 'og-image.png'));

	console.log('✅ Generated: og-image.png (1200x630)');
}

// Twitter用OGP画像（より正方形に近い比率）
async function generateTwitterOGP(): Promise<void> {
	const width = 1200;
	const height = 600;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FAFBFC"/>
      <stop offset="100%" style="stop-color:#EDF2F7"/>
    </linearGradient>
    <linearGradient id="accent2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#D53F8C"/>
    </linearGradient>
  </defs>
  
  <rect width="${width}" height="${height}" fill="url(#bg2)"/>
  <rect x="0" y="0" width="${width}" height="8" fill="url(#accent2)"/>
  
  <!-- アイコン -->
  <g transform="translate(100, 180)">
    <rect x="0" y="0" width="200" height="200" rx="40" fill="url(#accent2)"/>
    <g transform="translate(50, 50)">
      <path d="M50 12l45 25-45 25-45-25 45-25z" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 37l31-17a60 60 0 013.3 32.4A60 60 0 0150 67a60 60 0 01-34.3-15A60 60 0 0119 20L50 37z" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M30 53v-37l20-12" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
  
  <!-- タイトル -->
  <text x="400" y="250" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#1A202C">学歴早見表</text>
  <text x="400" y="330" font-family="Arial, sans-serif" font-size="36" fill="#4A5568">入学・卒業年度を自動計算</text>
  
  <!-- タグ -->
  <text x="400" y="420" font-family="Arial, sans-serif" font-size="28" fill="#718096">📅 西暦・和暦対応 ｜ 📋 履歴書形式 ｜ 🆓 完全無料</text>
  
  <!-- URL -->
  <text x="400" y="520" font-family="Arial, sans-serif" font-size="24" fill="#A0AEC0">sotsugyoutoshihayamihyou.vercel.app</text>
</svg>`;

	await sharp(Buffer.from(svg))
		.png()
		.toFile(path.join(publicDir, 'twitter-image.png'));

	console.log('✅ Generated: twitter-image.png (1200x600)');
}

// LINEシェア用画像
async function generateLineOGP(): Promise<void> {
	const width = 520;
	const height = 520;

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bg3" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#D53F8C"/>
    </linearGradient>
  </defs>
  
  <rect width="${width}" height="${height}" fill="url(#bg3)"/>
  
  <!-- アイコン -->
  <g transform="translate(160, 100)">
    <rect x="0" y="0" width="200" height="200" rx="40" fill="white" opacity="0.2"/>
    <g transform="translate(50, 50)">
      <path d="M50 12l45 25-45 25-45-25 45-25z" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M50 37l31-17a60 60 0 013.3 32.4A60 60 0 0150 67a60 60 0 01-34.3-15A60 60 0 0119 20L50 37z" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M30 53v-37l20-12" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </g>
  
  <text x="260" y="360" text-anchor="middle" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="white">学歴早見表</text>
  <text x="260" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="rgba(255,255,255,0.9)">入学・卒業年度を自動計算</text>
  <text x="260" y="480" text-anchor="middle" font-family="Arial, sans-serif" font-size="18" fill="rgba(255,255,255,0.7)">西暦・和暦対応 ｜ 完全無料</text>
</svg>`;

	await sharp(Buffer.from(svg))
		.png()
		.toFile(path.join(publicDir, 'line-image.png'));

	console.log('✅ Generated: line-image.png (520x520)');
}

async function main() {
	console.log('🎨 Generating OGP images (PNG)...\n');

	await generateMainOGP();
	await generateTwitterOGP();
	await generateLineOGP();

	console.log('\n✅ All OGP images generated successfully!');
}

main().catch(console.error);
