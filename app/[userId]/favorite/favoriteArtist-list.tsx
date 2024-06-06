"use client";
import { FavoriteArtists } from "@/types/ArtistType";
import { createClient } from "@/utils/supabase/client";
import { Link } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

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
          artists (artist_name, artist_image)
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
            artist_image: item.artists.artist_image,
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

<section className="w-full py-12">
<div className="container grid gap-6 md:gap-8 px-4 md:px-6">
{favoriteArtists.length > 0 ? (
  <Carousel className="w-full max-w-full">
    <CarouselContent>
    {favoriteArtists.map((favorite) => (
      <CarouselItem className="md:basis-1/3 lg:basis-1/4">
        <div className="p-1">
          <Card>
            <img
              src={favorite.artists.artist_image}
              alt="Artist Image"
              width={320}
              height={240}
              className="aspect-[4/3] object-cover w-full rounded-t-lg"
            />
            <CardContent className="p-4 space-y-2">
              <h3 className="font-semibold text-lg tracking-tight">{favorite.artists.artist_name}</h3>
              {/* <p className="text-sm text-gray-500 dark:text-gray-400">Experience immersive audio on the go.</p> */}
            </CardContent>
          </Card>
        </div>
      </CarouselItem>
                ))}
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
        ) : (
          <p>お気に入りのアーティストが見つかりません。</p>
        )}
</div>
</section>

);
}
