/**
 * Features Module - ビジネス機能
 *
 * Feature-Sliced Design (FSD) に基づく構成
 * 各機能は独立したモジュールとして管理
 */

// 共有コンポーネント（既存のfeaturesから再エクスポート）
export * from '../components/features';
// 計算機能
export * from './calculator';
