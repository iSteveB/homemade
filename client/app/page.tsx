'use client';

import React from 'react';
import useAuth from '@/hook/useAuth';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();


function App() {
	const { login, loginError, loginIsLoading, logout, signup, signupError, signupIsLoading  } = useAuth();

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email = e.currentTarget.email.value;
		const password = e.currentTarget.password.value;
		login({ email, password });
	};

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const username = e.currentTarget.username.value;
    signup({ email, password, username });
  };

	return (
    <QueryClientProvider client={queryClient}>
		<div>
			<form onSubmit={handleLogin}>
				<input type='email' name='email' placeholder='Email' required />
				<input
					type='password'
					name='password'
					placeholder='Password'
					required
				/>
				<button type='submit' disabled={loginIsLoading}>
					{loginIsLoading ? 'Logging in...' : 'Login'}
				</button>
				{loginError && <div>Login failed</div>}
			</form>

      <button onClick={logout}>Logout</button>

      <form onSubmit={handleRegister}>
        <input type='email' name='email' placeholder='Email' required />
        <input
          type='password'
          name='password'
          placeholder='Password'
          required
        />
        <input
          type='text'
          name='username'
          placeholder='Username'
          required
        />
        {signupError && <div>Signup failed</div>}
        <button type='submit' disabled={signupIsLoading}>
          {signupIsLoading ? 'Registering...' : 'Register'}
        </button>
      </form>

		</div>
    </QueryClientProvider>
	);
}

export default App;
