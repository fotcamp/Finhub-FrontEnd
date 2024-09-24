"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRecoilValue } from "recoil";

import { EXTERNAL_URL } from "@/app/menu/termsPolicy/_component/TermsPolicyScreen";

import { CheckItem } from "./CheckItem";

import { userTempState } from "@/states/client/atoms/user";
import { AgreementParams } from "@/states/server/Login/postAgreement";
import { useUpateAgreement } from "@/states/server/mutations";

import { useSetLoginInfo } from "@/hooks/useSetLoginInfo";

import ArrowRight from "@/public/icons/icon_arrow_right_8.svg";

import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FlexRow } from "@/components/FlexRow";
import { Stack } from "@/components/Stack";
import { Text } from "@/components/Text";
import { useToast } from "@/components/Toast/useToast";

const CHECK_LIST = {
  privacyPolicy: { link: EXTERNAL_URL.privacyPolicy, apiKey: "privacy_policy" },
  termsOfUse: { link: EXTERNAL_URL.termsOfUse, apiKey: "terms_of_service" }
};

type CheckListKeyType = keyof typeof CHECK_LIST;

type CheckListType = {
  [K in CheckListKeyType]: { on: boolean; link: string };
};

const initialCheckList: CheckListType = Object.keys(CHECK_LIST).reduce((acc, key) => {
  const typedKey = key as CheckListKeyType;
  acc[typedKey] = {
    on: false,
    link: CHECK_LIST[typedKey].link
  };
  return acc;
}, {} as CheckListType);

export const AgreeScreen = () => {
  const router = useRouter();

  const [checkAll, setCheckAll] = useState(false);
  const [checkList, setCheckList] = useState<CheckListType>(initialCheckList);

  const { showToast } = useToast();

  const userTempInfo = useRecoilValue(userTempState);
  const setLoginInfo = useSetLoginInfo();

  const useUpateAgreementMutation = useUpateAgreement({
    onSuccess: () => {
      setLoginInfo(userTempInfo);
      router.replace("/home");
    },
    onError: () => {
      showToast({ content: "잠시후 다시 시도해주세요!", type: "warning" });
    }
  });

  const handleCheckAll = () => {
    const updatedCheckList: CheckListType = Object.keys(checkList).reduce((acc, key) => {
      const typedKey = key as CheckListKeyType;
      acc[typedKey] = { ...checkList[typedKey], on: checkAll ? false : true };
      return acc;
    }, {} as CheckListType);

    setCheckList(updatedCheckList);
    setCheckAll(prev => !prev);
  };

  const handleCheckItemClick = (key: CheckListKeyType) => {
    setCheckList(prev => {
      const updatedItem = { ...prev[key], on: !prev[key].on };
      const updatedCheckList = { ...prev, [key]: updatedItem };
      const allChecked = Object.values(updatedCheckList).every(item => item.on);
      setCheckAll(allChecked);

      return updatedCheckList;
    });
  };

  const handleMoveLink = (key: CheckListKeyType) => {
    router.push(checkList[key].link);
  };

  const handleClickStart = () => {
    const param: AgreementParams = Object.keys(checkList).reduce((acc, key) => {
      const typedKey = key as CheckListKeyType;
      const apiKey = CHECK_LIST[typedKey].apiKey;
      acc[apiKey as keyof AgreementParams] = checkList[typedKey].on;
      return acc;
    }, {} as AgreementParams);

    useUpateAgreementMutation.mutate(param);
  };

  return (
    <Container mt={40}>
      <CheckItem on={checkAll} onClick={handleCheckAll}>
        <Text size={14} weight={600} color="#25292C">
          약관 전체동의
        </Text>
      </CheckItem>

      <Box mt={30} mb={30} width="100%" height={2} backgroundColor="#E6E8EB" />

      <Stack gap={30} pb={70}>
        <CheckItem
          on={checkList.privacyPolicy.on}
          onClick={() => handleCheckItemClick("privacyPolicy")}
        >
          <FlexRow pr={12} onClick={() => handleMoveLink("privacyPolicy")}>
            <Text size={14} weight={500} color="#25292C">
              <Text color="#50BF50">(필수)</Text> 개인정보처리방침
            </Text>
            <ArrowRight />
          </FlexRow>
        </CheckItem>
        <CheckItem on={checkList.termsOfUse.on} onClick={() => handleCheckItemClick("termsOfUse")}>
          <FlexRow pr={12} onClick={() => handleMoveLink("termsOfUse")}>
            <Text size={14} weight={500} color="#25292C">
              <Text color="#50BF50">(필수)</Text> 서비스이용약관
            </Text>
            <ArrowRight />
          </FlexRow>
        </CheckItem>
      </Stack>

      <Button
        full
        height={50}
        radius={10}
        backgroundColor="#50BF50"
        disabledBgColor="#CDD1D5"
        disabled={!checkAll}
        onClick={handleClickStart}
      >
        <Text size={16} weight={600} color="#FFF">
          시작하기
        </Text>
      </Button>
    </Container>
  );
};
