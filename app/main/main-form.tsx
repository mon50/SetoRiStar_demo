//app/main/main-form.tsx
"use client"
import { createClient } from '@/utils/supabase/client';
import { Link } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js'

export default function MainForm({ user }: { user: User | null }) {
    const [loading, setLoading] = useState(true)
    const [user_id, setUser_id] = useState<string | null>(null)
    const [displayName, setDisplayName] = useState<string | null>(null)
    const [display_image, setDisplayImage] = useState<string | null>(null)
    const supabase = createClient();
    
    //TODO: user情報はuseAuthから取得するべきか、supabase.auth.getUser()から取得するべきか検討　accountsではsupabase.auth.getUser()を使用している
    //storeを用いた情報管理と、revalidatePathを用いたキャッシュ管理が両方実行されている状態。
    //const { user, signIn } = useAuth();
    //const  getData  = await supabase.auth.getUser();

    const getUser = useCallback(async () => {
        if (!user) return
    
        try {
          setLoading(true);
    
          const { data, error, status } = await supabase
            .from('users')
            .select(`user_id,display_name, display_image`)
            .eq('auth_id', user.id)
            .single();
    
          if (error && status !== 406) {
            console.log(error);
            throw error;
          }
    
          if (data) {
            setDisplayName(data.display_name);
            setDisplayImage(data.display_image);
            setUser_id(data.user_id);
          }
        } catch (error) {
          alert('Error loading user data!');
        } finally {
          setLoading(false);
        }
      }, [user, supabase])
    
      useEffect(() => {
        getUser();
        console.log(user);
      }, [user, getUser]);
    
      if (loading) {
        return <p>読み込み中...</p>; // ユーザーデータを取得中に読み込み状態を表示
    }
  

  return (
    <>
        <h1>MainPage</h1>
        <h1>ようこそ！ {displayName}</h1>
        <Link href={`/${user_id}`}>→ {displayName}のページ</Link>
        <Link href={"/artists"}>→ アーティストページ</Link>
        {/* <Button onClick={}>ログアウト</Button> */}
        
    </>
  );
}
