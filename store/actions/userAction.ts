"use client";
import { AppDispatch } from "../store";
import * as API from "../serverApiAction/clientApis";
import { forSuccess } from "@/utils/CommonService";
import {
  UserList,
  WeekTimecards,
  TodayStatus,
  HistoryPage,
  TodaystatusCard,
} from "../reducers/userReducer";

export const fetchUser = (id: number | string) => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get(`/api/auth/getUser/${id}`);
    if (res.success) dispatch(UserList(res.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const fetchMyWeekTimecards = (weekEnding: any) => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get(`/api/timecards/getMyWeek?`, weekEnding);
    if (res.success) dispatch(WeekTimecards(res.data.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const todayStatus = () => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get("/api/timecards/todayStatus");
    if (res.success) dispatch(TodayStatus(res.data.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const HistoryPageData = () => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get("/api/timecards/getMyTimecardsHistory");
    if (res.success) dispatch(HistoryPage(res.data.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const StatusCardData = () => async (dispatch: AppDispatch) => {
  try {
    const res = await API.get("/api/timecards/yesterdayStatus");
    if (res.success) dispatch(TodaystatusCard(res.data.data));
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUserPassword = (formData: any) => async () => {
  try {
    const res = await API.patch("/api/auth/update-password", formData);
    if (res.success) forSuccess("Password updated successfully.");
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const addDailyEntry = (formData: any) => async () => {
  try {
    const res = await API.post("/api/timecards/addDailyEntry", formData);
    if (res.success) forSuccess("Daily entry added successfully.");
    return res;
  } catch (err) {
    console.log(err);
  }
};
