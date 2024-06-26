'use client'

import Image from "next/image";
import { useState } from "react";
import { useRecoilState } from "recoil";

import { LinkButton } from "../../../components/LinkButton/LinkButton";
import { userState } from "@/states/client/atoms/user";
import { BottomSheet } from "@/components/BottomSheet/BottomSheet";
import LoginModalContent from "../Catergory/LoginModalContent";
import { AnimatePresence } from "framer-motion";
import { PressButton } from "../../../components/PressAnimator/PressAnimator";

import BellIcon from '@/public/icons/bell_gray_ico.svg';
import { Container } from "@/components/Container";
import { Box } from "@/components/Box";
import { FlexBox } from "@/components/FlexBox";
import { Text } from "@/components/Text";
import { FlexRow } from "@/components/FlexRow";

import ConfigIcon from '@/public/icons/config_icon.svg';
import ScrapIcon from '@/public/icons/menu_scrap_icon.svg';

export default function LoginBox({ isLogin }: { isLogin: boolean }) {
  const [userInfo, _] = useRecoilState(userState);
  const [activeLogin, setActiveLogin] = useState(false);

  return (
    <Container padding='60px 16px 20px 16px' radius='0px 0px 20px 20px' backgroundColor="#F6F7F9">
      <FlexBox position='relative'>
        <Text size={16} weight={500} color="#525252">메뉴</Text>
        {isLogin &&
          <Box position='absolute' right={0}>
            <BellIcon />
          </Box>
        }
      </FlexBox>

      <Box mt={26}>
        {isLogin ?
          <LinkButton href={'/menu/user'}>
            <FlexRow px={16} height={90} backgroundColor="#FFF" radius={15} boxShadow="4px 4px 20px 0px rgba(0, 0, 0, 0.08)">
              <Box width={60} height={60} radius='50%' backgroundColor="#F5F5F5">
                <Image
                  src={userInfo.avatarUrl || '/images/default_avatar_img.png'}
                  alt='user avatar icon'
                  width={60}
                  height={60}
                />
              </Box>

              <FlexBox direction='column' ml={10} gap={6} flex={1} alignItems='flex-start'>
                <Text size={20} weight={600} color="#191B1C">{userInfo.nickname}</Text>
                <Text size={14} weight={400} color="#CDD1D5">{userInfo.userType || "직업 없음"}</Text>
              </FlexBox>

              <Box width={18} height={18}>
                <ConfigIcon />
              </Box>
            </FlexRow>
          </LinkButton>
          :
          <PressButton onClick={() => setActiveLogin(true)}>
            <FlexRow px={16} height={90} backgroundColor="#FFF" radius={15} boxShadow="4px 4px 20px 0px rgba(0, 0, 0, 0.08)">
              <Box width={60} height={60} radius='50%' backgroundColor="#F5F5F5">
                <Image
                  src={'/images/default_avatar_img.png'}
                  alt='user avatar icon'
                  width={60}
                  height={60}
                  priority
                />
              </Box>

              <FlexBox direction='column' ml={10} gap={6} flex={1} alignItems='flex-start'>
                <Text size={20} weight={600} color="#191B1C">로그인이 필요해요</Text>
                <Text size={14} weight={400} color="#CDD1D5">원활한 서비스 이용을 위해 로그인 해주세요.</Text>
              </FlexBox>
            </FlexRow>
          </PressButton>
        }
        {isLogin &&
          <Box mt={20}>
            <LinkButton href={'/menu/scrap'}>
              <FlexRow px={16} height={70} backgroundColor="#50BF50" radius={15} boxShadow="4px 4px 20px 0px rgba(0, 0, 0, 0.08)">
                <ScrapIcon />

                <FlexBox direction='column' ml={10} gap={6} flex={1} alignItems='flex-start'>
                  <Text size={18} color="#FFF">나의 <Text weight={600}>스크랩</Text></Text>
                </FlexBox>

                <Box>
                  <Text size={12} weight={500} color="#C1F2E0">보러가기</Text>
                </Box>
              </FlexRow>
            </LinkButton>
          </Box>
        }
      </Box>

      <AnimatePresence>
        {activeLogin &&
          <BottomSheet
            isOpen={true}
            onClose={() => setActiveLogin(false)}
          >
            <LoginModalContent onClose={() => setActiveLogin(false)} />
          </BottomSheet>
        }
      </AnimatePresence>
    </Container>
  )
}