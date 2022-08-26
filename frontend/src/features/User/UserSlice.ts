import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./models/User";
import { UserLogin } from "./models/UserLogin";

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};
export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;

export const loginUser = createAsyncThunk(
  "users/login",
  async ({ username, password }: UserLogin, thunkAPI) => {
    try {
      debugger;
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      let data = await response.json();
      console.log("response", data);
      if (response.status === 200) {
        localStorage.setItem("token", data.token);
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
