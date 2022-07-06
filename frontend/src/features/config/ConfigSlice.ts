import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ConfigState {
  width: number;
  height: number;
}

const initialState: ConfigState = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const ConfigSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setWindowSizes: (
      state,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setWindowSizes } = ConfigSlice.actions;

export default ConfigSlice.reducer;
