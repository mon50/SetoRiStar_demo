"use client";
import { type User } from '@supabase/supabase-js';
import { Link } from "@mui/material";
import React, { useCallback, useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function UserLiveForm({ user }: { user: User | null }) {
    const [liveData, setLiveData] = useState<any[]>([]);

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

          const { data: liveIdsData, error: liveIdsError } = await supabase
          .from('user_live_schedules')
          .select('live_id')
          .eq('user_id', user_id);
  
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
            <h1>UserLiveSchedulePage</h1>
            <Link href={`/${user_id}`}>←Back</Link>

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