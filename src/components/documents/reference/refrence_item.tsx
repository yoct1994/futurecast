import React from "react";
import * as S from "../styles";
import { useDrag } from "react-dnd";

type Props = {
  index: number;
  item: any;
};

const ReferenceItem = ({ index, item }: Props) => {
  const [{}, drag] = useDrag(() => ({
    type: "ITEM",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <S.NewsItem
      ref={drag}
      key={index}
      onClick={(e) => {
        if (item.type === "news") {
          window.location.href = item.data.url;
        } else {
          window.location.href = item.result.link;
        }
      }}
    >
      <S.NewsContentContainer>
        <S.NewsTitleText>
          {item.type === "news"
            ? item.data.title
            : item.result
            ? item.result.title
            : ""}
        </S.NewsTitleText>
        <S.NewsContentText>
          {item.type === "news"
            ? item.data.summary
            : item.result
            ? item.result.snippet
            : ""}
        </S.NewsContentText>
      </S.NewsContentContainer>
      {item.type === "news" ? (
        <S.NewsImage src={item.type === "news" ? item.data.image : ""} />
      ) : (
        <></>
      )}
    </S.NewsItem>
  );
};

export default ReferenceItem;
