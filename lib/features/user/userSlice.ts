import { InitialState } from "@/lib/Type";
import { createAppSlice } from "@/lib/createAppSlice";


const initialState: InitialState = {
  displayName: "",
  user: null,
};
export const userSlice = createAppSlice({
    name: "user",

    initialState,

    reducers: {
        login: (state,action) => {
          state.user = action.payload;
        },
        logout: (state) => {
          state.user = null;
        }
    } 
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;