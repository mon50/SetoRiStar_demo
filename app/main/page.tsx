//app/main/page.tsx
"use client";
import useAuth from '@/lib/features/signin/useAuth';
import { createClient } from '@/utils/supabase/client';
import { Button, Link } from "@mui/material";
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

  const HomePage = () => {
    const supabase = createClient();
    const { user, signIn } = useAuth();

  useEffect(() => {
    if (!signIn) {
      redirect('/signin')
    }
  }, [signIn]);

  const Logout = async() => {
    console.log('logout button clicked');
    try{
      console.log("supabase Logout 実行開始");
      const { error:logoutError } = await supabase.auth.signOut()
      console.log("supabase Logout 実行終了");
      if (logoutError) {
        throw logoutError;
      }
      redirect("/signin");
    }catch{
      alert('エラーが発生しました');
    }
  };

  return (
    <>
      <h1>MainPage</h1>
      <h1>Welcome! {user?.display_name}</h1>
      <Link href={`/${user?.user_id}`}>→ {user?.display_name} page</Link>
      <Link href={"/artists"}>→ Artist Page</Link>
      <Button onClick={Logout}>Logout</Button>
    </>
  );
}

export default HomePage;
