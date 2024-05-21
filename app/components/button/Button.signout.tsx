//app/main/page.tsx
"use client";
import supabase from '@/utils/supabase/supabaseClient';
import { Button} from "@mui/material";
import { useRouter } from 'next/navigation';
import React from 'react';

const SignOutButton = () => {
  const router = useRouter();

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
  }

  return (
      <Button onClick={Logout}>Logout</Button>
  );
}

export default SignOutButton;