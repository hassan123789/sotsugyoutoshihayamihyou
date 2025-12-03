'use client';

import { useCallback, useState } from 'react';
import { useLocale } from '@/lib/i18n/LocaleContext';

interface CopyButtonProps {
	getText: () => string;
	label?: string;
	className?: string;
}

export function CopyButton({
	getText,
	label,
	className = '',
}: CopyButtonProps) {
	const { t } = useLocale();
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState('');

	const displayLabel = label || t.copyResume;

	const handleCopy = useCallback(async () => {
		const text = getText();
		if (!text) {
			setToastMessage(t.copyFailed);
			setShowToast(true);
			setTimeout(() => setShowToast(false), 2000);
			return;
		}

		try {
			await navigator.clipboard.writeText(text);
			setToastMessage(t.copySuccess);
			setShowToast(true);
			setTimeout(() => setShowToast(false), 2000);
		} catch {
			// フォールバック
			try {
				const textarea = document.createElement('textarea');
				textarea.value = text;
				textarea.style.position = 'fixed';
				textarea.style.opacity = '0';
				document.body.appendChild(textarea);
				textarea.select();
				document.execCommand('copy');
				document.body.removeChild(textarea);
				setToastMessage(t.copySuccess);
				setShowToast(true);
				setTimeout(() => setShowToast(false), 2000);
			} catch {
				setToastMessage(t.copyFailed);
				setShowToast(true);
				setTimeout(() => setShowToast(false), 2000);
			}
		}
	}, [getText, t]);

	return (
		<>
			<button
				type="button"
				onClick={handleCopy}
				className={`
          inline-flex items-center gap-2 px-6 py-3
          font-medium rounded-xl
          transition-all duration-200
          ${className}
        `}
				style={{
					background:
						'linear-gradient(135deg, var(--color-success) 0%, var(--color-primary) 100%)',
					color: 'white',
					boxShadow: '0 2px 8px var(--color-shadow-success)',
				}}
				onMouseEnter={(e) => {
					e.currentTarget.style.transform = 'translateY(-1px)';
					e.currentTarget.style.boxShadow =
						'0 4px 16px var(--color-shadow-success)';
				}}
				onMouseLeave={(e) => {
					e.currentTarget.style.transform = 'translateY(0)';
					e.currentTarget.style.boxShadow =
						'0 2px 8px var(--color-shadow-success)';
				}}
			>
				<svg
					className="w-5 h-5"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
					/>
				</svg>
				{displayLabel}
			</button>

			{/* トースト通知 */}
			{showToast && (
				<div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 animate-toast-in">
					<div
						className="px-6 py-3 rounded-xl shadow-xl font-medium"
						style={{
							background: 'var(--color-text)',
							color: 'var(--color-bg)',
						}}
					>
						{toastMessage}
					</div>
				</div>
			)}
		</>
	);
}
