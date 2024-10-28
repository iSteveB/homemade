import type { Config } from 'tailwindcss';

const config: Config = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#53795A', // green
				secondary: '#333135', // dark
				accent: '#F5B651', // yellow
				neutral: '#F9F5F1', // light
				dark: {
					primary: '#333135', // dark
					secondary: '#53795A', // green
					accent: '#F5B651', // yellow
					neutral: '#1A1A1A', // black
				},
			},
		},
	},
	variants: {
		extends: {},
	},
	plugins: [require('tailwindcss-animate')],
};
export default config;
