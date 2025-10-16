// "use server";
import { InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

const authInterceptor = async (config: InternalAxiosRequestConfig) => {
    const nextCookies = await cookies()
    const token = nextCookies.get("access_token")?.value;
    const refresh_token = nextCookies.get("refresh_token")?.value;
    // console.log("accesstoken", token)
    if (token) {
        if(config?.url === '/refresh') {
            config.headers['Authorization'] = `Bearer ${refresh_token}`;
        } else {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
}
export default authInterceptor;