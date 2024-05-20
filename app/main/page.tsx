//app/main/page.tsx
"use client";
import { useAppSelector } from '@/lib/hooks';
import supabase from '@/lib/supabaseClient';
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
  }, [userId, router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/signin');
  };

  return (
    <>
      <h1>MainPage</h1>
      {userName ? <h1>Welcome! {userName}</h1> : <h1>Welcome Anonymous User</h1>}
      <Link href={`/${userId}`}>→ {userName} page</Link>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}

export default MainPage;
