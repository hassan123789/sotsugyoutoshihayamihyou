'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>;
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function PWAProvider({ children }: { children: React.ReactNode }) {
	const [deferredPrompt, setDeferredPrompt] =
		useState<BeforeInstallPromptEvent | null>(null);
	const [showInstallBanner, setShowInstallBanner] = useState(false);

	useEffect(() => {
		// Service Workerの登録（本番環境のみ）
		if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
			navigator.serviceWorker
				.register('/sw.js')
				.then((registration) => {
					console.log('SW registered:', registration.scope);
				})
				.catch((error) => {
					console.log('SW registration failed:', error);
				});
		}

		// インストールプロンプトのイベント
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault();
			setDeferredPrompt(e as BeforeInstallPromptEvent);
			// 既にインストール済みかチェック
			if (!window.matchMedia('(display-mode: standalone)').matches) {
				setShowInstallBanner(true);
			}
		};

		window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

		return () => {
			window.removeEventListener(
				'beforeinstallprompt',
				handleBeforeInstallPrompt,
			);
		};
	}, []);

	const handleInstall = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const { outcome } = await deferredPrompt.userChoice;

		if (outcome === 'accepted') {
			setShowInstallBanner(false);
		}
		setDeferredPrompt(null);
	};

	const dismissBanner = () => {
		setShowInstallBanner(false);
		// 24時間非表示
		localStorage.setItem('pwa-banner-dismissed', Date.now().toString());
	};

	// 24時間以内に閉じていたら表示しない
	useEffect(() => {
		const dismissed = localStorage.getItem('pwa-banner-dismissed');
		if (
			dismissed &&
			Date.now() - parseInt(dismissed, 10) < 24 * 60 * 60 * 1000
		) {
			setShowInstallBanner(false);
		}
	}, []);

	return (
		<>
			{children}

			{/* インストールバナー */}
			{showInstallBanner && (
				<div
					className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 p-4 rounded-xl shadow-xl"
					style={{
						background: 'var(--color-card)',
						border: '1px solid var(--color-border)',
					}}
				>
					<div className="flex items-start gap-3">
						<div
							className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
							style={{
								background:
									'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
							}}
						>
							<svg
								className="w-5 h-5 text-white"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 14l9-5-9-5-9 5 9 5z"
								/>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
								/>
							</svg>
						</div>
						<div className="flex-1 min-w-0">
							<p
								className="font-medium text-sm"
								style={{ color: 'var(--color-text)' }}
							>
								ホーム画面に追加
							</p>
							<p
								className="text-xs mt-0.5"
								style={{ color: 'var(--color-text-muted)' }}
							>
								アプリのように素早くアクセスできます
							</p>
						</div>
					</div>
					<div className="flex gap-2 mt-3">
						<button
							onClick={dismissBanner}
							className="flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors"
							style={{
								background: 'var(--color-border-light)',
								color: 'var(--color-text-secondary)',
							}}
						>
							後で
						</button>
						<button
							onClick={handleInstall}
							className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition-colors"
							style={{
								background:
									'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
							}}
						>
							追加
						</button>
					</div>
				</div>
			)}
		</>
	);
}
