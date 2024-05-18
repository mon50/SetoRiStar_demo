"use client";
import React from 'react'
import { useAppSelector } from "@/lib/hooks";
import { Button } from '@mui/material';
import MainPage from '../main/page';
import Link from 'next/link';
import styles from '../styles/layout.module.css';
import { usePathname } from 'next/navigation';
import supabase from '../../lib/supabaseClient';
import LoginHook from '@/lib/features/signin/LoginHook';
import { logout } from '../../lib/features/user/userSlice';

const LoginCheck = () => {
    const pathname = usePathname();
    const user = useAppSelector((state) => state.user.user);

    return (
        <div className="App">
          {user ? (
          <LoginHook>
            {user.displayName ?<h1>Welcome! {user.displayName}</h1>:<h1>Welcome Anonymous User</h1> }
            <MainPage/>
            <Button onClick={async () => {await supabase.auth.signOut();logout()}}>Logout</Button>
          </LoginHook>
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