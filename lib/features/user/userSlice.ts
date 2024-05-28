import { InitialState } from "@/lib/Type";
import { createAppSlice } from "@/lib/createAppSlice";

const initialState: InitialState = {
  user: null,
  signIn: false,
  error: null
};

export const userSlice = createAppSlice({
    name: "user",
    initialState,

    reducers: {
        login: (state,action) => {
          console.log("login Reducer");
          console.log(action.payload);
          state.user = action.payload;
          state.signIn = true;
        },
        update: (state,action) => {
          state.user = action.payload;
        },
        logout: (state) => {
          state.user = null;
          state.signIn = false;
        }
    } 
});

export const { login, update, logout } = userSlice.actions;
export default userSlice.reducer;