import { get } from "./client";

import { ApiResponse } from "@/api/type";

import { deleteToken, setAccessToken, setToken } from "@/utils/authToken";

const loginWithKakao = async (kakaoCode: string | null) => {
  const response: ApiResponse = await get(
    `/api/v1/auth/login/oauth2/callback/kakao?code=${kakaoCode}&origin=${process.env.NEXT_PUBLIC_MODE}`
  );

  return response;
};

const refreshAccessToken = async () => {
  const response: ApiResponse = await get(
    `/api/v1/auth/updateAccessToken`,
    ["updateAccessToken"],
    {},
    true
  );

  if (response.status === "FAIL") {
    return deleteToken();
  }

  setAccessToken(response.data.token);
};

const autoLogin = async () => {
  const response: ApiResponse = await get("/api/v1/auth/autoLogin", ["autoLogin"]);

  if (response.status === "FAIL") {
    deleteToken();
  }

  setToken({
    accessToken: response.data.token.accessToken,
    refreshToken: response.data.token.refreshToken
  });

  return response;
};

const loginWithGoogle = async (code: string | null) => {
  const response: ApiResponse = await get(
    `/api/v1/auth/login/oauth2/callback/google?code=${code}&origin=${process.env.NEXT_PUBLIC_MODE}`
  );

  return response;
};

const loginWithApple = async (code: string | null) => {
  const response: ApiResponse = await get(
    `/api/v1/auth/login/oauth2/callback/apple?code=${code}&origin=${process.env.NEXT_PUBLIC_MODE}`
  );

  return response;
};

const pathAfterLogin = (isMember: boolean) => {
  if (isMember) {
    return "/home";
  } else {
    return "/login/agree";
  }
};

export const authAPI = {
  autoLogin,
  loginWithKakao,
  refreshAccessToken,
  loginWithGoogle,
  loginWithApple,
  pathAfterLogin
};
