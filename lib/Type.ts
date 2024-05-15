export interface InitialState {
    displayName: string;
    user: null | {
      uid: string;
      photo: string;
      email: string;
      displayName: string;
    };
  }