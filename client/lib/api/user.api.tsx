export const getUserById = async (id: string) => {
  const response = await fetch(`http://localhost:8080/users/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }

  return response.json();
};

export const getUserByUsername = async (username: string) => {
  const response = await fetch(`http://localhost:8080/users/${username}`);

  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
    return response.json();
}

export const getAllUsers = async () => {
  const response = await fetch('http://localhost:8080/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};