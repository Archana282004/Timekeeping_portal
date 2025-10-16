"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import * as userReducer from "../reducers/userReducer";
import { forSuccess } from "@/utils/CommonService";
import { addUserLocal, deleteUserLocal, editUserLocal, UserList } from "../reducers/userReducer";

export const fetchUsers = (pagination: any) => async (dispatch: AppDispatch) => { debugger
    try {
        const res: any = await API.get("/api/auth/getAllUsers", pagination);
        if (res.success) {
            dispatch(UserList(res.data.data.users));
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const addUser = (formData: any) => async (dispatch: AppDispatch) => {
    try {
        const res = await API.post("api/auth/signup", formData);
        if (res.success) {
            forSuccess("User created successfully.");
        }
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const editUser = (formData: any, id: number | string) => async (dispatch: AppDispatch, getState: any) => {
    try {
        const res = await API.put(`/api/auth/updateUser/${id}`, formData);
        console.log("Edit user API response:", res);
        if (res.success) {
            forSuccess("User updated successfully.");
            const currentUser = getState().user.userlist?.data.find((u: any) => u.id === id);
            if (currentUser) {
                dispatch(editUserLocal({ ...currentUser, ...formData }));
            }
        }
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const deleteUser = (userId: number | string) => async (dispatch: AppDispatch) => {
    try {
        const res = await API.del("/api/auth/deleteUser", { deleteIds: [userId] });
        if (res.success) {
            forSuccess("User deleted successfully.");
            dispatch(deleteUserLocal(userId));
        }
        return res;
    } catch (err) {
        console.log(err);
    }
};

export const FetchUser = (id: number | string) => async (dispatch: AppDispatch) => {
    try {
        const res: any = await API.get(`/api/auth/getUser/${id}`);
        if (res.success) {
            dispatch(UserList(res.data));
        }
        return res.data;
    } catch (err) {
        console.log(err);
    }
};
