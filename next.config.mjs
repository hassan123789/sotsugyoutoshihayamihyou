/** @type {import('next').NextConfig} */
const nextConfig = {
	// 画像最適化
	images: {
		unoptimized: true,
	},

	// View Transitions API (Next.js 16)
	experimental: {
		viewTransition: true,
	},

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
