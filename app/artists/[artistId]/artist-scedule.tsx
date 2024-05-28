"use client";
import { Artist, Live } from '@/lib/Type';
import { createClient } from '@/utils/supabase/client';
import React, { useCallback, useEffect, useState } from 'react'

export default function ArtistSchedule({artistId}:{artistId:string}) {
    const [liveData, setLiveData] = useState<Live[]>([]);
    const [artistData, setArtistData] = useState<Artist|null>(null);
    const [loading, setLoading] = useState(true);

    const supabase = createClient();
    const getArtist = useCallback(async () => {
        try {
            setLoading(true);
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
                <div>
                    <img src={artistData.artist_image} alt={artistData.artist_name} />
                    <p>{artistData.music_type}</p>
                </div>
            )}
            <div>
                {liveData.length > 0 ? (
                    liveData.map((live) => (
                        <div key={live.live_id}>
                            <h2>{live.live_title}</h2>
                            <p>{live.venue}</p>
                            <p>{live.date.toString()}</p>
                        </div>
                    ))
                ) : (
                    <p>ライブデータがありません</p>
                )}
            </div>
        </div>
    );
}