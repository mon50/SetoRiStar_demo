"use client"
import { useCallback, useEffect, useState } from 'react'
import { type User } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'
import { Link } from '@mui/material'

export default function UserForm ({ user }: { user: User | null }) {
    const [loading, setLoading] = useState(true)
    const [user_id, setUser_id] = useState<string | null>(null)
    const [displayName, setDisplayName] = useState<string | null>(null)
    const [display_image, setDisplayImage] = useState<string | null>(null)
    const [email, setEmail] = useState<string | null>(null)
    const supabase = createClient();

    const getUser = useCallback(async () => {
        if (!user) return
    
        try {
          setLoading(true);
    
          const { data, error, status } = await supabase
            .from('users')
            .select(`user_id,display_name, display_image,email`)
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
            setEmail(data.email);
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
    <Link href={'/main'}>←Back to Home</Link>
    <h1>User ID: {user_id}</h1>
    <h1>{displayName}ページ</h1>
    <Link href={`/main`}>← メインのページ</Link>
    <Link href={`/${user_id}/favorite`}>→ お気に入りアーティスト</Link>
    {/* ユーザーIDに基づいたコンテンツを表示 */}
    <h2>User Name: {displayName}</h2>
    <h3>Email: {email}</h3>
    <img src={display_image??""} alt="user icon" />
    <br/>
    <Link href={`/${user_id}/list`}>参加予定のライブ→</Link>
    </>
  )
}
