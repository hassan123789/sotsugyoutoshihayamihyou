/**
 * Shared Module - 共有カーネル
 *
 * Feature-Sliced Design (FSD) に基づく構成
 * - ui: 再利用可能なUIコンポーネント
 * - lib: ユーティリティ関数
 * - api: API関連のヘルパー
 * - config: 設定・定数
 * - types: 共有型定義
 */

// UI コンポーネント
export * from '../components/ui';

// ライブラリ（型・関数）
export * from '../lib';

// 設定
export * from './config';
