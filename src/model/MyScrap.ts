export interface MyTopicScarp {
  categoryId: number;
  topicId: number;
  title: string;
  definition: string;
  imgUrl: string;
}

export interface MyColumnScarp {
  columnId: number;
  title: string;
  summary: string;
  imgUrl: string;
}

export interface MyScrap {
  topicInfo: MyTopicScarp[];
  columnInfo: MyColumnScarp[];
}

export type MyScrapRequest = "topic" | "column";
