"use client";

import { useRecoilValue } from "recoil";

import MenuCard from "@/app/_component/Menu/MenuCard";

import { userState } from "@/states/client/atoms/user";
import { AppContainer, Container } from "@/components/Container";
import { FlexBox } from "@/components/FlexBox";
import { Stack } from "@/components/Stack";
import { Text } from "@/components/Text";
import { Box } from "@/components/Box";
import ProfileAvatar from "./ProfileAvatar";
import { AppBar } from "@/components/AppBar";
import { useRouter } from "next/navigation";

export const UserPageScreen = () => {
  const router = useRouter();
  const userInfo = useRecoilValue(userState);

  const handleClickWithdraw = () => {
    router.push('/menu/user/withdraw');
  }

  return (
    <AppContainer>
      <AppBar 
        useLeftBack
        title="프로필"
      />
      <Container width='100%'>
        <FlexBox mt={30} mb={44}>
          <ProfileAvatar />
        </FlexBox>
      </Container>

      <Stack mt={30} gap={10}>
        <MenuCard href="/menu/user/name">닉네임 변경</MenuCard>
        <MenuCard href="/menu/user/usertype">직업 설정</MenuCard>
      </Stack>
      
      <Container mt={44}>
        <Stack gap={8}>
          <Text size={16} weight={600} color="#191B1C">로그인 정보</Text>
          <Text size={14} weight={500} color="#CDD1D5">카카오톡 이메일 {userInfo.email}</Text>
        </Stack>

        <Box position='fixed' bottom={100} onClick={handleClickWithdraw}>
          <Text size={12} weight={600} color="rgba(232, 59, 59, 0.80)">탈퇴하기</Text>
        </Box>
      </Container>
    </AppContainer>
  )
}