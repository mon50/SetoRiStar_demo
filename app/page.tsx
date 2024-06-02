"use client";
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import userUser from '@/hooks/useUser';


export default function IndexPage() {
  const { session } = userUser();
  const router = useRouter();


  useEffect(() => {
      if (session) {
        router.push('/main'); // ユーザーがログインしている場合、メインページへリダイレクト
      } else {
        router.push('/signin'); // ユーザーがログインしていない場合、サインインページへリダイレクト
      }
  }, [session, router]);

  return (
    <div className="App">
      {session ? (
        <div>Loading...ToMain</div>
      ) : (
        <div>Redirecting...ToSignInPage</div>
      )}
    </div>
  );
}
