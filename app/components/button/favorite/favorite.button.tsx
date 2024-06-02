"use client";
import React, { useCallback, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Icon } from '@mui/material';
import { createClient } from '@/utils/supabase/client';

const supabase = createClient();

export function FavoriteButton({ artistId, userId }: { artistId: number, userId: string|null}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchFavoriteStatus = useCallback(async () => {
    if (!userId || !artistId) return;

    try {
      setLoading(true);
        console.log(userId); 
        console.log(artistId);

      const { data, error } = await supabase
        .from('favorite_artists')
        .select('*')
        .eq('user_id', userId)
        .eq('artist_id', artistId);

        console.log(data);

      if (error) {
        console.error('Error fetching favorite status:', error);
      } else {
        setIsFavorite(data.length > 0);
      }
    } catch (error) {
      console.error('Error fetching favorite status:', error);
    } finally {
      setLoading(false);
    }
  }, [artistId, userId]);

  useEffect(() => {
    fetchFavoriteStatus();
  }, [fetchFavoriteStatus]);

  const toggleFavorite = async () => {
    setLoading(true);

    try {
      if (isFavorite) {
        const { error } = await supabase
          .from('favorite_artists')
          .delete()
          .eq('user_id', userId)
          .eq('artist_id', artistId);

        if (error) {
          console.error('Error removing favorite:', error);
        } else {
          setIsFavorite(false);
        }
      } else {
        const { error } = await supabase
          .from('favorite_artists')
          .insert({ user_id: userId, artist_id: artistId });

        if (error) {
          console.error('Error adding favorite:', error);
        } else {
          setIsFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={toggleFavorite}>
      <Icon>
        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </Icon>
    </button>
  );
}

export default FavoriteButton;