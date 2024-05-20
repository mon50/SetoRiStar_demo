import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "../lib/features/user/userSlice";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// persistConfigの設定
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // 永続化するreducerを指定
};

// rootReducerの設定
const rootReducer = combineReducers({
  user: userReducer,
});

// persistedReducerの設定
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ストアの設定
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// persistorの設定
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
