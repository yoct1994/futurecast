import React, { useContext } from "react";
import * as S from "../styles";
import { useDrag } from "react-dnd";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  deleteItemsState,
  documentListState,
  isEditDocumentState,
  referencesState,
} from "../../../recoil/recoil";
import { ThemeContext } from "styled-components";
import { ReactComponent as Close } from "../../../assets/Close.svg";

type Props = {
  index: number;
  item: any;
  documentIdx: number;
};

const ReferenceItem = ({ index, item, documentIdx }: Props) => {
  const [{}, drag] = useDrag(() => ({
    type: "ITEM",
    item: item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const isEdit = useRecoilValue(isEditDocumentState);
  const setDeleteItems = useSetRecoilState(deleteItemsState);
  const theme = useContext(ThemeContext);

  const [documents, setDocuments] = useRecoilState(referencesState);

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
      {isEdit && (
        <S.DeleteSubPageIcon
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDeleteItems((i) => [
              ...i,
              {
                data: item,
                type: "REFERENCE",
              },
            ]);

            let i = JSON.parse(JSON.stringify(documents));
            console.log("item ::::: ", i, item);
            i = i.filter((it: any) => it.id !== item.id);
            console.log("Result ::::: ", i);

            setDocuments(i);
          }}
        >
          <Close fill={theme?.color.white} />
        </S.DeleteSubPageIcon>
      )}
    </S.NewsItem>
  );
};

export default ReferenceItem;
