'use client';

import { type Locale, localeNames, locales, useLocale } from '@/lib/i18n';

export function LanguageSwitcher() {
	const { locale, setLocale } = useLocale();

	return (
		<div className="relative inline-block">
			<select
				value={locale}
				onChange={(e) => setLocale(e.target.value as Locale)}
				className="appearance-none px-3 py-1.5 pr-8 rounded-lg text-sm font-medium transition-all cursor-pointer"
				style={{
					background: 'var(--color-card)',
					color: 'var(--color-text)',
					border: '1px solid var(--color-border)',
				}}
			>
				{locales.map((loc) => (
					<option key={loc} value={loc}>
						{localeNames[loc]}
					</option>
				))}
			</select>
			<svg
				className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
				style={{ color: 'var(--color-text-muted)' }}
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M19 9l-7 7-7-7"
				/>
			</svg>
		</div>
	);
}
