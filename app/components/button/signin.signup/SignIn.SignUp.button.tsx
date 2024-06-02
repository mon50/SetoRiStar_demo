"use client";
import styles from './SignIn.SignUp.button.module.css';
import { useRouter } from 'next/navigation';
import React from 'react'

const SignInSignUpButton = () => {
    const router = useRouter();

    const handleClick = () => {
      router.push('/signin');
    };

  return (
      <button className={`${styles.button} ${styles.horizontal}`} onClick={handleClick}>新規登録・ログインはこちら</button>
  );
}

export default SignInSignUpButton