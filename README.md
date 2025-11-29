# 入学・卒業年度自動計算表【西暦・和暦】（年号早見表）

生年月日を入力すると、入学・卒業年度を西暦と和暦で自動計算するWebアプリケーションです。

## ディレクトリ構成

```
sotsugyoutoshihayamihyou/
├── src/
│   └── main.ts          # TypeScriptソースコード
├── public/
│   ├── index.html       # メインHTMLファイル
│   ├── styles.css       # スタイルシート
│   └── main.js          # コンパイル後のJavaScript
├── package.json
├── tsconfig.json
└── README.md
```

## 開発

### 必要条件
- Node.js

### インストール
```bash
npm install
```

### ビルド
TypeScriptをJavaScriptにコンパイルします：
```bash
npm run build
```

### 使用方法
`public/index.html`をブラウザで開いてください。

## 機能
- 生年月日から小学校〜大学の入学・卒業年度を計算
- 西暦と和暦（明治・大正・昭和・平成・令和）の両方で表示
- ダークモード切り替え対応
