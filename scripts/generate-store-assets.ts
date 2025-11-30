import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';

const outputDir = path.join(process.cwd(), 'public', 'store-assets');

// フィーチャーグラフィック（1024x500）
function generateFeatureGraphicSVG(): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="500" viewBox="0 0 1024 500">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a365d"/>
      <stop offset="50%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#553C9A"/>
    </linearGradient>
    <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D53F8C"/>
      <stop offset="100%" style="stop-color:#ED8936"/>
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="1024" height="500" fill="url(#bgGradient)"/>
  
  <!-- 装飾的な円 -->
  <circle cx="900" cy="100" r="200" fill="#D53F8C" opacity="0.15"/>
  <circle cx="150" cy="400" r="150" fill="#ED8936" opacity="0.1"/>
  
  <!-- 卒業帽アイコン（左側） -->
  <g transform="translate(80, 120) scale(2)">
    <polygon points="60,25 120,50 60,75 0,50" fill="white" opacity="0.95"/>
    <path d="M25,55 L25,90 Q60,110 95,90 L95,55" fill="white" opacity="0.9"/>
    <line x1="120" y1="50" x2="140" y2="85" stroke="#FFD700" stroke-width="5" stroke-linecap="round"/>
    <circle cx="140" cy="92" r="8" fill="#FFD700"/>
    <path d="M132,92 Q140,112 148,92" stroke="#FFD700" stroke-width="4" fill="none"/>
  </g>
  
  <!-- メインタイトル -->
  <text x="520" y="200" font-family="Arial, Hiragino Sans, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">学歴早見表</text>
  
  <!-- サブタイトル -->
  <text x="520" y="280" font-family="Arial, Hiragino Sans, sans-serif" font-size="32" fill="white" opacity="0.9" text-anchor="middle">生年月日から入学・卒業年度を瞬時に計算</text>
  
  <!-- 特徴バッジ -->
  <g transform="translate(200, 340)">
    <rect x="0" y="0" width="180" height="50" rx="25" fill="url(#accentGradient)" opacity="0.9"/>
    <text x="90" y="33" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" font-weight="bold">📅 和暦・西暦対応</text>
  </g>
  
  <g transform="translate(420, 340)">
    <rect x="0" y="0" width="180" height="50" rx="25" fill="url(#accentGradient)" opacity="0.9"/>
    <text x="90" y="33" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" font-weight="bold">📋 履歴書作成に</text>
  </g>
  
  <g transform="translate(640, 340)">
    <rect x="0" y="0" width="180" height="50" rx="25" fill="url(#accentGradient)" opacity="0.9"/>
    <text x="90" y="33" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" font-weight="bold">✨ 完全無料</text>
  </g>
  
  <!-- 下部アクセント -->
  <rect x="0" y="485" width="1024" height="15" fill="url(#accentGradient)"/>
</svg>`;
}

// スクリーンショット（1080x1920 - 9:16）
function generatePhoneScreenshotSVG(variant: number): string {
  const variants = [
    {
      title: '生年月日を入力',
      subtitle: '簡単3ステップ',
      content: `
        <rect x="90" y="450" width="900" height="120" rx="16" fill="white"/>
        <text x="150" y="520" font-size="36" fill="#666">生年月日</text>
        <text x="550" y="520" font-size="40" fill="#333" font-weight="bold">2000年 4月 15日</text>
        
        <rect x="90" y="600" width="900" height="120" rx="16" fill="white"/>
        <text x="150" y="670" font-size="36" fill="#666">誕生月</text>
        <text x="550" y="670" font-size="40" fill="#333" font-weight="bold">4月〜翌3月生まれ</text>
      `,
      highlight: '🎓',
    },
    {
      title: '学歴を自動計算',
      subtitle: '小学校から大学院まで',
      content: `
        <g transform="translate(90, 420)">
          <rect width="900" height="100" rx="12" fill="white"/>
          <circle cx="50" cy="50" r="30" fill="#4299E1"/>
          <text x="50" y="58" font-size="24" fill="white" text-anchor="middle">小</text>
          <text x="120" y="45" font-size="28" fill="#333" font-weight="bold">小学校</text>
          <text x="120" y="75" font-size="24" fill="#666">2007年4月入学 → 2013年3月卒業</text>
        </g>
        <g transform="translate(90, 540)">
          <rect width="900" height="100" rx="12" fill="white"/>
          <circle cx="50" cy="50" r="30" fill="#48BB78"/>
          <text x="50" y="58" font-size="24" fill="white" text-anchor="middle">中</text>
          <text x="120" y="45" font-size="28" fill="#333" font-weight="bold">中学校</text>
          <text x="120" y="75" font-size="24" fill="#666">2013年4月入学 → 2016年3月卒業</text>
        </g>
        <g transform="translate(90, 660)">
          <rect width="900" height="100" rx="12" fill="white"/>
          <circle cx="50" cy="50" r="30" fill="#ED8936"/>
          <text x="50" y="58" font-size="24" fill="white" text-anchor="middle">高</text>
          <text x="120" y="45" font-size="28" fill="#333" font-weight="bold">高等学校</text>
          <text x="120" y="75" font-size="24" fill="#666">2016年4月入学 → 2019年3月卒業</text>
        </g>
        <g transform="translate(90, 780)">
          <rect width="900" height="100" rx="12" fill="white"/>
          <circle cx="50" cy="50" r="30" fill="#9F7AEA"/>
          <text x="50" y="58" font-size="24" fill="white" text-anchor="middle">大</text>
          <text x="120" y="45" font-size="28" fill="#333" font-weight="bold">大学</text>
          <text x="120" y="75" font-size="24" fill="#666">2019年4月入学 → 2023年3月卒業</text>
        </g>
      `,
      highlight: '📚',
    },
    {
      title: '和暦・西暦対応',
      subtitle: '令和・平成・昭和',
      content: `
        <rect x="90" y="420" width="900" height="200" rx="16" fill="white"/>
        <text x="150" y="480" font-size="32" fill="#666">西暦</text>
        <text x="550" y="480" font-size="42" fill="#2C5282" font-weight="bold">2019年4月</text>
        <line x1="150" y1="520" x2="930" y2="520" stroke="#E2E8F0" stroke-width="2"/>
        <text x="150" y="580" font-size="32" fill="#666">和暦</text>
        <text x="550" y="580" font-size="42" fill="#D53F8C" font-weight="bold">令和元年4月</text>
        
        <rect x="90" y="660" width="900" height="200" rx="16" fill="white"/>
        <text x="150" y="720" font-size="32" fill="#666">西暦</text>
        <text x="550" y="720" font-size="42" fill="#2C5282" font-weight="bold">1995年3月</text>
        <line x1="150" y1="760" x2="930" y2="760" stroke="#E2E8F0" stroke-width="2"/>
        <text x="150" y="820" font-size="32" fill="#666">和暦</text>
        <text x="550" y="820" font-size="42" fill="#D53F8C" font-weight="bold">平成7年3月</text>
      `,
      highlight: '📅',
    },
    {
      title: 'コピー＆共有',
      subtitle: '履歴書にそのまま貼り付け',
      content: `
        <rect x="90" y="420" width="900" height="300" rx="16" fill="white"/>
        <text x="150" y="490" font-size="28" fill="#333">学歴</text>
        <text x="150" y="550" font-size="24" fill="#666">2013年3月　○○市立○○小学校　卒業</text>
        <text x="150" y="600" font-size="24" fill="#666">2013年4月　○○市立○○中学校　入学</text>
        <text x="150" y="650" font-size="24" fill="#666">2016年3月　○○市立○○中学校　卒業</text>
        <text x="150" y="700" font-size="24" fill="#666">2016年4月　○○県立○○高等学校　入学</text>
        
        <g transform="translate(250, 780)">
          <rect width="250" height="70" rx="35" fill="#4299E1"/>
          <text x="125" y="48" font-size="28" fill="white" text-anchor="middle" font-weight="bold">📋 コピー</text>
        </g>
        <g transform="translate(550, 780)">
          <rect width="250" height="70" rx="35" fill="#48BB78"/>
          <text x="125" y="48" font-size="28" fill="white" text-anchor="middle" font-weight="bold">📤 共有</text>
        </g>
      `,
      highlight: '📋',
    },
  ];

  const v = variants[variant];

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1920" viewBox="0 0 1080 1920">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#EBF8FF"/>
      <stop offset="100%" style="stop-color:#E9D8FD"/>
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#553C9A"/>
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="1080" height="1920" fill="url(#bgGrad)"/>
  
  <!-- ステータスバー -->
  <rect width="1080" height="100" fill="url(#headerGrad)"/>
  <text x="50" y="65" font-size="28" fill="white">12:34</text>
  <text x="950" y="65" font-size="28" fill="white">100%</text>
  
  <!-- ヘッダー -->
  <rect y="100" width="1080" height="180" fill="url(#headerGrad)"/>
  <text x="540" y="200" font-size="48" fill="white" text-anchor="middle" font-weight="bold">学歴早見表</text>
  <text x="540" y="255" font-size="28" fill="white" opacity="0.9" text-anchor="middle">入学・卒業年度自動計算</text>
  
  <!-- メインコンテンツエリア -->
  <rect x="40" y="320" width="1000" height="1400" rx="24" fill="white" opacity="0.5"/>
  
  <!-- タイトル -->
  <text x="540" y="390" font-size="56" fill="#1a365d" text-anchor="middle" font-weight="bold">${v.highlight} ${v.title}</text>
  <text x="540" y="440" font-size="32" fill="#666" text-anchor="middle">${v.subtitle}</text>
  
  <!-- コンテンツ -->
  ${v.content}
  
  <!-- 下部ナビゲーションバー -->
  <rect y="1800" width="1080" height="120" fill="white"/>
  <line x1="0" y1="1800" x2="1080" y2="1800" stroke="#E2E8F0" stroke-width="2"/>
  <circle cx="270" cy="1860" r="30" fill="#E2E8F0"/>
  <circle cx="540" cy="1860" r="35" fill="#4299E1"/>
  <circle cx="810" cy="1860" r="30" fill="#E2E8F0"/>
</svg>`;
}

// タブレット用スクリーンショット（1920x1200 - 16:10に近い）
function generateTabletScreenshotSVG(size: '7inch' | '10inch'): string {
  const width = size === '7inch' ? 1920 : 2560;
  const height = size === '7inch' ? 1200 : 1600;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#EBF8FF"/>
      <stop offset="100%" style="stop-color:#E9D8FD"/>
    </linearGradient>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2C5282"/>
      <stop offset="100%" style="stop-color:#553C9A"/>
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="${width}" height="${height}" fill="url(#bgGrad)"/>
  
  <!-- ヘッダー -->
  <rect width="${width}" height="${height * 0.12}" fill="url(#headerGrad)"/>
  <text x="${width / 2}" y="${height * 0.07}" font-size="${height * 0.04}" fill="white" text-anchor="middle" font-weight="bold">学歴早見表 - 入学・卒業年度自動計算</text>
  
  <!-- 左パネル：入力フォーム -->
  <rect x="${width * 0.03}" y="${height * 0.16}" width="${width * 0.44}" height="${height * 0.78}" rx="20" fill="white" opacity="0.9"/>
  <text x="${width * 0.25}" y="${height * 0.24}" font-size="${height * 0.035}" fill="#1a365d" text-anchor="middle" font-weight="bold">📅 生年月日を入力</text>
  
  <rect x="${width * 0.06}" y="${height * 0.28}" width="${width * 0.38}" height="${height * 0.08}" rx="12" fill="#F7FAFC" stroke="#E2E8F0" stroke-width="2"/>
  <text x="${width * 0.09}" y="${height * 0.33}" font-size="${height * 0.025}" fill="#666">生年月日</text>
  <text x="${width * 0.28}" y="${height * 0.33}" font-size="${height * 0.028}" fill="#333" font-weight="bold">2000年 4月 15日</text>
  
  <rect x="${width * 0.1}" y="${height * 0.42}" width="${width * 0.3}" height="${height * 0.06}" rx="30" fill="#4299E1"/>
  <text x="${width * 0.25}" y="${height * 0.46}" font-size="${height * 0.025}" fill="white" text-anchor="middle" font-weight="bold">計算する</text>
  
  <!-- 右パネル：結果 -->
  <rect x="${width * 0.52}" y="${height * 0.16}" width="${width * 0.44}" height="${height * 0.78}" rx="20" fill="white" opacity="0.9"/>
  <text x="${width * 0.74}" y="${height * 0.24}" font-size="${height * 0.035}" fill="#1a365d" text-anchor="middle" font-weight="bold">🎓 学歴一覧</text>
  
  <!-- 学歴リスト -->
  <g transform="translate(${width * 0.54}, ${height * 0.28})">
    <rect width="${width * 0.4}" height="${height * 0.1}" rx="10" fill="#EBF8FF"/>
    <text x="${width * 0.02}" y="${height * 0.04}" font-size="${height * 0.022}" fill="#2C5282" font-weight="bold">小学校</text>
    <text x="${width * 0.02}" y="${height * 0.07}" font-size="${height * 0.018}" fill="#666">2007年4月入学 → 2013年3月卒業</text>
  </g>
  
  <g transform="translate(${width * 0.54}, ${height * 0.40})">
    <rect width="${width * 0.4}" height="${height * 0.1}" rx="10" fill="#F0FFF4"/>
    <text x="${width * 0.02}" y="${height * 0.04}" font-size="${height * 0.022}" fill="#276749" font-weight="bold">中学校</text>
    <text x="${width * 0.02}" y="${height * 0.07}" font-size="${height * 0.018}" fill="#666">2013年4月入学 → 2016年3月卒業</text>
  </g>
  
  <g transform="translate(${width * 0.54}, ${height * 0.52})">
    <rect width="${width * 0.4}" height="${height * 0.1}" rx="10" fill="#FFFAF0"/>
    <text x="${width * 0.02}" y="${height * 0.04}" font-size="${height * 0.022}" fill="#C05621" font-weight="bold">高等学校</text>
    <text x="${width * 0.02}" y="${height * 0.07}" font-size="${height * 0.018}" fill="#666">2016年4月入学 → 2019年3月卒業</text>
  </g>
  
  <g transform="translate(${width * 0.54}, ${height * 0.64})">
    <rect width="${width * 0.4}" height="${height * 0.1}" rx="10" fill="#FAF5FF"/>
    <text x="${width * 0.02}" y="${height * 0.04}" font-size="${height * 0.022}" fill="#6B46C1" font-weight="bold">大学</text>
    <text x="${width * 0.02}" y="${height * 0.07}" font-size="${height * 0.018}" fill="#666">2019年4月入学 → 2023年3月卒業</text>
  </g>
</svg>`;
}

async function generateAssets() {
  // ディレクトリ作成
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('🎨 Generating store assets...\n');

  // 1. フィーチャーグラフィック（1024x500）
  console.log('📸 Generating feature graphic (1024x500)...');
  const featureSvg = generateFeatureGraphicSVG();
  await sharp(Buffer.from(featureSvg))
    .png()
    .toFile(path.join(outputDir, 'feature-graphic.png'));
  console.log('   ✅ feature-graphic.png');

  // 2. 電話スクリーンショット（1080x1920）
  console.log('\n📱 Generating phone screenshots (1080x1920)...');
  for (let i = 0; i < 4; i++) {
    const phoneSvg = generatePhoneScreenshotSVG(i);
    await sharp(Buffer.from(phoneSvg))
      .png()
      .toFile(path.join(outputDir, `phone-screenshot-${i + 1}.png`));
    console.log(`   ✅ phone-screenshot-${i + 1}.png`);
  }

  // 3. 7インチタブレットスクリーンショット
  console.log('\n📱 Generating 7-inch tablet screenshot (1920x1200)...');
  const tablet7Svg = generateTabletScreenshotSVG('7inch');
  await sharp(Buffer.from(tablet7Svg))
    .png()
    .toFile(path.join(outputDir, 'tablet-7inch-screenshot.png'));
  console.log('   ✅ tablet-7inch-screenshot.png');

  // 4. 10インチタブレットスクリーンショット
  console.log('\n📱 Generating 10-inch tablet screenshot (2560x1600)...');
  const tablet10Svg = generateTabletScreenshotSVG('10inch');
  await sharp(Buffer.from(tablet10Svg))
    .png()
    .toFile(path.join(outputDir, 'tablet-10inch-screenshot.png'));
  console.log('   ✅ tablet-10inch-screenshot.png');

  console.log('\n✨ All store assets generated successfully!');
  console.log(`\n📂 Output directory: ${outputDir}`);
  console.log('\n📋 Generated files:');
  console.log('   • feature-graphic.png (1024x500) - フィーチャーグラフィック');
  console.log('   • phone-screenshot-1.png (1080x1920) - 電話スクリーンショット1');
  console.log('   • phone-screenshot-2.png (1080x1920) - 電話スクリーンショット2');
  console.log('   • phone-screenshot-3.png (1080x1920) - 電話スクリーンショット3');
  console.log('   • phone-screenshot-4.png (1080x1920) - 電話スクリーンショット4');
  console.log('   • tablet-7inch-screenshot.png (1920x1200) - 7インチタブレット');
  console.log('   • tablet-10inch-screenshot.png (2560x1600) - 10インチタブレット');
}

generateAssets().catch(console.error);
