// store/userSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Company {
  name: string;
  address: string;
  phone: string;
  email: string;
  officeHours: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  hireDate: string;
  status: "active" | "inactive" | "pending";
  userStatus: "active" | "inactive";
  weeklyHours: number;
  overtimeHours: number;
  company: Company;
  password?: string;
}

interface UserState {
  userlist: User[];
}

const initialState: UserState = {
  userlist: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UserList: (state, action: PayloadAction<User[]>) => {
      state.userlist = action.payload;
    },
    addUserLocal: (state, action: PayloadAction<User>) => {
      state.userlist.push(action.payload);
    },
    editUserLocal: (state, action: PayloadAction<User>) => {
      const idx = state.userlist.findIndex(u => u.id === action.payload.id);
      if (idx !== -1) state.userlist[idx] = action.payload;
    },
  },
});

export const { UserList, addUserLocal, editUserLocal } = userSlice.actions;
export default userSlice.reducer;
