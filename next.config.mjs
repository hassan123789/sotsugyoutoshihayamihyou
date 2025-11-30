/** @type {import('next').NextConfig} */
const nextConfig = {
  // SSG用の設定
  output: 'export',
  // 画像最適化（静的エクスポート時はunoptimized）
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
