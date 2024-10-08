"use client";

import cx from "classnames";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense, useState } from "react";

import BackButton from "@/app/_component/Nav/BackButton";
import { SafeArea } from "@/app/_component/SafeArea";
import Loading from "@/app/loading";

import { useInput } from "../hooks/useInput";
import { useSearch } from "../hooks/useSearch";
import InputResultArticleList from "./InputResultArticleList";
import InputResultWordList from "./InputResultWordList";
import NoSearchResult from "./NoSearchResult";
import RecentSearch from "./RecentSearch";
import style from "./SearchScreen.module.css";
import TopSearch from "./TopSearch";

import { SearchRequestType, SearchResult } from "@/model/SearchTopic";

import { useSafeAreaTop } from "@/hooks/useSafeAreaTop";

import SearchCloseIcon from "@/public/icons/search_close_icon.svg";
import SearchGrayIcon from "@/public/icons/search_gray.svg";

import { Box } from "@/components/Box";
import { AppContainer, Container } from "@/components/Container";
import { FlexBox } from "@/components/FlexBox";
import { Tabs } from "@/components/Tabs/Tabs";
import { Text } from "@/components/Text";

export type TopicInfiniteQueryType = {
  resultTopicSearchList: SearchResult[];
  fetchTopicNextPage: any;
  hasTopicNextPage: boolean;
  isTopicFetching: boolean;
};

export type ColumnInfiniteQueryType = {
  resultColumnSearchList: SearchResult[];
  fetchColumnNextPage: any;
  hasColumnNextPage: boolean;
  isColumnFetching: boolean;
};

export default function SearchScreen() {
  const [resultTabActive, setResultTabActive] = useState<SearchRequestType>("title");
  const top = useSafeAreaTop();

  const {
    inputRef,
    userInput,
    fetchInput,
    isResultPage,
    isFocus,
    debouncedOnChangeHandler,
    handleSetInputValue,
    handleInputSubmit,
    hanldeClearBtn,
    handleOnBlur,
    handleOnFocus,
    handleClickBackPress
  } = useInput();

  const { isResultEmpty, topicInfiniteQuery, columnInfiniteQuery } = useSearch({
    type: resultTabActive,
    keyword: fetchInput
  });

  return (
    <AppContainer footer>
      <Box position="fixed" top={0} left={0} right={0}>
        <SafeArea backgroundColor="#FFF" />
      </Box>
      <div className={cx([style.header, !isResultPage && style.focus])} style={{ top: top }}>
        {isResultPage ? (
          <BackButton icon="type2" onClick={handleClickBackPress} />
        ) : (
          <FlexBox width="100%" mb={25} justifyContent="flex-start">
            <Link href="/home">
              <Image src="/finhub_logo_green.svg" alt="finhub logo" width={102} height={25} />
            </Link>
          </FlexBox>
        )}
        <div className={style.input_box}>
          <form onSubmit={handleInputSubmit}>
            <input
              type="search"
              inputMode="search"
              name="searchInput"
              ref={inputRef}
              className={style.inputBox}
              placeholder="검색어를 입력해주세요."
              onChange={debouncedOnChangeHandler}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              maxLength={20}
            />
            <SearchGrayIcon className={style.search_icon} />
            <button
              type="button"
              className={cx([style.clear_btn, userInput && style.focus])}
              onClick={hanldeClearBtn}
            >
              <SearchCloseIcon />
            </button>
          </form>
        </div>
      </div>
      <Container mt={20}>
        {isResultPage ? (
          <Box>
            <Tabs
              data={[
                { value: "title", text: "제목" },
                { value: "summary", text: "내용" },
                { value: "both", text: "제목 및 내용" }
              ]}
              defaultValue={resultTabActive}
              onChange={(value: string) => setResultTabActive(value as SearchRequestType)}
              style={{
                position: "fixed",
                top: 74 + top,
                left: 0,
                backgroundColor: "#FFF",
                borderBottom: "1px solid #EDF0F3"
              }}
            />
            {isResultEmpty &&
            !topicInfiniteQuery.isTopicFetching &&
            !columnInfiniteQuery.isColumnFetching ? (
              <NoSearchResult userInput={userInput} />
            ) : (
              <>
                {!isResultEmpty && (
                  <>
                    <Box mt={65}>
                      <Text size={18} weight={600} color="#191B1C">
                        토픽
                      </Text>
                      <InputResultWordList
                        keyword={fetchInput}
                        topicInfiniteQuery={topicInfiniteQuery}
                      />
                    </Box>
                    <div className={style.divider}></div>
                    <Box mt={35}>
                      <Text size={18} weight={600} color="#191B1C">
                        GPT 칼럼
                      </Text>
                      <InputResultArticleList
                        keyword={fetchInput}
                        topicInfiniteQuery={columnInfiniteQuery}
                      />
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        ) : (
          <Box mt={54}>
            <RecentSearch onItemSelect={handleSetInputValue} />
            <Suspense fallback={<Loading height={300} />}>
              <TopSearch onItemSelect={handleSetInputValue} />
            </Suspense>
          </Box>
        )}
      </Container>
    </AppContainer>
  );
}
