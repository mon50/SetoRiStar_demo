"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from '@mui/material';
import { createClient } from '@/utils/supabase/client';
import { Artist } from '@/types/ArtistType';
import FavoriteButton from '../components/button/favorite/favorite.button';
import { User } from '@supabase/supabase-js';
import ProfileCard from '../components/ProfileCard';

export default function ArtistsList({ user }: { user: User | null }){

    const [artistList, setArtistList] = useState<Artist[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [userId, setUserId] = useState<string | null>(null);
    const supabase = createClient();
  
    const getArtists = useCallback(async () => {

        try{
            setLoading(true);
            const { data:userId } = await supabase
            .from('users')
            .select(`user_id`)
            .eq('auth_id', user?.id)
            .single();
            
            if (userId) {
                setUserId(userId.user_id);
            }

            const { data, error, status} = await supabase
            .from('artists')
            .select('*');

            if (error && status !== 406) {
                console.log(error);
                throw error;
              }
        
              if (data) {
                setArtistList(data);
              }
        }   catch (error) {  
            alert('Error loading user data!');
        } finally {
          setLoading(false);
        }
      }, [supabase])

    useEffect(() => {
      getArtists();
    }, [getArtists]);

    if (loading) {
        return <p>読み込み中...</p>; // アーティストデータを取得中に読み込み状態を表示
    }
  
    return (
      <>
        <h1 className="text-2xl font-bold mb-4">Artists Page</h1>
        {artistList.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {artistList.map((artist) => (
              <ProfileCard key={artist.artist_id} artist={artist} userId={userId} />
            ))}
          </div>
        ) : (
          <div>No artists found</div>
        )}
      </>
    );
  };