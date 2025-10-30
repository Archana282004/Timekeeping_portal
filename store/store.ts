import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./reducers/auth-reducer";
import userReducer from "./reducers/userReducer";
import adminReducer from "./reducers/adminReducer"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    admin: adminReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
