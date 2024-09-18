import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { THEME_TYPES } from '@/constants';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const applyThemePreference = (theme: string) => {
	const { THEME_DARK, THEME_LIGHT } = THEME_TYPES;
	const root = window.document.documentElement;
	const isDark = theme === THEME_DARK;
	root.classList.remove(isDark ? THEME_LIGHT : THEME_DARK);
	root.classList.add(theme);
};
