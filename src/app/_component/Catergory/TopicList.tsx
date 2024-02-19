"use client"

import style from "@/app/_component/Catergory/TopicList.module.css";
import cx from 'classnames';
import React, { useState } from "react";
import Link from "next/link";
import { TopicDataTypes, TopicItemType } from "./HomeContent";

type TopicItemProps = {
    data: TopicItemType;
}

function TopicItem({data}: TopicItemProps) {
    console.log(data);
    const [heart, setHeart] = useState(data.scrap);

    const handleHeartClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setHeart(!heart);
    }

    return (
        <Link href={`/${data.category}/${data.id}`}>
            <div className={style.item_container}>
                <div className={style.img_box}></div>
                <div className={style.content_box}>
                    <p>{data.title}</p>
                    <p>{data.content}</p>
                </div>
                <div className={cx([style.heart_icon_box, heart && style.active])} onClick={handleHeartClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
                        <path d="M8.7208 0.873396C9.12344 -0.291132 10.8766 -0.291132 11.2792 0.873397L12.7178 5.0342C12.8979 5.55499 13.4143 5.9076 13.997 5.9076H18.6524C19.9554 5.9076 20.4971 7.47446 19.443 8.19418L15.6767 10.7657C15.2053 11.0876 15.008 11.6581 15.1881 12.1789L16.6267 16.3397C17.0293 17.5042 15.611 18.4726 14.5569 17.7529L10.7906 15.1813C10.3192 14.8595 9.68083 14.8595 9.20941 15.1813L5.44311 17.7529C4.389 18.4726 2.97069 17.5042 3.37333 16.3397L4.81193 12.1789C4.99199 11.6581 4.79473 11.0876 4.32332 10.7657L0.557018 8.19418C-0.497098 7.47446 0.0446463 5.9076 1.3476 5.9076H6.00301C6.58571 5.9076 7.10214 5.55499 7.28221 5.0342L8.7208 0.873396Z" fill="current"/>
                    </svg>
                </div>
            </div>
        </Link>
    )
}

export function AddTopicItem() {
    return (
        <div className={style.add_topic}>
            <p>더보기</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="7" fill="none">
                <path stroke="#D9D7CF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 1 5.5 6 1 1"/>
            </svg>
        </div>
    )
}

export default function TopicList({topicList}: TopicDataTypes) {
    console.log("@@" + topicList)
    return (
        <div className={style.topic_list}>
            {topicList.map(item => (
                <TopicItem 
                    key={`${item.category}_${item.id}`}
                    data={item}
                />
            ))}
        </div>
    )
}