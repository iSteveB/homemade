export const getAllPosts = async () => {
  const response = await fetch('http://localhost:8080/posts');

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
};

export const getPostById = async (id: string) => {
  const response = await fetch(`http://localhost:8080/posts/${id}`);

  if (!response.ok) {
    throw new Error('Failed to fetch post');
  }

  return response.json();
};

export const getPostsByUserId = async (userId: string) => {
  const response = await fetch(`http://localhost:8080/users/${userId}/posts`);

  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  } 

  return response.json();
}

export const createPost = async (post: any) => {
  const response = await fetch('http://localhost:8080/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error('Failed to create post');
  }

  return response.json();
};

