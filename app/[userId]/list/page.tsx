"use client";
import { GetLiveIdEqualUserId, GetLiveSchedule } from '@/app/api/sql/getUserData';
import getUserListSchedule from '@/lib/features/userIdList/getUserListSchedule';
import { useAppSelector } from '@/lib/hooks';
import { Link } from "@mui/material";
import React, { useEffect, useState } from 'react';

const UserLiveSchedulePage = () => {
    const [userId, setUserId] = useState<string | null>(null);
    const [liveData, setLiveData] = useState<any[]>([]);
    const user = useAppSelector((state) => state.user.user);

    useEffect(() => {
        const fetchData = async () => {
            if (!user) {
                console.error("User not found");
                return null;
                }
        const userId = user?.uid;
        setUserId(userId);

        const liveIds = await GetLiveIdEqualUserId(userId || "");
        console.log(liveIds);

        const liveData = await GetLiveSchedule(liveIds);
        setLiveData(liveData);
        console.log(liveData);
        };

        fetchData();
    }, []);

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
