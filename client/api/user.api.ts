const getUserById = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
		{
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
		}
	);

	if (!response.ok) {
		const errorData = await response.json();
		throw new Error(
			errorData.message ||
				"Problème lors de la récupération de l'utilisateur"
		);
	}
	return response.json();
};
