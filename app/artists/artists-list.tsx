"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { Link } from '@mui/material';
import { createClient } from '@/utils/supabase/client';
import { Artist } from '@/types/ArtistType';
import FavoriteButton from '../components/button/favorite/favorite.button';
import { User } from '@supabase/supabase-js';

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
        <h1>Artists Page</h1>
        {artistList.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Artist ID</th>
                <th>Artist Name</th>
                <th>Artist Image</th>
                <th>Music Type</th>
                <th>Favorite</th>
              </tr>
            </thead>
            <tbody>
              {artistList.map((artist) => (
                <tr key={artist.artist_id}>
                  <td>{artist.artist_id}</td>
                  <td><Link href={`/artists/${artist.artist_id}`}>{artist.artist_name}</Link></td>
                  <td>
                    <img src={artist.artist_image} alt={artist.artist_name} width="50" height="50" />
                  </td>
                  <td>{artist.music_type}</td>
                  <td><FavoriteButton artistId={artist.artist_id} userId={userId}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No artists found</div>
        )}
      </>
    );
  };