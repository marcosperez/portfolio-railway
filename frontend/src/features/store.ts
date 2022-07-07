import { configureStore } from "@reduxjs/toolkit";
import themeReducers from "./theme/ThemeSlice";
import TranslationSlice from "./translations/TranslationSlice";
import ConfigState from "./config/ConfigSlice";
import thunkMiddleware from "redux-thunk";

export const store = configureStore({
  reducer: {
    theme: themeReducers,
    translation: TranslationSlice,
    config: ConfigState,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
