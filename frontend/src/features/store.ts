import { configureStore } from "@reduxjs/toolkit";
import themeReducers from "./portfolio/theme/ThemeSlice";
import TranslationSlice from "./translations/TranslationSlice";
import ConfigState from "./config/ConfigSlice";
import AnimationSlice from "./portfolio/animations/AnimationSlice";
import UserSlice from "./User/LoginUserSlice";
import getUsersApi from "./User/GetUsers.slice";

export const store = configureStore({
  reducer: {
    theme: themeReducers,
    translation: TranslationSlice,
    config: ConfigState,
    animation: AnimationSlice,
    user: UserSlice,
    [getUsersApi.reducerPath]: getUsersApi.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
