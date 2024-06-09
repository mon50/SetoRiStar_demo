"use client";
import { Link } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import AddScheduleButton from "@/app/components/button/addSchedule/addSchedule.button";

export default function UserLiveBefore({ userId }: { userId: string }) {
    const [liveData, setLiveData] = useState<any[]>([]);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isBeforeYesterday = (dateStr:Date) => {
        const date = new Date(dateStr);
        return date <= yesterday;
    };

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

            <div>
                {liveData.length > 0 ? (

<>
                            {liveData.map((livedata) => (
                               <div key={livedata.live_id}> {isBeforeYesterday(livedata.date) ?(
                                <div className="flex items-start">
                               <div className="rounded-full w-10 h-10 mr-4">
                                 {livedata.date}
                                 </div>
                               <div>
                                 <p className="text-gray-800 dark:text-gray-100 font-bold">{livedata.live_title}</p>
                                 <p className="text-gray-500 dark:text-gray-400 text-sm">{livedata.artist_name}</p>
                               </div>
                               </div>
                             ):(
                             <>
                        </>)}
                        </div>
                        
                            ))}
                        </>
                ) : (
                    <div>No live schedule</div>
                )}
            </div>
    );
};