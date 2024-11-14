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

export const getTimeElapsed = (date: Date): string => {
	const now = new Date();

	const utcDate = new Date(
		date.getUTCFullYear(),
		date.getUTCMonth(),
		date.getUTCDate(),
		date.getUTCHours(),
		date.getUTCMinutes(),
		date.getUTCSeconds()
	);
	const difference = now.getTime() - utcDate.getTime();

	const minutes = Math.floor(difference / (1000 * 60));
	const hours = Math.floor(difference / (1000 * 60 * 60));
	const days = Math.floor(difference / (1000 * 60 * 60 * 24));

	if (minutes == 0 && minutes <= 5) {
		return "à l'instant";
	} else if (minutes > 5 && minutes < 60) {
		return `${minutes} min${minutes > 1 ? 's' : ''}`;
	} else if (minutes >= 60 && hours < 24) {
		return `${hours}h`;
	} else if (hours >= 24 && days < 7) {
		return `${days} jour${days > 1 ? 's' : ''}`;
	} else {
		const options: Intl.DateTimeFormatOptions = {
			day: 'numeric',
			month: 'short',
			timeZone: 'UTC',
		};
		return date.toLocaleDateString('fr-FR', options);
	}
};

export const getPictureEndpoint = (
	username: string,
	endpoint: 'avatar' | 'banner'
) => {
	const validEnpoints = ['avatar', 'banner'] as const;

	if (!validEnpoints.includes(endpoint)) {
		throw new Error('Invalid endpoint: ' + endpoint);
	}
	const BASE_URL = 'http://localhost:8080/users/';
	return `${BASE_URL}${username}/${endpoint}`;
};
