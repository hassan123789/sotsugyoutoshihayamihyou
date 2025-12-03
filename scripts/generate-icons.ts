import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const sizes = [192, 512];
const outputDir = path.join(process.cwd(), 'public', 'icons');

// アイコンのSVG（学歴をイメージした卒業帽デザイン）
function generateIconSVG(size: number, maskable: boolean = false): string {
	const rx = maskable ? 0 : size * 0.15;

	return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#D53F8C"/>
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="${size}" height="${size}" fill="url(#bg)" rx="${rx}"/>
  
  <!-- 卒業帽アイコン -->
  <g transform="translate(${size * 0.2}, ${size * 0.15}) scale(${size / 160})">
    <!-- 帽子の上部 -->
    <polygon points="48,20 96,40 48,60 0,40" fill="white" opacity="0.95"/>
    <!-- 帽子本体 -->
    <path d="M20,45 L20,70 Q48,85 76,70 L76,45" fill="white" opacity="0.9"/>
    <!-- タッセル紐 -->
    <line x1="96" y1="40" x2="110" y2="65" stroke="#FFD700" stroke-width="4" stroke-linecap="round"/>
    <!-- タッセル -->
    <circle cx="110" cy="70" r="6" fill="#FFD700"/>
    <path d="M104,70 Q110,85 116,70" stroke="#FFD700" stroke-width="3" fill="none"/>
  </g>
  
  <!-- テキスト「学」-->
  <text x="${size / 2}" y="${size * 0.78}" 
        font-family="Arial, sans-serif" 
        font-size="${size * 0.28}" 
        font-weight="bold" 
        fill="white" 
        text-anchor="middle">学</text>
</svg>`;
}

async function generateIcons() {
	// ディレクトリ確認
	if (!fs.existsSync(outputDir)) {
		fs.mkdirSync(outputDir, { recursive: true });
	}

	for (const size of sizes) {
		// 通常アイコン
		const normalSvg = generateIconSVG(size, false);
		const normalPngPath = path.join(outputDir, `icon-${size}x${size}.png`);
		await sharp(Buffer.from(normalSvg)).png().toFile(normalPngPath);
		console.log(`Generated: icon-${size}x${size}.png`);

		// Maskableアイコン
		const maskableSvg = generateIconSVG(size, true);
		const maskablePngPath = path.join(outputDir, `icon-maskable-${size}x${size}.png`);
		await sharp(Buffer.from(maskableSvg)).png().toFile(maskablePngPath);
		console.log(`Generated: icon-maskable-${size}x${size}.png`);
	}

	console.log('\n✅ PNGアイコンを生成しました！');
	console.log(`📁 出力先: ${outputDir}`);
}

generateIcons().catch(console.error);
