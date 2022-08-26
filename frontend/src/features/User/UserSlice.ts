import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "./models/User";
import { UserLogin } from "./models/UserLogin";
import { login } from "./user.api";
import { DefaultQueryResponse } from "../common.models";

export interface UserState extends DefaultQueryResponse {
  user: User | null;
}

const initialState: UserState = {
  user: null,
  isFetching: false,
  isSuccess: false,
  isError: false,
  reason: "",
};
export const loginUser = createAsyncThunk(
  "users/login",
  async (userLoginParams: UserLogin, thunkAPI) => {
    try {
      const loginResponse = await login(userLoginParams);
      console.log("response", loginResponse);
      if (loginResponse.status === 200) {
        localStorage.setItem("token", loginResponse.data.data.token);
        return loginResponse.data.data;
      } else {
        console.log("Error prev", loginResponse.data);
        return thunkAPI.rejectWithValue(loginResponse.data);
      }
    } catch (e: any) {
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = { token: payload?.token || "" };
        console.log("payload", payload);

        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        console.log("payload", payload);
        state.isFetching = false;
        state.isError = true;
        state.reason = payload.reason;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      }),

  reducers: {},
});

// export const { setUser } = UserSlice.actions;
export default UserSlice.reducer;
