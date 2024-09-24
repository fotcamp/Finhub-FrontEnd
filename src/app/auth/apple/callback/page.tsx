"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import Loading from "@/app/loading";

import { authAPI } from "@/api/auth";

import { userTempState } from "@/states/client/atoms/user";

import { useSetLoginInfo } from "@/hooks/useSetLoginInfo";

export default function AppleLogin() {
  const router = useRouter();
  const setLoginInfo = useSetLoginInfo();
  const setUserTempInfo = useSetRecoilState(userTempState);

  useEffect(() => {
    const { searchParams } = new URL(window.location.href);
    const code = searchParams.get("code");

    const fetchData = async () => {
      try {
        const { status, data } = await authAPI.loginWithApple(code);
        if (status === "SUCCESS") {
          const userInfo = {
            accessToken: data.token.accessToken,
            refreshToken: data.token.refreshToken,
            ...data.info
          };

          setUserTempInfo(userInfo);

          if (data.info.isMember) {
            setLoginInfo(userInfo);
          }

          const next = authAPI.pathAfterLogin(data.info.isMember);
          router.replace(next);
        } else {
          console.log("Fail");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return <Loading />;
}
