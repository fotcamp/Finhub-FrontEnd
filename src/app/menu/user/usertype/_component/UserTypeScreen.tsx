"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

import SelectUserType from "./SelectUserType";
import style from "./userType.module.css";

import { userState } from "@/states/client/atoms/user";

import { AppBar } from "@/components/AppBar";
import { AppContainer, Container } from "@/components/Container";

export const UserTypeScreen = () => {
  const [imgPath, serImgPath] = useState("/images/userType_default_img.png");
  const [userInfo, _] = useRecoilState(userState);

  useEffect(() => {
    if (userInfo.userTypeUrl) {
      serImgPath(userInfo.userTypeUrl);
    } else if (userInfo.userType === "직업 없음") {
      serImgPath("/images/userType_default_img.png");
    }
  }, [userInfo, serImgPath]);

  return (
    <AppContainer>
      <AppBar useLeftBack title="직업 설정" />
      <Container>
        <div className={style.avatar_box}>
          <Image src={imgPath} alt="UserType Image" width={120} height={120} priority />
        </div>
        <SelectUserType userInfo={userInfo} />
      </Container>
    </AppContainer>
  );
};
