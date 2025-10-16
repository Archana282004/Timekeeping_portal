"use server";
import axios from "@/utils/axiosConfig";

export const post = async (url: string, body:object) => axios.post(url, body);

export const get = async (url: string, params?:object) => axios.get(url, { params });

export const put = async (url: string, body:object) => axios.put(url, body);

export const del = async (url: string, body:object) => axios.delete(url, { data: body });
