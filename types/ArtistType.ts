export interface Artist {
    artist_id: number;
    artist_name: string;
    artist_image: string;
    music_type: string;
  }

  export interface Live {
    live_id: number;
    live_title: string;
    artist_id: string;
    venue: string|null;
    capacity: Int16Array | null;
    date: Date;
  }

  export interface ArtistN {
    artist_name: string;
    artist_image: string;
  }
  
  export interface FavoriteArtists {
    favorite_id: string;
    artist_id: string;
    artists: ArtistN;
  }