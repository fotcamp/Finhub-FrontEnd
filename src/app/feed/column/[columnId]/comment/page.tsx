"use client";

import { useParams } from "next/navigation";

import { LoginSlide } from "@/app/_component/Catergory/LoginSlide";

import { ColumnComment } from "../../_component/ColumnComment";
import { OpinionBox } from "../_component/OpinionBox";

import { useGptColumnDetail, useUserInfo } from "@/states/server/queries";

import { isLoggedIn } from "@/utils/auth_client";

import { useModal } from "@/hooks/useModal";

import { AppBar } from "@/components/AppBar";
import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { AppContainer, Container } from "@/components/Container";
import { FlexBox } from "@/components/FlexBox";
import { Stack } from "@/components/Stack";
import { Text } from "@/components/Text";

export default function CommentDetail() {
  const isLogin = isLoggedIn();
  const columnId = Number(useParams().columnId);

  const LoginModal = useModal();

  const { data: gptColumnDetail } = useGptColumnDetail(columnId);
  const { data: userInfo } = useUserInfo();

  const showLoginModal = () => {
    LoginModal.open();
  };

  return (
    <AppContainer>
      <AppBar useLeftBack />

      <Container pt={32} pb={26}>
        <FlexBox justifyContent="flex-start" flexWrap="wrap" gap={12}>
          {gptColumnDetail.topicList.map(topic => (
            <Button key={topic.id} padding={10} radius={10} backgroundColor="#F3F3F3">
              <Text size={12} weight={600} color="#7B8287">
                # {topic.title}
              </Text>
            </Button>
          ))}
        </FlexBox>

        <Stack mt={20} gap={10}>
          <Text size={12} weight={400} color="#25292C">
            {gptColumnDetail.date}
          </Text>
          <Text size={24} weight={700} color="#191B1C">
            {gptColumnDetail.title}
          </Text>
        </Stack>
      </Container>

      <Box width="100%" height={10} backgroundColor="#EDF0F3" />

      <Box mt={20} mb={100}>
        <ColumnComment columnId={columnId} pageType="commentDetatil" />
      </Box>

      <OpinionBox
        columnId={columnId}
        imgSrc={userInfo?.avatarUrl}
        onClick={!isLogin ? showLoginModal : undefined}
      />

      <LoginSlide show={LoginModal.show} onClose={LoginModal.close} />
    </AppContainer>
  );
}
