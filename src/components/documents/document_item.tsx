import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import * as S from "./styles";
import * as SS from "../../components/main/styles";
import { ReactComponent as Retry } from "../../assets/document_page/tooltop.svg";
import { ReactComponent as ChevronDown } from "../../assets/document_page/ChevronDown.svg";
import { ReactComponent as AnswerLogo } from "../../assets/answer_logo.svg";
import "highlight.js/styles/a11y-dark.css";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { generateAI, getReferences, getSuggetion } from "../../server/server";
import { Skeleton } from "primereact/skeleton";
import SubPageItem from "./sub_page/sub_page_item";
import ReferenceItem from "./reference/refrence_item";
import BarChart from "./graph/bar-chart";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  deleteItemsState,
  isDarkModeState,
  isEditDocumentState,
  referencesState,
  updateItemsState,
} from "../../recoil/recoil";
import { ThemeContext } from "styled-components";
import ReferencePopup from "./document_refrence/reference_popup";
import { Mention, MentionsInput } from "react-mentions";
import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import { Toast } from "primereact/toast";

type Props = {
  item: any;
  refs: React.MutableRefObject<React.RefObject<HTMLDivElement>[]>;
  index: number;
  isOpenView?: boolean;
  getDocument: () => Promise<void>;
  toast: React.RefObject<Toast>;
  setIsRefresh?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  // setScrollRefs: React.Dispatch<SetStateAction<(HTMLDivElement | null)[]>>;
  // scrollRefs: (HTMLDivElement | null)[];
};

let container: any;

const DocumentItem = ({
  item,
  refs,
  index,
  isOpenView,
  getDocument,
  toast,
  setIsRefresh,
}: Props) => {
  const viewMoreRef = useRef<HTMLDivElement | null>(null);
  const refViewMoreRef = useRef<HTMLDivElement | null>(null);
  const queryRef = useRef<HTMLInputElement | null>(null);
  const theme = useContext(ThemeContext);

  const [moreNum, setMoreNum] = useState<number>(4);
  const [refMoreNum, setRefMoreNum] = useState<number>(6);
  const [resources, setResources] = useRecoilState(referencesState);
  const [isLoadingRef, setIsLoadingRef] = useState(false);
  const [query, setQuery] = useState("");
  const [content, setContent] = useState("");

  const [mentions, setMentions] = useState<any[]>([]);

  const isDarkMode = useRecoilValue(isDarkModeState);

  const [pickRef, setPickRef] = useState<any>(null);
  const [pickIndex, setPickIndex] = useState(-1);

  const setUpdateItems = useSetRecoilState(updateItemsState);
  const setDeleteItems = useSetRecoilState(deleteItemsState);
  const isEdit = useRecoilValue(isEditDocumentState);

  useEffect(() => {
    if (isEdit) {
      setQuery(item.query.full_text);
      if (queryRef.current) {
        queryRef.current.value = item.query.full_text;
      }
      setContent(item.content.full_text);
    }
  }, [isEdit]);

  useEffect(() => {
    if (isOpenView) {
      viewMoreRef.current?.classList.add("view_more");
      setMoreNum(item.children.length);

      viewMoreRef.current?.classList.add("view_more");
      setRefMoreNum(resources.length);
    } else {
      viewMoreRef.current?.classList.remove("view_more");
      setMoreNum(4);

      viewMoreRef.current?.classList.add("view_more");
      setRefMoreNum(6);
    }
  }, [isOpenView]);

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

  const queryStyle = {
    minHeight: 55,
    width: "100%",
    paddingLeft: 0,
    paddingRight: 0,
    maxHeight: 200,
    // color: "transparent",
    paddingTop: "0px",
    paddingBottom: "0px",
    fontFamily: "Pretendard-SemiBold",
    input: {
      scrollbarWidth: "none",
      overflowY: "scroll",
      fontFamily: "Pretendard-SemiBold",
      // fontFamily: "Pretendard",
      boxShadow: "none",
      // color: "transparent",
      // lineHeight: 1,
      border: "none",
      color: theme?.color.black,
      outline: "none",
      background: theme?.color.white,
      paddingLeft: 0,
      paddingRight: 0,
      paddingTop: "0px",
      paddingBottom: "0px",
      boxSizing: "border-box",
      fontSize: 18,
    },
  };

  const getSuggestion = async (q: string, callback: (data: any) => void) => {
    return await getSuggetion(q)
      .then((res) => {
        const data = JSON.parse(res.data);

        callback(
          data.map((e: any) => {
            return {
              id: `${e.unique_name}|||${e.unique_code}`,
              display: e.unique_name,
              // unique_code: e.unique_code,
              // string: e.string,
            };
          })
        );
      })
      .catch((e) => {
        console.log(e);
        callback([]);
      });
  };

  const suggestions = (e: ReactNode) => {
    // console.log(e);
    return <SS.SuggestionsContainer>{e}</SS.SuggestionsContainer>;
  };

  return (
    <>
      {isEdit ? (
        <S.EditDocumentQueryWrapper>
          <MentionsInput
            customSuggestionsContainer={suggestions}
            disabled={false}
            // className="mention_input_styling"
            singleLine={false}
            classNames={["mentions"]}
            allowSpaceInQuery={true}
            onChange={(e, newValue, newPlainTextValue, mentions) => {
              // console.log("newValue : ", newValue);
              // console.log("newPlainTextValue", newPlainTextValue);
              console.log("mentions", mentions);
              console.log("value", e.target.value);
              console.log(item);

              setMentions(mentions);

              setQuery(e.target.value);
              setUpdateItems((i) => {
                const idx = i.findIndex((item) => item.type === "QUERY");
                if (idx !== -1) {
                  const res = JSON.parse(JSON.stringify(i));
                  res[idx] = {
                    data: {
                      id: item.id,
                      full_text: e.target.value,
                      mentions: mentions,
                    },
                    type: "QUERY",
                  };
                  return res;
                } else {
                  return [
                    ...i,
                    {
                      data: {
                        id: item.id,
                        full_text: e.target.value,
                        mentions: mentions,
                      },
                      type: "QUERY",
                    },
                  ];
                }
              });
            }}
            allowSuggestionsAboveCursor={true}
            suggestionsPortalHost={container}
            // forceSuggestionsAboveCursor={true}
            inputRef={queryRef}
            style={queryStyle}
            placeholder="Ask Something.."
            value={query}
            onFocus={() => {
              console.log("Focus!");
            }}
            onBlur={() => {
              console.log("Blur!");
            }}
          >
            <Mention
              // style={mentionStyle}
              className={"mention_style"}
              trigger={"@"}
              data={(e, callback) => {
                console.log("Search: ", e);
                getSuggestion(e, callback);
              }}
              onAdd={(id, display) => {
                console.log(id, display);
              }}
              displayTransform={(id, display) => {
                return `@${display}`;
              }}
              renderSuggestion={(e) => {
                // console.log(e);
                return <SS.Mention>@{e.display}</SS.Mention>;
              }}
            />
          </MentionsInput>
          <div
            style={{ width: 48, height: 48 }}
            onClick={() => {
              setQuery(item.query.full_text);
              if (queryRef.current) {
                queryRef.current.value = item.query.full_text;
              }
            }}
          >
            <Retry
              fill={theme?.color.black}
              data-tooltip-id={"tooltip_id"}
              data-tooltip-content="Retry"
              data-tooltip-place="bottom"
            />
          </div>
        </S.EditDocumentQueryWrapper>
      ) : (
        <S.DocumentContainer
          id={item ? `Query:${item.query.full_text}` : ""}
          ref={index === -1 ? undefined : refs.current[4 * index + 0]}
        >
          <S.DocumentQueryContainer>
            {item ? item.query.full_text : <Skeleton height={"24px"} />}
          </S.DocumentQueryContainer>
          <S.DocumentStatusWrapper status={item ? item.status : ""}>
            {item
              ? item.status === "completed"
                ? "SUCCESS"
                : item.status === "failed"
                ? "FAIL"
                : "LOADING"
              : "LOADING"}
          </S.DocumentStatusWrapper>
          <div
            style={{ width: 48, height: 48 }}
            onClick={async () => {
              if (item.status === "submitted") {
                toast.current?.show({
                  severity: "error",
                  summary: "Failed",
                  detail: "This document is already loading now..",
                  life: 3000,
                });
              } else {
                console.log(item);
                await generateAI(item.id ?? "", []).then(async (r) => {
                  console.log(r.data);
                  const data = JSON.parse(r.data);
                  if (r.status === 200 || r.status === 201) {
                    if (setIsRefresh) {
                      console.log("setIsRefresh");
                      setIsRefresh(true);
                    }
                  } else {
                    toast.current?.show({
                      severity: "error",
                      summary: "Failed",
                      detail: `${data.detail}`,
                      life: 3000,
                    });
                  }
                });
              }
            }}
          >
            <Retry
              fill={theme?.color.black}
              data-tooltip-id={"tooltip_id"}
              data-tooltip-content="Retry"
              data-tooltip-place="bottom"
            />
          </div>
        </S.DocumentContainer>
      )}
      {item && item.status !== "submitted" && item.children.length === 0 && (
        <S.EmptyWrapper>
          <S.EmptyContainer>There is no sub pages.</S.EmptyContainer>
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
            (item.children as any[]).slice(0, moreNum).map((item, idx) => {
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
                  index={idx}
                  item={item}
                  uniqueReferences={uniqueReferences}
                  documentIdx={index}
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
      {isEdit ? (
        <S.AnswerWrapper
          data-color-mode={isDarkMode ? "dark" : "light"}
          // ref={index === -1 ? undefined : refs.current[4 * index + 2]}
        >
          <MDEditor
            height={800}
            style={{
              width: "100%",
            }}
            value={content}
            onChange={(e) => {
              setContent(e ?? "");
              setUpdateItems((i) => {
                const idx = i.findIndex((item) => item.type === "CONTENT");
                if (idx !== -1) {
                  const res = JSON.parse(JSON.stringify(i));
                  res[idx] = {
                    data: {
                      id: item.id,
                      content: e,
                    },
                    type: "CONTENT",
                  };
                  return res;
                } else {
                  return [
                    ...i,
                    {
                      data: {
                        id: item.id,
                        content: e,
                      },
                      type: "CONTENT",
                    },
                  ];
                }
              });
            }}
          />
        </S.AnswerWrapper>
      ) : (
        <S.AnswerWrapper>
          <div style={{ width: 48, height: 36 }}>
            <AnswerLogo />
          </div>
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
                <S.MarkdownTheme>
                  <MarkdownPreview
                    wrapperElement={{
                      "data-color-mode": isDarkMode ? "dark" : "light",
                    }}
                    source={
                      item.content ? item.content.full_text : "NO CONTENTS"
                    }
                    // source={testText}
                  />
                </S.MarkdownTheme>
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
      )}
      {resources
        .filter(
          (item) =>
            item.type === "bar-chart" ||
            item.type === "causal-graph" ||
            item.type === "candle-chart" ||
            item.type === "fan-chart"
        )
        .map((item, index) => {
          return (
            <BarChart
              item={item}
              key={index}
              setPickIndex={setPickIndex}
              index={index}
              setPickRef={setPickRef}
            />
          );
        })}
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
          resources.filter(
            (item, index) => item.type === "search" || item.type === "news"
          ).length === 0 && (
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
              .map((item, idx) => {
                return (
                  <ReferenceItem index={idx} item={item} documentIdx={index} />
                );
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
      {pickRef && (
        <ReferencePopup
          getDocument={getDocument}
          setPickIndex={setPickIndex}
          setPickRef={setPickRef}
          item={pickRef}
          index={pickIndex}
        />
      )}
    </>
  );
};

export default DocumentItem;
