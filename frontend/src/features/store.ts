import { configureStore } from "@reduxjs/toolkit";
import ConfigState from "./config/ConfigSlice";
import AnimationSlice from "./portfolio/animations/AnimationSlice";
import themeReducers from "./portfolio/theme/ThemeSlice";
import TranslationSlice from "./translations/TranslationSlice";

export const store = configureStore({
  reducer: {
    theme: themeReducers,
    translation: TranslationSlice,
    config: ConfigState,
    animation: AnimationSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
