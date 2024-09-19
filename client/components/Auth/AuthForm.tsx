"use client";
import { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

const AuthForm = () => {
  const [login, setLogin] = useState(false);
	return <div className="flex flex-col gap-4">
    {login ? <LoginForm /> : <SignupForm />}
    <button className='text-sm hover:underline' onClick={() => setLogin(!login)}>
      {login ? 'S\'inscrire ?' : 'J\'ai déjà un compte ?'}
    </button>
  </div>;
};

export default AuthForm;
