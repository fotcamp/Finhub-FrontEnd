import { AtomEffect, atom, useSetRecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

import { User } from "@/model/User";

/** persist nextjs config */
export const ssrCompletedState = atom({
  key: "SsrCompleted",
  default: false
});

export const useSsrComplectedState = () => {
  const setSsrCompleted = useSetRecoilState(ssrCompletedState);
  return () => setSsrCompleted(true);
};

const { persistAtom } = recoilPersist();

export const persistAtomEffect = <T>(param: Parameters<AtomEffect<T>>[0]) => {
  param.getPromise(ssrCompletedState).then(() => persistAtom(param));
};

export const userState = atom<User>({
  key: `userState`,
  default: {
    name: "",
    email: "",
    nickname: "",
    avatarUrl: "",
    userType: "",
    userTypeUrl: "",
    pushYN: false,
    isMember: false
  },
  effects_UNSTABLE: [persistAtomEffect]
});

export type UserTempInfo = {
  accessToken: string;
  refreshToken: string;
} & User;

export const userTempState = atom<UserTempInfo>({
  key: `userTempState`,
  default: {
    accessToken: "",
    refreshToken: "",
    name: "",
    email: "",
    nickname: "",
    avatarUrl: "",
    userType: "",
    userTypeUrl: "",
    pushYN: false,
    isMember: false
  }
});
