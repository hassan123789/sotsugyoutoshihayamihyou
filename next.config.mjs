/** @type {import('next').NextConfig} */
const nextConfig = {
	// 画像最適化
	images: {
		unoptimized: true,
	},

	// Next.js 16 実験的機能
	experimental: {
		// View Transitions API - ページ遷移アニメーション
		viewTransition: true,
	},

	// NOTE: cacheComponents (旧PPR) は new Date() を使用するコンポーネントと
	// 互換性の問題があるため、現時点では無効化
	// 将来的にコンポーネントをSuspense境界でラップすれば有効化可能

	// セキュリティヘッダー
	headers: async () => [
		{
			source: '/:path*',
			headers: [
				{
					key: 'X-DNS-Prefetch-Control',
					value: 'on',
				},
				{
					key: 'X-Content-Type-Options',
					value: 'nosniff',
				},
				{
					key: 'Referrer-Policy',
					value: 'strict-origin-when-cross-origin',
				},
				{
					key: 'Permissions-Policy',
					value: 'camera=(), microphone=(), geolocation=()',
				},
			],
		},
	],

	// パフォーマンス最適化
	poweredByHeader: false,
	reactStrictMode: true,
	compress: true,
};

export default nextConfig;
