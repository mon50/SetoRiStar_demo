import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../lib/features/user/userSlice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; //getState...現在のstateを取得できる
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
