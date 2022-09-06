import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      if (loginResponse.status === 200) {
        localStorage.setItem("token", loginResponse.data.data.token);
        return loginResponse.data.data;
      } else {
        return thunkAPI.rejectWithValue(loginResponse.data);
      }
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state: UserState, action: PayloadAction<any>) => {
      localStorage.removeItem("token");
      state.user = null;
      return state;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.isSuccess = true;
        state.user = { token: payload?.token || "" };

        return state;
      })
      .addCase(loginUser.rejected, (state, { payload }: any) => {
        state.isFetching = false;
        state.isError = true;
        state.reason = payload.reason;
      })
      .addCase(loginUser.pending, (state) => {
        state.isFetching = true;
      }),
});

export default UserSlice.reducer;
export const { logoutUser } = UserSlice.actions;
