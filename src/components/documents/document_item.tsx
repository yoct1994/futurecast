import React, { SetStateAction, useEffect, useRef, useState } from "react";
import * as S from "./styles";
import { ReactComponent as Retry } from "../../assets/document_page/tooltop.svg";
import { ReactComponent as ChevronDown } from "../../assets/document_page/ChevronDown.svg";
import { ReactComponent as AnswerLogo } from "../../assets/answer_logo.svg";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/a11y-dark.css";
import remarkGfm from "remark-gfm";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getReferences } from "../../server/server";
import { Skeleton } from "primereact/skeleton";
import { useDrag } from "react-dnd";
import SubPageItem from "./sub_page/sub_page_item";
import ReferenceItem from "./reference/refrence_item";

type Props = {
  item: any;
  refs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  index: number;
  // setScrollRefs: React.Dispatch<SetStateAction<(HTMLDivElement | null)[]>>;
  // scrollRefs: (HTMLDivElement | null)[];
};

const DocumentItem = ({ item, refs, index }: Props) => {
  const viewMoreRef = useRef<HTMLDivElement | null>(null);
  const refViewMoreRef = useRef<HTMLDivElement | null>(null);

  const [moreNum, setMoreNum] = useState<number>(4);
  const [refMoreNum, setRefMoreNum] = useState<number>(6);
  const [resources, setResources] = useState<any[]>([]);
  const [isLoadingRef, setIsLoadingRef] = useState(false);

  const getResources = async () => {
    const refs = [];
    setIsLoadingRef(true);
    console.log(`${item.id} : reference loading start`);

    for (var reference of item.references) {
      const ref = await getReferences(reference.type, reference.id);

      // console.log(ref.data);

      const refData = JSON.parse(ref.data);

      console.log(refData);
      refs.push(refData);
    }
    console.log(`${item.id} reference success`);

    setResources(refs);
    setIsLoadingRef(false);
  };

  useEffect(() => {
    if (item) {
      console.log(`${item.id} reference!!!!!!`);
      getResources();
    } else {
      setIsLoadingRef(true);
    }
  }, [item]);

  return (
    <>
      <S.DocumentContainer
        id={item ? `Query:${item.query.full_text}` : ""}
        ref={index === -1 ? undefined : refs.current[4 * index + 0]}
      >
        <S.DocumentQueryContainer>
          {item ? item.query.full_text : <Skeleton height={"24px"} />}
        </S.DocumentQueryContainer>
        <Retry
          data-tooltip-id={"tooltip_id"}
          data-tooltip-content="Retry"
          data-tooltip-place="bottom"
        />
      </S.DocumentContainer>
      {item && item.status !== "submitted" && item.children.length === 0 && (
        <S.EmptyWrapper>
          <S.EmptyContainer>There is no content</S.EmptyContainer>
        </S.EmptyWrapper>
      )}
      <S.SubDocumentGrid
        id={`Sub Documents`}
        ref={index === -1 ? undefined : refs.current[4 * index + 1]}
      >
        {item ? (
          item.stauts === "submitted" && item.children.length === 0 ? (
            <>
              <Skeleton height={"187px"} borderRadius="16px" />
              <Skeleton height={"187px"} borderRadius="16px" />
              <Skeleton height={"187px"} borderRadius="16px" />
              <Skeleton height={"187px"} borderRadius="16px" />
            </>
          ) : item.children.length === 0 ? (
            <></>
          ) : (
            (item.children as any[]).slice(0, moreNum).map((item, index) => {
              // console.log("sub document : ", item);

              const uniqueReferences = (
                item.document_references as any[]
              ).filter((i, index) => {
                return (
                  (item.document_references as any[]).findIndex(
                    (value) => value.type === i.type
                  ) === index
                );
              });

              for (var i = 0; i < uniqueReferences.length; i++) {
                const refNum = (item.document_references as any[]).filter(
                  (val) => val.type === uniqueReferences[i].type
                ).length;

                uniqueReferences[i] = {
                  type: uniqueReferences[i].type,
                  num: refNum,
                };
              }

              return (
                <SubPageItem
                  index={index}
                  item={item}
                  uniqueReferences={uniqueReferences}
                />
              );
            })
          )
        ) : (
          <>
            <Skeleton height={"187px"} borderRadius="16px" />
            <Skeleton height={"187px"} borderRadius="16px" />
            <Skeleton height={"187px"} borderRadius="16px" />
            <Skeleton height={"187px"} borderRadius="16px" />
          </>
        )}
      </S.SubDocumentGrid>
      {item ? (
        item.children.length === 0 ? (
          <></>
        ) : (
          item.children.length > 4 && (
            <S.SubDocumentViewMore>
              <S.SubDocumentViewMoreLine />
              <S.SubDocumentViewMoreButton
                ref={viewMoreRef}
                onClick={(e) => {
                  console.log("CLICK");
                  if (viewMoreRef.current?.classList.contains("view_more")) {
                    viewMoreRef.current?.classList.remove("view_more");
                    setMoreNum(4);
                  } else {
                    viewMoreRef.current?.classList.add("view_more");
                    setMoreNum(item.children.length);
                  }
                }}
              >
                <ChevronDown />
                {viewMoreRef.current?.classList.contains("view_more")
                  ? "CLOSE"
                  : "VIEW MORE"}
              </S.SubDocumentViewMoreButton>
            </S.SubDocumentViewMore>
          )
        )
      ) : (
        <></>
      )}
      <S.AnswerWrapper>
        <AnswerLogo />
        <S.AnswerContainer
          id={`${
            item && item.content ? item.content.full_text : "NO CONTENTS"
          }`}
          ref={index === -1 ? undefined : refs.current[4 * index + 2]}
        >
          {/* <S.CustomFontMarkDown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {item.content ? item.content.full_text : "NO CONTENTS"}
            
          </S.CustomFontMarkDown> */}
          {item ? (
            item.status === "submitted" && !item.content ? (
              <S.SkeletonLoadingContainer>
                <Skeleton width={"70%"} height={"28px"} />
                <div style={{ marginBottom: 8 }} />
                <Skeleton width={"30%"} height={"25px"} />
                <div style={{ marginBottom: 7 }} />
                <Skeleton width={"100%"} height={"20px"} />
                <div style={{ marginBottom: 15 }} />
                <Skeleton width={"100%"} height={"20px"} />
                <div style={{ marginBottom: 11 }} />
                <Skeleton width={"100%"} height={"20px"} />
                <div style={{ marginBottom: 11 }} />
                <Skeleton width={"100%"} height={"20px"} />
                <div style={{ marginBottom: 14 }} />
                <Skeleton width={"30%"} height={"25px"} />
                <div style={{ marginBottom: 12 }} />
                <div style={{ marginLeft: 25 }}>
                  <Skeleton width={"38%"} height={"20px"} />
                  <div style={{ marginBottom: 19 }} />
                  <div style={{ marginLeft: 29 }}>
                    <Skeleton width={"100%"} height={"20px"} />
                    <div style={{ marginBottom: 11 }} />
                    <Skeleton width={"100%"} height={"20px"} />
                    <div style={{ marginBottom: 19 }} />
                  </div>
                  <Skeleton width={"38%"} height={"20px"} />
                  <div style={{ marginBottom: 17 }} />
                  <div style={{ marginLeft: 29 }}>
                    <Skeleton width={"100%"} height={"20px"} />
                    <div style={{ marginBottom: 11 }} />
                    <Skeleton width={"100%"} height={"20px"} />
                    <div style={{ marginBottom: 24 }} />
                  </div>
                  <Skeleton width={"38%"} height={"20px"} />
                  <div style={{ marginBottom: 13, marginLeft: 25 }} />
                  <div style={{ marginLeft: 29 }}>
                    <Skeleton width={"100%"} height={"20px"} />
                    <div style={{ marginBottom: 11 }} />
                    <Skeleton width={"100%"} height={"20px"} />
                  </div>
                </div>
              </S.SkeletonLoadingContainer>
            ) : (
              <MarkdownPreview
                wrapperElement={{
                  "data-color-mode": "light",
                }}
                source={item.content ? item.content.full_text : "NO CONTENTS"}
                // source={testText}
              />
            )
          ) : (
            <S.SkeletonLoadingContainer>
              <Skeleton width={"70%"} height={"28px"} />
              <div style={{ marginBottom: 8 }} />
              <Skeleton width={"30%"} height={"25px"} />
              <div style={{ marginBottom: 7 }} />
              <Skeleton width={"100%"} height={"20px"} />
              <div style={{ marginBottom: 15 }} />
              <Skeleton width={"100%"} height={"20px"} />
              <div style={{ marginBottom: 11 }} />
              <Skeleton width={"100%"} height={"20px"} />
              <div style={{ marginBottom: 11 }} />
              <Skeleton width={"100%"} height={"20px"} />
              <div style={{ marginBottom: 14 }} />
              <Skeleton width={"30%"} height={"25px"} />
              <div style={{ marginBottom: 12 }} />
              <div style={{ marginLeft: 25 }}>
                <Skeleton width={"38%"} height={"20px"} />
                <div style={{ marginBottom: 19 }} />
                <div style={{ marginLeft: 29 }}>
                  <Skeleton width={"100%"} height={"20px"} />
                  <div style={{ marginBottom: 11 }} />
                  <Skeleton width={"100%"} height={"20px"} />
                  <div style={{ marginBottom: 19 }} />
                </div>
                <Skeleton width={"38%"} height={"20px"} />
                <div style={{ marginBottom: 17 }} />
                <div style={{ marginLeft: 29 }}>
                  <Skeleton width={"100%"} height={"20px"} />
                  <div style={{ marginBottom: 11 }} />
                  <Skeleton width={"100%"} height={"20px"} />
                  <div style={{ marginBottom: 24 }} />
                </div>
                <Skeleton width={"38%"} height={"20px"} />
                <div style={{ marginBottom: 13, marginLeft: 25 }} />
                <div style={{ marginLeft: 29 }}>
                  <Skeleton width={"100%"} height={"20px"} />
                  <div style={{ marginBottom: 11 }} />
                  <Skeleton width={"100%"} height={"20px"} />
                </div>
              </div>
            </S.SkeletonLoadingContainer>
          )}
        </S.AnswerContainer>
      </S.AnswerWrapper>
      <S.NewsWrapper>
        <S.NewsTitleWrapper
          id={`References`}
          ref={index === -1 ? undefined : refs.current[4 * index + 3]}
        >
          References
        </S.NewsTitleWrapper>
        {!isLoadingRef &&
          item &&
          item.status !== "submitted" &&
          resources.length === 0 && (
            <S.EmptyWrapper>
              <S.EmptyContainer>There is no content</S.EmptyContainer>
            </S.EmptyWrapper>
          )}
        <S.NewsGrid>
          {isLoadingRef ? (
            <>
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
            </>
          ) : item && item.status === "submitted" && resources.length === 0 ? (
            <>
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
              <Skeleton height={"122px"} borderRadius="8px" />
            </>
          ) : (
            resources
              .filter(
                (item, index) => item.type === "search" || item.type === "news"
              )
              .slice(0, refMoreNum)
              .map((item, index) => {
                return <ReferenceItem index={index} item={item} />;
              })
          )}
        </S.NewsGrid>
        {resources.filter(
          (item) => item.type === "search" || item.type === "news"
        ).length > 4 && (
          <S.SubDocumentViewMore>
            <S.SubDocumentViewMoreLine />
            <S.SubDocumentViewMoreButton
              ref={refViewMoreRef}
              onClick={(e) => {
                console.log("CLICK");
                if (refViewMoreRef.current?.classList.contains("view_more")) {
                  refViewMoreRef.current?.classList.remove("view_more");
                  setRefMoreNum(6);
                } else {
                  refViewMoreRef.current?.classList.add("view_more");
                  setRefMoreNum(
                    resources.filter(
                      (item) => item.type === "search" || item.type === "news"
                    ).length
                  );
                }
              }}
            >
              <ChevronDown />
              {refViewMoreRef.current?.classList.contains("view_more")
                ? "CLOSE"
                : "VIEW MORE"}
            </S.SubDocumentViewMoreButton>
          </S.SubDocumentViewMore>
        )}
      </S.NewsWrapper>
      <S.DocumentItemDivider>
        <S.DocumentLine />
        <S.DocumentDividerCreateAt>
          {!item ? (
            <>
              <Skeleton width={"120px"} />
            </>
          ) : (
            `${new Date(item.updated_at * 1000).toLocaleTimeString(
              "en-US"
            )}, ${new Date(item.updated_at * 1000).toLocaleString("en-US", {
              month: "short",
            })} ${new Date(item.updated_at * 1000).getDate()}, ${new Date(
              item.updated_at * 1000
            ).getFullYear()}`
          )}
        </S.DocumentDividerCreateAt>
      </S.DocumentItemDivider>
    </>
  );
};

export default DocumentItem;
