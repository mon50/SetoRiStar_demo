"use client";
import { FavoriteArtists } from "@/lib/Type";
import { createClient } from "@/utils/supabase/client";
import { useCallback, useEffect, useState } from "react";

export default function FavoriteArtistList({ userId }: { userId: string }) {
  const [loading, setLoading] = useState(true);
  const [favoriteArtists, setFavorite] = useState<FavoriteArtists[]>([]);
  const supabase = createClient();

  const getUserFavorite = useCallback(async () => {
    if (!userId) return;

    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('favorite_artists')
        .select(`
          favorite_id,
          artist_id,
          artists (artist_name)
        `)
        .eq('user_id', userId);

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
      if (data) {
        // データの型が正しいか確認
        const formattedData: FavoriteArtists[] = data.map((item: any) => ({
          favorite_id: item.favorite_id,
          artist_id: item.artist_id,
          artists: {
            artist_name: item.artists.artist_name,
          },
        }));
        setFavorite(formattedData);
    }
    } catch (error) {
      alert('Error loading favorite artists data!');
    } finally {
      setLoading(false);
    }
  }, [userId, supabase]);

  useEffect(() => {
    getUserFavorite();
    console.log(userId);
  }, [userId, getUserFavorite]);

  if (loading) {
    return <p>読み込み中...</p>; // ユーザーデータを取得中に読み込み状態を表示
  }

  return (
    <div>
      <h1>Welcome to FavoriteArtistList!</h1>
      {favoriteArtists.length > 0 ? (
        <ul>
          {favoriteArtists.map((favorite) => (
            <li key={favorite.favorite_id}>
              {favorite.artists.artist_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>お気に入りのアーティストが見つかりません。</p>
      )}
    </div>
  );
}
