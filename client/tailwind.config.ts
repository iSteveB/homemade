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
				primary: '#53795A',
				secondary: '#333135',
				accent: '#F5B651',
				background: '#F9F5F1',
				dark: {
					primary: '#333135',
					secondary: '#53795A',
					accent: '#F5B651',
					background: '#1A1A1A',
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
