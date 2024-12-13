import { useRouter } from 'next/navigation';

const useLogout = () => {
	const router = useRouter();

	const logout = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
			}
		);

		if (!response.ok) {
			throw new Error('Logout failed');
		}

		router.push('/');
		return response.json();
	};

	return { logout };
};

export default useLogout;
