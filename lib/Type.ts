export interface InitialState {
    user: null | {
      user_id: string;
      auth_id: string;
      display_image: string;
      email: string;
      display_name: string;
      birthday: Date;
      updated_at: Date;
    };
    signIn: boolean;
    error: string | null;
  }

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