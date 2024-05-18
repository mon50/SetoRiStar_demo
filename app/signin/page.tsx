"use client";
import React from 'react'
import LoginWithGoogle from '../components/signin/LoginWithGoogle'
import { useAppSelector } from '@/lib/hooks';
import { redirect } from  "next/navigation";
import LoginWithDefault from '../components/signin/LoginWithDefault';
import { Link } from '@mui/material';

const LoginPage = () => {
    const user = useAppSelector((state) => state.user.user);


    if (user) {
        redirect('/');
    }

    return (
      <div className="App">
        <LoginWithGoogle/>
        <LoginWithDefault/>
        <Link href="/signup">新規作成</Link>
      </div>
    );
}

export default LoginPage