"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as authReducer from "../reducers/authReducer";
import { forSuccess } from "@/utils/CommonService";
import Cookies from "js-cookie";


export const refreshToken = async (dispatch: AppDispatch) => { debugger
  const res: any = await API.get("/api/auth/refresh-token");

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

export const login = (formData: any) => async (dispatch: AppDispatch) => { debugger
  try {
    const rawFormData = {
      email: formData.email ,
      password: formData.password 
    }
    const res = await API.post("/api/auth/signin", rawFormData);
    const response = res?.data?.data;
    if (res.success) { debugger
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
