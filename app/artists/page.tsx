"use client";
import React, { useEffect, useState } from 'react';
import { GetAllArtists } from '../api/sql/getUserData';
import { Link } from '@mui/material';

interface Artist {
  artist_id: number;
  artist_name: string;
  artist_image: string;
  music_type: string;
}

const ArtistsPage: React.FC = () => {
  const [artistList, setArtistList] = useState<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
      const artistsList = await GetAllArtists();
      console.log("ArtistsPage artistsList", artistsList);
      setArtistList(artistsList??[]);
  };

  useEffect(() => {
    (async () => {
      await fetchData();
    })();
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {artistList.map((artist) => (
              <tr key={artist.artist_id}>
                <td>{artist.artist_id}</td>
                <td><Link href={`/${artist.artist_name}/list`}>{artist.artist_name}</Link></td>
                <td>
                  <img src={artist.artist_image} alt={artist.artist_name} width="50" height="50" />
                </td>
                <td>{artist.music_type}</td>
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

export default ArtistsPage;