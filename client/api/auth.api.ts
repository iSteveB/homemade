import { LoginCredentials, SignupCredentials } from '@/types/auth';

export const signup = async (credentials: SignupCredentials) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
			credentials: 'include',
		}
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Signup failed');
	}
	return response.json();
};

export const login = async (credentials: LoginCredentials) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(credentials),
			credentials: 'include',
		}
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(errorData.message || 'Login failed');
	}

	return await response.json();
};
