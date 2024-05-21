//app/main/page.tsx
"use client";
import { useAppSelector } from '@/lib/hooks';
import supabase from '@/utils/supabase/supabaseClient';
import { Button, Link } from "@mui/material";
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const MainPage = () => {
  const loginState = useAppSelector((state) => state.user.signIn);
  const userId = useAppSelector((state) => state.user.user?.uid);
  const userName = useAppSelector((state) => state.user.user?.displayName);
  const router = useRouter();

  useEffect(() => {
    if (!loginState) {
      router.push('/signin');
    }
  }, []);

  const Logout = async() => {
    console.log('logout button clicked');
    try{
      console.log("supabase Logout 実行開始");
      const { error:logoutError } = await supabase.auth.signOut()
      console.log("supabase Logout 実行終了");
      if (logoutError) {
        throw logoutError;
      }
      await router.push("/signin");
    }catch{
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <h1>MainPage</h1>
      {userName ? <h1>Welcome! {userName}</h1> : <h1>Welcome Anonymous User</h1>}
      <Link href={`/${userId}`}>→ {userName} page</Link>
      <Link href={"/artists"}>→ Artist Page</Link>
      <Button onClick={Logout}>Logout</Button>
    </>
  );
}

export default MainPage;
