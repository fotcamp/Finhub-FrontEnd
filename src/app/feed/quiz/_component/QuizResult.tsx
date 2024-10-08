"use client";

import { QuizSolveUser } from "@/model/QuizSolveUser";

import PenIcon from "@/public/quiz/quiz_pen_icon.svg";

import { Box } from "@/components/Box";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FlexBox } from "@/components/FlexBox";
import { Popup } from "@/components/Popup";
import { Stack } from "@/components/Stack";
import { Text } from "@/components/Text";

interface Props {
  show: boolean;
  onClose: () => void;
  quizResult: QuizSolveUser;
  onTagClick: (url: string) => void;
  onSolveOtherClick: () => void;
}

export const QuizResult = ({ show, onClose, quizResult, onTagClick, onSolveOtherClick }: Props) => {
  const handleOtherQuizClick = () => {
    onSolveOtherClick();
  };

  const handleClickTag = (url: string) => {
    onTagClick(url);
  };

  return (
    <Popup show={show} onClose={onClose} custom>
      <Box backgroundColor="#FFF" radius={20}>
        <Container variant="thick" pt={33} pb={38}>
          <FlexBox direction="column" gap={15}>
            <Text size={30} weight={600}>
              {quizResult.correctYN === "Y" ? "👏" : "😓"}
            </Text>

            <Text size={20} weight={600} color="#191B1C">
              {quizResult.correctYN === "Y" ? "정답이에요!" : "아쉽지만 정답이 아니에요!"}
            </Text>

            <Stack gap={3}>
              <Text size={16} weight={500} color="#494F54" lineHeight={1.6}>
                {quizResult.comment}
              </Text>
              {quizResult.correctYN === "N" && (
                <Text size={13} weight={600} color="#A6ABAF" lineHeight={1.6} textAlign="center">
                  더 공부해볼까요?
                </Text>
              )}
            </Stack>
          </FlexBox>

          <FlexBox mt={13} gap={12} flexWrap="wrap">
            {quizResult.topicList.map((item, index) => (
              <Button
                key={index}
                onClick={() => handleClickTag(`/${item.categoryId}/${item.topicId}`)}
              >
                <Box key={index} radius={10} px={10} backgroundColor="#50BF50">
                  <Text size={12} weight={600} color="#F9FAFA" lineHeight="32px">
                    # {item.title}
                  </Text>
                </Box>
              </Button>
            ))}
          </FlexBox>

          <FlexBox mt={40} gap={12}>
            <Button height={60} radius={10} backgroundColor="#F3F3F3" onClick={onClose} px={22}>
              <Text size={16} weight={600} color="#7B8287">
                닫기
              </Text>
            </Button>
            <Button
              flex={1}
              height={60}
              radius={10}
              backgroundColor="#F3FCF2"
              onClick={handleOtherQuizClick}
            >
              <FlexBox gap={5}>
                <PenIcon />
                <Text size={16} weight={600} color="#50BF50">
                  다른 퀴즈 풀기
                </Text>
              </FlexBox>
            </Button>
          </FlexBox>
        </Container>
      </Box>
    </Popup>
  );
};
