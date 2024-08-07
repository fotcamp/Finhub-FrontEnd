
"use client";

import { User } from '@/model/User';
import style from './SelectUserType.module.css';
import cx from 'classnames';
import { useEffect, useState } from 'react';
import { useUserTypeList } from '@/states/server/queries';
import { useUpdateUserType } from '@/states/server/mutations';
import { useToast } from '@/components/Toast/useToast';
import { useRecoilState } from 'recoil';
import { userState } from '@/states/client/atoms/user';
import { UserType } from '@/model/UserType';

type UserTypeItemProps = {
  name: string,
  checked: boolean,
  onChange: () => void
}
const UserTypeItem = ({ name, checked, onChange }: UserTypeItemProps) => {
  return (
    <div
      className={cx([style.item_box, checked && style.active])}
      onClick={onChange}
    >
      {name}
    </div>
  )
}

type Props = {
  userInfo: User
}
export default function SelectUserType({ userInfo }: Props) {
  const defaultUserType: UserType = { id: 0, name: "직업 없음", img_path: '' };
  const [userType, setUserType] = useState<UserType>(defaultUserType);

  const [dropList, setDropList] = useState(false);
  const [_, setUserInfo] = useRecoilState(userState);

  const { showToast } = useToast();
  const { data: userTypeListData } = useUserTypeList();
  const userTypeMutation = useUpdateUserType({
    onSuccess: () => {
      setUserInfo(prev => ({
        ...prev,
        userType: userType?.name,
        userTypeUrl: userType?.img_path,
      }))
    },
    onError: () => {
      showToast({ content: "잠시후 다시 시도해주세요!", type: "warning" });
    }
  });
  const userTypeList = [{ id: 0, name: "직업 없음", img_path: '' }, ...(userTypeListData || [])];

  useEffect(() => {
    if (!userInfo.userType || userInfo.userType === "직업 없음") {
      setUserType(defaultUserType);
    } else {
      const userSelectedType = userTypeList.find(element => element.name === userInfo.userType);
      if (userSelectedType) setUserType(userSelectedType);
    }
  }, [userInfo])

  const handleChangeUserType = (userType: UserType) => {
    userTypeMutation.mutate({ id: userType.id });
    setUserType(userType);
    setDropList(!dropList);
  }

  const handleDropList = () => {
    setDropList(!dropList);
  }

  const handleConfirm = () => {
    showToast({ content: "직업이 변경 되었습니다!", type: 'success' });
  }

  return (
    <div className={style.container}>
      <div className={cx([style.select_box, dropList && style.active])} onClick={handleDropList}>
        <span>{userType?.name || '직업 없음'}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="8" viewBox="0 0 14 8" fill="none">
          <path d="M1 1L7 7L13 1" stroke="current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {dropList ?
        <div className={style.select_list}>
          <div className={style.select_list_wrap}>
            {userTypeList.map((item, i) => (
              <UserTypeItem
                key={item.id}
                name={item.name}
                checked={item.name === userType?.name}
                onChange={() => handleChangeUserType(item)}
              />
            ))}
          </div>
        </div>
        :
        userType?.name === "직업 없음" &&
        <div className={style.info_box}>
          <p>직업을 설정하면 맞춤형 설명에서 <span> 내 직업을 먼저 </span>볼 수 있어요!</p>
        </div>

      }
      <button onClick={handleConfirm} className={style.confirm_btn}>확인</button>
    </div>
  )
}