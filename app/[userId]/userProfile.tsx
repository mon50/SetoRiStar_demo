"use client";
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'
import React, { use, useCallback, useEffect, useState } from 'react'
import FavoriteArtistList from './favorite/favoriteArtist-list';

export default function UserProfile  ({ user }: { user: User | null }) {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="w-full max-w-md bg-white rounded-2xl overflow-hidden shadow-lg dark:bg-gray-900">
        <div className="relative h-32 bg-[#7289da]">
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
            <div className="bg-white rounded-full w-24 h-24 border-4 border-white">
              <img src={display_image??""} alt="User Avatar" className="rounded-full w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="pt-16 pb-6 px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{displayName}</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">{email}</p>
          <div className="flex items-center justify-center mt-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <span>Live大好き</span>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700">
          <div className="px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">FavoriteArtists</h3>
            <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
                {user_id? <FavoriteArtistList userId={user_id}/>:<p>お気に入りアーティストが見つかりません。</p>}
    </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4">
            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">参戦履歴</h3>
            <div className="space-y-4 mt-4">
              <div className="flex items-start">
                <img src="/placeholder.svg" alt="User Avatar" className="rounded-full w-10 h-10 mr-4" />
                <div>
                  <p className="text-gray-800 dark:text-gray-100 font-bold">John Doe</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Joined a new server</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start">
                <img src="/placeholder.svg" alt="User Avatar" className="rounded-full w-10 h-10 mr-4" />
                <div>
                  <p className="text-gray-800 dark:text-gray-100 font-bold">John Doe</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Sent a message in #general</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">4 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
