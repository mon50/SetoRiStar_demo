"use client";
import { useAppSelector } from '@/lib/hooks';
import supabase from '@/lib/supabaseClient';
import { Link } from "@mui/material";
import React from 'react'

const UserLiveSchedulePage = async() => {
    const user = useAppSelector((state) => state.user.user);
    
    if (!user) {
        return <div>User not found</div>;
    }

    const { data: userIdData, error: userError } = await supabase
        .from('users')
        .select('user_id')
        .eq('auth_id', user.uid)
        .single();

    if (userError) {
        console.error('Error fetching user data:', userError);
        return <div>Error loading user data</div>;
    }

    const { data: liveIdsData, error: liveIdsError } = await supabase
        .from('user_live_schedules')
        .select('live_id')
        .eq('user_id', userIdData.user_id);

    if (liveIdsError) {
        console.error('Error fetching live IDs:', liveIdsError);
        return <div>Error loading live schedule</div>;
    }

    const liveIds = liveIdsData.map((item) => item.live_id);
    console.log(liveIds);

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
        return <div>Error loading live schedule</div>;
    }
    if (!liveData) {
        return <div>No live data found</div>;
    }

    return (
        <>
            <h1>UserLiveSchedulePage</h1>
            <Link href={`/${user?.uid}`}>←Back</Link>

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

export default UserLiveSchedulePage;
