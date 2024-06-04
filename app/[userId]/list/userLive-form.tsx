"use client";
import { Link } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AddScheduleButton from "@/app/components/button/addSchedule/addSchedule.button";

export default function UserLiveForm({ userId }: { userId: string }) {
    const [liveData, setLiveData] = useState<any[]>([]);

    const [loading, setLoading] = useState(true)

    const supabase = createClient();
    const getUser = useCallback(async () => {
        if (!userId) return
    
        try {
          setLoading(true);

          const { data: liveIdsData, error: liveIdsError } = await supabase
          .from('user_live_schedules')
          .select('live_id')
          .eq('user_id', userId);
  
            if (liveIdsError) {
                console.error('Error fetching live IDs:', liveIdsError);
                return [];
            }
  
            const liveIds = liveIdsData.map((item) => item.live_id);
      
            const { data: liveData, error: liveDataError } = await supabase
            .from('lives')
            .select(`
                *,
                artists (
                    artist_name
                )
            `)
            .in('live_id', liveIds);
    
            if (liveDataError) {
                console.error('Error fetching live data:', liveDataError);
                return [];
            }
          setLiveData(liveData);
          console.log(liveData);
          

        } catch (error) {
          alert('Error loading user data!');
        } finally {
          setLoading(false);
        }
      }, [userId, supabase])
    
      useEffect(() => {
        getUser();
        console.log(userId);
      }, [userId, getUser]);
    
      if (loading) {
        return <p>読み込み中...</p>; // ユーザーデータを取得中に読み込み状態を表示
    }

    return (
        <>
            <h1>UserLiveSchedulePage</h1>
            <Link href={`/${userId}`}>←Back</Link>

            <div>
                {liveData.length > 0 ? (
                    <table>
                        <thead>    
                            <tr>
                                <th>Live Title</th>
                                <th>アーティスト名</th>
                                <th>Live Date</th>
                                <th>Live Venue</th>
                                <th>Capacity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {liveData.map((livedata) => (
                                <tr key={livedata.live_id}>
                                    <td>{livedata.live_title}</td>
                                    <td>{livedata.artists.artist_name}</td>
                                    <td>{livedata.date}</td>
                                    <td>{livedata.venue}</td>
                                    <td>{livedata.capacity ? livedata.capacity : "-"}</td>
                                    <td><AddScheduleButton liveId={livedata.live_id} userId={userId} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div>No live schedule</div>
                )}
            </div>
        </>
    );
};