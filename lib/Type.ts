export interface InitialState {
    user: null | {
      uid: string;
      authid: string;
      photo: string;
      email: string;
      displayName: string;
    };
    signIn: boolean;
    error: string | null;
  }