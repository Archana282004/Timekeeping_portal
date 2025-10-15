import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthState, LoginRes } from "@/types/authType";

const token = Cookies?.get?.("token");
const refresh_token = Cookies?.get?.("refresh_token");
const user = Cookies?.get?.("user");

const initialState: AuthState = {
  token: token ? token : '',
  refresh_token: refresh_token ?? "",
  user: user ? JSON.parse(user) : undefined,
  access_token: token ? token : '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginRes>) => { 
      Cookies.set("token", action.payload.access_token);
      Cookies.set("refresh_token", action.payload.refresh_token);
      Cookies.set("user", JSON.stringify(action.payload.user));
      state.token = action.payload.access_token;
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token;
    },
    refreshToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    }
  },
});
export const { login, refreshToken } = authSlice.actions;

export default authSlice.reducer;
