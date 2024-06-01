export interface InitialStateUser {
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