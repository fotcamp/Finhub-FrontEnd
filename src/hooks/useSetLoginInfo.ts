import { useSetRecoilState } from "recoil";

import { fcmAPI } from "@/api/fcm";

import { UserTempInfo, userState } from "@/states/client/atoms/user";

import { setToken } from "@/utils/authToken";
import { jsToNative } from "@/utils/jsToNative";

export const useSetLoginInfo = () => {
  const setUserInfo = useSetRecoilState(userState);

  return (userTempInfo: UserTempInfo) => {
    setToken({
      accessToken: userTempInfo.accessToken,
      refreshToken: userTempInfo.refreshToken
    });

    setUserInfo(userTempInfo);

    jsToNative({ val1: "getPushToken" }, (data: any) => {
      fcmAPI.updateFcmToken(data.detail);
    });
  };
};
