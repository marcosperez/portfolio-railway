import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Themes = "light" | "dark";

export interface ThemeState {
  theme: Themes;
}

const initialState: ThemeState = {
  theme: "light",
};

export const setThemeStorage = createAsyncThunk(
  "theme/setThemeStorage",
  async (theme: Themes) => {
    await localStorage.setItem("theme", theme);
    return theme;
  }
);

export const ThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // changeTheme: (state, action: PayloadAction<Themes>) => {
    //   state.theme = action.payload;
    // },
  },
  extraReducers: {
    [setThemeStorage.fulfilled.toString()]: (
      state: ThemeState,
      action: PayloadAction<Themes>
    ) => {
      state.theme = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
// export const { changeTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;
