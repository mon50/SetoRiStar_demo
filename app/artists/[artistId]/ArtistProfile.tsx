"use client"
import AddScheduleButton from '@/app/components/button/addSchedule/addSchedule.button';
import FavoriteButton from '@/app/components/button/favorite/favorite.button';
import { Artist, Live } from '@/types/ArtistType';
import { createClient } from '@/utils/supabase/client';
import { User } from '@supabase/supabase-js';
import React, { useCallback, useEffect, useState } from 'react'

export default function ArtistProfile({ artistId, user }: { artistId: string; user: User | null }) {
    // コンポーネントの実装
    const [liveData, setLiveData] = useState<Live[]>([]);
    const [artistData, setArtistData] = useState<Artist|null>(null);
    const [userId, setUserId] = useState<string|null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();
    const getArtist = useCallback(async () => {
        try {
            setLoading(true);
            const { data:userId } = await supabase
            .from('users')
            .select(`user_id`)
            .eq('auth_id', user?.id)
            .single();
            
            if (userId) {
                setUserId(userId.user_id);
            }
            const { data, error, status } = await supabase
                .from('artists')
                .select('*')
                .eq('artist_id', artistId)
                .single();
                
            if (error && status !== 406) {
                console.log(error);
                throw error;
            }
            if (data) {
                setArtistData(data);
            }
        } catch (error) {
            alert('Error loading artist data!');
        }

        try{
            const { data: liveData, error: liveDataError } = await supabase
            .from('lives')
            .select('*')
            .eq('artist_id', artistId);

            if (liveDataError) {
                console.error('Error fetching live data:', liveDataError);

            }
            setLiveData(liveData??[]);
        } catch (error) {
            alert('Error loading live data!');
        }finally{
            setLoading(false);
        }
    },[artistId, supabase])

    useEffect(() => {
        getArtist();
      }, [artistId, getArtist]);
    
      if (loading) {
        return <p>読み込み中...</p>; // ユーザーデータを取得中に読み込み状態を表示
    }
  return (
    <div>
    {artistData && (

    <div className="w-full max-w-[600px] mx-auto">
      <div className="relative h-[200px] overflow-hidden rounded-t-2xl">
        <img src={artistData.artist_image} alt="Cover image" width={600} height={200} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-4">
          <img
            src={artistData.artist_image}
            alt="Profile image"
            width={100}
            height={100}
            className="rounded-full border-4 border-white"
          />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-xl font-bold">John Doe</h1>
        <p>{artistData.music_type}</p>
        <FavoriteButton artistId={artistData.artist_id} userId={userId} />
      </div>
      </div>
      )}
      <div>
      {liveData.length > 0 ? (
                    liveData.map((live) => (
                        <div key={live.live_id} className="grid grid-cols-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 text-center py-4">
                            <h2>{live.live_title}</h2>
                            <p>{live.venue}</p>
                            <p>{live.date.toString()}</p>
                            <AddScheduleButton liveId={live.live_id} userId={userId} />
                        </div>
                    ))
                ) : (
                    <p>ライブデータがありません</p>
                )}

    </div>
    </div>
  )
}
