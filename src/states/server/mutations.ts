
import { UseMutationOptions, useMutation } from "@tanstack/react-query";

import { postScrap } from "./Home/postScrap";
import { postNickname } from "./Menu/postNinckname";
import { postUserType } from "./Menu/postUserType";
import { postUserAvatar } from "./Menu/postUserAvatar";
import { deleteUserAvatar } from "./Menu/deleteUserAvatar";
import { postNoSearchWord } from "./Search/postNoSearchWord";
import { deleteRecentKeyword } from "./Search/deleteRecentKeyword";
import { postGptColumnLike } from "./Column/ColumnPost/postGptColumnLike";
import { postGptColumnComment } from "./Column/ColumnComment/postGptColumnComment";


export const mutationKeys = {
  scrap: ["scrap"],
  nickname: ["nickname"],
  userType: ["userType"],
  userAvatar: ["userAvatar"],
  deleteUserAvatar: ["deleteUserAvatar"],
  updateNoSearchWord: ["updateNoSearchWord"],
  deleteRecentKeyword: ["deleteRecentKeyword"],
  gptColumnLike: ["gptColumnLike"],
  gptColumnComment: ["gptColumnComment"]
}

export const SCRAP_TYPE = {
  topic: 1,
  column: 2
} as const;

export const useScrap = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { id: number, type: number, categoryId?: number }>({
    mutationKey: mutationKeys.scrap,
    mutationFn: (param) => postScrap(param),
    ...options,
  });
}

export const useUpdateNickname = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { nickname: string }>({
    mutationKey: mutationKeys.nickname,
    mutationFn: (param) => postNickname(param),
    ...options,
  });
}

export const useUpdateUserType = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { id: number }>({
    mutationKey: mutationKeys.userType,
    mutationFn: (param) => postUserType(param),
    ...options,
  });
}

export const useUpdateUserAvatar = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { id: number }>({
    mutationKey: mutationKeys.userAvatar,
    mutationFn: (param) => postUserAvatar(param),
    ...options,
  });
}

export const useDeleteUserAvatar = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error>({
    mutationKey: mutationKeys.deleteUserAvatar,
    mutationFn: () => deleteUserAvatar(),
    ...options,
  });
}

export const useDeleteRecentKeyword = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error>({
    mutationKey: mutationKeys.deleteRecentKeyword,
    mutationFn: () => deleteRecentKeyword(),
    ...options,
  })
}

export const useUpdateNoSearchWord = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { keyword: string }>({
    mutationKey: mutationKeys.updateNoSearchWord,
    mutationFn: (param) => postNoSearchWord(param),
    ...options,
  })
}

export const COLUMN_LIKE_TYPE = {
  column: 1,
  comment: 2,
} as const;

export const useGptColumnLike = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { id: number, type: number }>({
    mutationKey: mutationKeys.gptColumnLike,
    mutationFn: (param) => postGptColumnLike(param),
    ...options,
  });
}

export const useGptColumnComment = (options?: UseMutationOptions<any, Error, any>) => {
  return useMutation<any, Error, { id: number, comment: string }>({
    mutationKey: mutationKeys.gptColumnComment,
    mutationFn: (param) => postGptColumnComment(param),
    ...options,
  });
}