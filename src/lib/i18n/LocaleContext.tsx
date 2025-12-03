'use client';

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import {
	defaultLocale,
	type Locale,
	locales,
	type Translations,
	translations,
} from './translations';

interface LocaleContextType {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: Translations;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
	const [locale, setLocaleState] = useState<Locale>(defaultLocale);

	useEffect(() => {
		// ブラウザの言語設定から初期値を設定
		const savedLocale = localStorage.getItem('locale') as Locale;
		if (savedLocale && locales.includes(savedLocale)) {
			setLocaleState(savedLocale);
		} else {
			const browserLang = navigator.language.slice(0, 2);
			const detectedLocale = locales.find((l) => l === browserLang) || defaultLocale;
			setLocaleState(detectedLocale);
		}
	}, []);

	const setLocale = (newLocale: Locale) => {
		setLocaleState(newLocale);
		localStorage.setItem('locale', newLocale);
	};

	const t = translations[locale];

	return (
		<LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
	);
}

export function useLocale() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocale must be used within a LocaleProvider');
	}
	return context;
}
