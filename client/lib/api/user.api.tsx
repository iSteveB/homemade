export const getUserById = async (id: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch user');
	}

	return response.json();
};

export const getUserByUsername = async (username: string) => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${username}`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch user');
	}
	return response.json();
};

export const getAllUsers = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/users`
	);

	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}

	return response.json();
};
