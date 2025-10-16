import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { AuthState, LoginRes } from "@/types/authType";

const token = Cookies?.get?.("token");
const refresh_token = Cookies?.get?.("refresh_token");
const user = Cookies?.get?.("user");
const access_token = Cookies?.get?.("access_token");

const initialState: AuthState = {
  token: token ?? null,
  refresh_token: refresh_token ?? "",
  user: user ? JSON.parse(user) : undefined,
  access_token: access_token ? access_token : '',
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginRes>) => {
      Cookies.set("access_token", action.payload.access_token);
      Cookies.set("refresh_token", action.payload.refresh_token);
      Cookies.set("user", JSON.stringify(action.payload.user));
      state.access_token = action.payload.access_token;
      state.user = action.payload.user;
      state.refresh_token = action.payload.refresh_token;
    },

    refreshToken: (state, action: PayloadAction<string>) => {
      state.access_token = action.payload;
      Cookies.set("access_token", action.payload); 
    },

    logoutt: (state) => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("user");
      state.access_token = "";
      state.refresh_token = "";
      state.user = undefined;
      state.token = null;
    },
  },
});

export const { login, refreshToken, logoutt } = authSlice.actions;

export default authSlice.reducer;
