import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AnimationState {
  step: number;
  auto: boolean;
}

const initialState: AnimationState = {
  auto: false,
  step: 1,
};

export const AnimationSlice = createSlice({
  name: "animation",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload;
    },
    setAuto: (state, action: PayloadAction<boolean>) => {
      state.auto = action.payload;
    },
  },
});

export const { setAuto, setStep } = AnimationSlice.actions;

export default AnimationSlice.reducer;
