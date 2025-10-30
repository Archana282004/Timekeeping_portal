"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import { forSuccess } from "@/utils/CommonService";
import {
  UserList,
  addUserLocal,
  editUserLocal,
  TimeCardList,
  AdminDashboardStats,
  AdminEmployeeCardsData,
  DepartmentHoursData,
  WeeklyHours,
  Statscardfetching,
  RecentCards,
  Dashboarduser,
  Weekhourchart,
  departmenthourchart,
} from "../reducers/adminReducer";

export const fetchUsers = (pagination: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(Dashboarduser(true))
    const res: any = await API.get("/api/auth/getAllUsers", pagination);
    if (res.success) dispatch(UserList(res.data.data.users));
    dispatch(Dashboarduser(false))
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(Dashboarduser(false))
  }
};

export const addUser = (formData: any) => async () => {
  try {
    const res = await API.post("api/auth/signup", formData);
    if (res.success) forSuccess("User created successfully.");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const editUser = (formData: any, id: number | string) => async (dispatch: AppDispatch) => {
  try {
    const res = await API.put(`/api/auth/updateUser/${id}`, formData);
    if (res.success) forSuccess("User updated successfully.");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const fetchTimeCards = (pagination: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(RecentCards(true))
    const res: any = await API.get("/api/timecards/getAllTimecards", pagination);
    if (res.success) dispatch(TimeCardList(res.data.data.items));
    dispatch(RecentCards(false))
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(RecentCards(false))
  }
};

export const updateTimeCardStatus = (formData: any, id: number | string) => async () => {
  try {
    const res = await API.patch(`api/timecards/updateTimecardStatus/${id}`, formData);
    if (res.success) forSuccess("Timecard status updated successfully.");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const fetchAdminDashboardStats = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(Statscardfetching(true))
    const res: any = await API.get("/api/timecards/adminDashboardStats");
    if (res.success) dispatch(AdminDashboardStats(res.data.data));
    dispatch(Statscardfetching(false))
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(Statscardfetching(false))
  }
};

export const adminEmployeeCard = () => async (dispatch: AppDispatch) => {
  try {
    const res: any = await API.get("api/timecards/adminEmployeeCardsData");
    if (res.success) dispatch(AdminEmployeeCardsData(res.data.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const departmentsdata = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(departmenthourchart(true))
    const res: any = await API.get("/api/timecards/departmentHoursOverview");
    if (res.success) dispatch(DepartmentHoursData(res.data.data.departmentHoursData));
    dispatch(departmenthourchart(false))
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(departmenthourchart(false))
  }
};

export const weekhourdata = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(Weekhourchart(true))
    const res: any = await API.get("/api/timecards/weeklyHoursOverview");
    if (res.success) dispatch(WeeklyHours(res.data.data.weeklyHoursData));
    dispatch(Weekhourchart(false))
    return res.data;
  } catch (err) {
    console.log(err);
    dispatch(Weekhourchart(false))
  }
};

export const DeleteUser = (id: number) => async () => {
  try {
    const res: any = await API.del(`/api/auth/deleteUser/${id}`);
    if (res.success){ forSuccess("User Deleted Successfully");}
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
