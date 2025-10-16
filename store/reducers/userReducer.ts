import { UserTablelist } from "@/types/usertype";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface UserTable {
  data: UserTablelist[];
  pagination: {
    total: number;
    page: number;
    limit: number;
  };
}

interface UserState {
  userlist: UserTable | null;
}

const initialState: UserState = {
  userlist: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    UserList: (state, action: PayloadAction<UserTable>) => {
      state.userlist = action.payload;
    },

    addUserLocal: (state, action: PayloadAction<User>) => {
      if (state.userlist?.data) {
        state.userlist.data.unshift(action.payload);
        state.userlist.pagination.total += 1;
      }
    },

    editUserLocal: (state, action: PayloadAction<User>) => {
      if (state.userlist?.data) {
        state.userlist.data = state.userlist.data.map((user) =>
          String(user.id) === String(action.payload.id)
            ? { ...user, ...action.payload } // merge updated fields
            : user
        );
      }
    },

    deleteUserLocal: (state, action: PayloadAction<string | number>) => {
      if (state.userlist?.data) {
        state.userlist.data = state.userlist.data.filter(
          (user) => String(user.id) !== String(action.payload)
        );
        state.userlist.pagination.total -= 1;
      }
    },
  },
});

export const { UserList, addUserLocal, editUserLocal, deleteUserLocal } = UserSlice.actions;
export default UserSlice.reducer;
