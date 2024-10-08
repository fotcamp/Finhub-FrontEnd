"use server";

import { cookies } from "next/headers";

import { WEEK_TIME } from "@/configs/date";
import { TokenKeys } from "@/configs/enum";

import { post } from "@/api/client";
import { ApiResponse } from "@/api/type";

import { AuthToken } from "@/model/AuthToken";

export const isUserLoginSsr = () => {
  const cookieStore = cookies();
  if (cookieStore.get("access-token")) return true;
  return false;
};

export const getToken = () => {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token")?.value;
  const refreshToken = cookieStore.get("refresh-token")?.value;
  return { accessToken, refreshToken };
};

export const updateToken = (updateAccessToken: string) => {
  cookies().set("access-token", updateAccessToken, {
    maxAge: 60 * 60 * 24 * 14, // 14 days
    secure: true,
    httpOnly: true
  });
};

export const deleteToken = () => {
  cookies().delete("access-token");
  cookies().delete("refresh-token");
};

export const setToken = (tokens: AuthToken) => {
  cookies().set(TokenKeys.ACCESS_TOKEN, tokens.accessToken ?? "", {
    maxAge: WEEK_TIME * 2,
    secure: true,
    httpOnly: true
  });
  cookies().set(TokenKeys.REFRESH_TOKEN, tokens.refreshToken ?? "", {
    maxAge: WEEK_TIME * 2,
    secure: true,
    httpOnly: true
  });
};

export const autoLogin = async (fcmToken: string) => {
  const response: ApiResponse = await post("/api/v1/auth/autoLogin", ["autoLogin"], {
    token: fcmToken
  });

  return response;
};

export const setAccessToken = (at: string) => {
  cookies().set(TokenKeys.ACCESS_TOKEN, at ?? "", {
    maxAge: WEEK_TIME * 2,
    secure: true,
    httpOnly: true
  });
};
