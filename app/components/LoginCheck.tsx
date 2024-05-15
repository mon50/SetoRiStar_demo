"use client";
import React from 'react'
import { useAppSelector } from "@/lib/hooks";
import { auth } from "@/lib/firebase";
import { Button } from '@mui/material';
import MainPage from '../main/page';
import Link from 'next/link';
import styles from '../styles/layout.module.css';
import { usePathname } from 'next/navigation';

const LoginCheck = () => {
    const pathname = usePathname();
    const user = useAppSelector((state) => state.user.user);

    return (
      <div className="App">
        {user ? (
        <>
          <h1>Welcome! {user.displayName}</h1>
          <MainPage/>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </>
        ):(
        <>
              <Link className={`${styles.link} ${pathname === "/signin" ? styles.active : ""}`}
        href="/signin"
      >
        SIGNIN
      </Link>
      
      
      <Link className={`${styles.link} ${pathname === "/signup" ? styles.active : ""}`}
        href="/signup"
      >
        SIGNUP
      </Link>
        </>
        )}
      </div>
    );
  }

export default LoginCheck