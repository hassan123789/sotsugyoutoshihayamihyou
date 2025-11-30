/** @type {import('next').NextConfig} */
const nextConfig = {
  // 画像最適化
  images: {
    unoptimized: true,
  },
  // i18n設定（静的エクスポートでは使用不可なのでミドルウェアで対応）
};

export default nextConfig;
