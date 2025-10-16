"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import { forSuccess } from "@/utils/CommonService";
import Cookies from "js-cookie";
import { cookies } from "next/headers";


export const refreshToken = (refresh: any) => async (dispatch: AppDispatch) => {
  const res: any = await API.get("/api/auth/refresh-token");
  const refreshh = {
    "refreshToken": refresh
  }
  if (res?.accessToken) {
    Cookies.set('token', res.accessToken)
    dispatch(authReducer.refreshToken(res.accessToken));
    return res.data;
  } else if (res === "token has expired") {
    dispatch({ type: "auth/logout" });
  } else {
    dispatch({ type: "auth/logout" });
  }
  return {
    access_token: res.access_token
  };
};

export const login = (formData: any) => async (dispatch: AppDispatch) => {
  try {
    const rawFormData = {
      email: formData.email,
      password: formData.password
    }
    const res = await API.post("/api/auth/signin", rawFormData);
    const response = res?.data?.data;

    if (res.success) {
      dispatch(authReducer.login({
        user: response?.user,
        access_token: response?.accessToken,
        refresh_token: response?.refreshToken,
        AuthenticationResult: {
          AccessToken: response?.accessToken,
          IdToken: response?.idToken ?? "",
          RefreshToken: response?.refreshToken
        }
      })
      );
      forSuccess("Login successfully.");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};


export const logout = async () => { debugger
  try {
    let refreshToken: any = Cookies.get('refresh_token');
    const res = await API.post("/api/auth/logout", { refreshToken });
    console.log("Logout API response:", res);
    if (res.success) {
      forSuccess("Logout successfully.");
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      Cookies.remove("token");
      Cookies.remove("user");
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};