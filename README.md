# 入学・卒業年度自動計算表【西暦・和暦】（年号早見表）

生年月日を入力すると、入学・卒業年度を西暦と和暦で自動計算するWebアプリケーションです。

## 技術スタック

- **フレームワーク**: Next.js 14 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **UI**: React 18

## ディレクトリ構成

```
sotsugyoutoshihayamihyou/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # ルートレイアウト
│   │   ├── page.tsx        # メインページ
│   │   └── globals.css     # グローバルスタイル
│   ├── components/
│   │   ├── InputForm.tsx       # 入力フォーム
│   │   ├── HistoryTimeline.tsx # 年表タイムライン
│   │   ├── CopyButton.tsx      # クリップボードコピー
│   │   └── index.ts
│   ├── hooks/
│   │   ├── useAcademicHistory.ts  # 状態管理フック
│   │   └── index.ts
│   └── lib/
│       ├── types.ts        # 型定義
│       ├── academic.ts     # 学歴計算ロジック
│       ├── nostalgia.ts    # 懐かしデータベース
│       └── index.ts
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
└── README.md
```

## 開発

### 必要条件
- Node.js 18以上

### インストール
```bash
npm install
```

### 開発サーバー起動
```bash
npm run dev
```
http://localhost:3000 でアクセスできます。

### プロダクションビルド
```bash
npm run build
```

静的サイトとして `out/` ディレクトリに出力されます。

## 機能

### 基本機能
- 生年月日から小学校〜大学院の入学・卒業年度を自動計算
- 西暦と和暦（明治・大正・昭和・平成・令和）の両方で表示
- ダークモード切り替え対応

### 計算モード
- **通常モード**: 生年月日を入力して学歴を計算
- **逆算モード**: 卒業年から生年月日を推定

### 詳細オプション
- **大学種別**: 大学なし / 短大(2年) / 専門(3年) / 大学(4年) / 医歯薬系(6年) / 修士課程 / 博士課程
- **浪人・留年・休学**: 各段階での遅延年数を設定可能

### その他の機能
- 📋 **履歴書コピー**: 計算結果を履歴書形式でクリップボードにコピー
- 🎵 **懐かしの年表**: 各年のヒット曲・ニュース・流行を表示（1980年〜2025年対応）
- 💾 **入力内容の保存**: LocalStorageで入力状態を自動保存

## ライセンス

MIT
