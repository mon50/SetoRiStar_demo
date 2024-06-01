"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';


export default function IndexPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUser(user);
      }
      setLoading(false);
    };

    fetchUser();
  }, [supabase]);

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/main'); // ユーザーがログインしている場合、メインページへリダイレクト
      } else {
        router.push('/signin'); // ユーザーがログインしていない場合、サインインページへリダイレクト
      }
    }
  }, [loading, user, router]);

  return (
    <div className="App">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>Redirecting...</div>
      )}
    </div>
  );
}
