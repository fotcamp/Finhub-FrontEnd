"use client";

import { useRecoilValue } from "recoil";

import { useDeleteRecentSearchState } from "../hooks/useRecentSearch";
import style from "./RecentSearch.module.css";

import { recentSearchState } from "@/states/client/atoms/recentSearch";

import { isEmpty } from "@/utils/isEmpty";

import { useMounted } from "@/hooks/useMounted";

import CloseIcon from "@/public/icons/icon_close_gray.svg";

type RecentItemProps = {
  name: string;
  onClick: () => void;
  onClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const RecentItem = ({ name, onClick, onClose }: RecentItemProps) => {
  return (
    <div className={style.item} onClick={onClick}>
      <p>{name}</p>
      <button className={style.close_btn} onClick={onClose}>
        <CloseIcon />
      </button>
    </div>
  );
};

type RecentSearchProps = {
  onItemSelect: (value: string) => void;
};
export default function RecentSearch({ onItemSelect }: RecentSearchProps) {
  const isMount = useMounted();
  const recentSearchList = useRecoilValue(recentSearchState);
  const deleteRecentKeyword = useDeleteRecentSearchState();

  const handleClick = (keyword: string) => {
    onItemSelect(keyword);
  };

  const handleClose = (e: React.MouseEvent<HTMLButtonElement>, keyword: string) => {
    e.stopPropagation();
    deleteRecentKeyword(keyword);
  };

  return (
    <div className={style.container}>
      <div className={style.recent_box}>
        {isMount && !isEmpty(recentSearchList) && (
          <div className={style.recent_list}>
            {recentSearchList.map((v, i) => (
              <RecentItem
                key={i}
                name={v.keyword}
                onClick={() => handleClick(v.keyword)}
                onClose={e => handleClose(e, v.keyword)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
