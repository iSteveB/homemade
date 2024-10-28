"use client"
import SignupForm from '@/components/authentication/SignupForm';
import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <SignupForm />
      <Link
					href='/login'
					className=' text-secondary underline dark:text-neutral'>
					{' '}
					J&apos;ai déjà un compte ?
				</Link>
    </div>
  );
};

export default Register;