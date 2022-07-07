import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type Languajes = "es" | "en";

export interface TranslationState {
  languaje: Languajes;
}

const initialState: TranslationState = {
  languaje: "en",
};

export const setLanguajeStorage = createAsyncThunk(
  "translation/setLanguajeStorage",
  async (lang: Languajes) => {
    await localStorage.setItem("languaje", lang);
    return lang;
  }
);

export const TranslationSlice = createSlice({
  name: "translation",
  initialState,
  reducers: {
    // changeLanguaje: (state, action: PayloadAction<Languajes>) => {
    //   state.languaje = action.payload;
    // },
  },
  extraReducers: {
    [setLanguajeStorage.fulfilled.toString()]: (
      state: TranslationState,
      action: PayloadAction<Languajes>
    ) => {
      state.languaje = action.payload;
    },
  },
});

// export const { changeLanguaje } = TranslationSlice.actions;

export default TranslationSlice.reducer;
