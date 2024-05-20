"use client";
import { Link } from '@mui/material'
import React from 'react'
import SignupWithDefault from '../components/signup/SignupWithDefault'
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

const signupPage = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();


  if (user) {
    router.push('/main');
    return null;
  }
  return (
    <>
    <SignupWithDefault/>
    <Link href="/signin">ログイン</Link>
    </>  
  )
}

export default signupPage