import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Menubar from "../components/menubar/menubar";
import * as S from "../components/documents/styles";
import { ReactComponent as Divider } from "../assets/Devider.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Export } from "../assets/export.svg";
import { ReactComponent as Option } from "../assets/option.svg";
import { ReactComponent as Add } from "../assets/document_page/Add.svg";
import { ReactComponent as Edit } from "../assets/document_page/Edit.svg";
import { ReactComponent as Close } from "../assets/document_page/Close.svg";
import { ReactComponent as ArrowUp } from "../assets/UpArrow.svg";
import { ReactComponent as ArrowUpDisable } from "../assets/ArrowUpDisable.svg";
import { Mention, MentionsInput } from "react-mentions";
import { Cookies } from "react-cookie";
import {
  generateAI,
  getDocument,
  getDocumentInfo,
  getDocumentTreeData,
  getSuggetion,
  makeNewDocument,
  makePage,
} from "../server/server";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  deleteIdValue,
  menubarOpenState,
  showDeleteModal,
} from "../recoil/recoil";
import DocumentItem from "../components/documents/document_item";
import { Skeleton } from "primereact/skeleton";
import * as SS from "../components/main/styles";
import { ProgressSpinner } from "primereact/progressspinner";
import { DndProvider, useDrop } from "react-dnd";
import { Toast } from "primereact/toast";
import mentionStyle from "../components/documents/mentionStyle";
import "../components/mention.css";

let container: any;

const Document = () => {
  const { id } = useParams();

  const cookies = new Cookies();

  const queryRef = useRef<HTMLInputElement | null>(null);
  const toast = useRef<Toast>(null);
  const queryBorderRef = useRef<HTMLDivElement | null>(null);
  const exampleRef = useRef<HTMLDivElement | null>(null);
  const scrollRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isLoadingToc, setIsLoadingToc] = useState<boolean>(false);

  // const [nowWitch, setNowWitch] = useState<number>(0);

  const [query, setQuery] = useState("");

  const [mentions, setMentions] = useState<any[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const isOpen = useRecoilValue(menubarOpenState);
  const [documentTree, setDocumentTree] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any>();
  const [documentList, setDocumentList] = useState<any[]>([]);
  const [mentionItems, setMentionItems] = useState<any[]>([]);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [pollId, setPollId] = useState<string>("");
  const [pollIdx, setPollIdx] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showIsDeleteModal, setShowIsDeleteModal] =
    useRecoilState(showDeleteModal);
  const [deleteId, setDeleteId] = useRecoilState(deleteIdValue);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "ITEM",
    drop: (item: any) => {
      const idx = mentionItems.findIndex((i) => i.id === item.id);

      if (idx !== -1) {
        toast.current?.show({
          severity: "error",
          summary: "Faild mention",
          detail: "Already add this referenece",
          life: 3000,
        });
        return;
      }

      console.log("drop :::: ", item);
      setMentionItems((list) => {
        list.push(item);
        return list;
      });

      console.log("DROP END :::: ", mentionItems);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    console.log("check value", pollId, pollIdx, isPolling);

    const pollDocument = async () => {
      try {
        console.log("POLLING!!!!!!!!! START!!!!!!!!!");
        const res = await getDocumentInfo(pollId);
        const data = JSON.parse(res.data);

        console.log("START POLLING !~!", data);

        if (res.status === 200 || res.status === 201) {
          setDocumentList((list) => {
            list[pollIdx] = data;
            return list;
          });

          if (data.status !== "submitted") {
            console.log(data.status);
            setIsLoadingToc(!isLoadingToc);
            setIsPolling(false);
            setPollId("");
            setPollIdx(-1);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (isPolling === true) {
      pollDocument();
      setIntervalId(setInterval(pollDocument, 5000)); // 5초마다 폴링
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPolling, pollId, pollIdx]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPolling(false);
        setPollId("");
        setPollIdx(-1);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [id]);

  useEffect(() => {
    console.log("mention items", mentionItems);
  }, [mentionItems]);

  const getDocumentTree = async () => {
    getDocumentTreeData(id ?? "")
      .then((res) => {
        const data: any[] = JSON.parse(res.data);

        const newList = [{ id: "Main", display: "Main" }, "#DIVIDER#"];

        for (var i = 0; i < data.length; i++) {
          newList.push({
            id: data[i].page_id,
            display: data[i].document_query.full_text,
          });
          if (i < data.length - 1) {
            newList.push("#DIVIDER#");
          }
          setDocumentTree(newList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
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

  const getDocumentData = async () => {
    await getDocument(id ?? "")
      .then(async (res) => {
        const data = JSON.parse(res.data);
        console.log("documents : ", data);

        if (res.status === 200 || res.status === 201) {
          setDocuments(data);
          const docs = [];
          const refs = [];

          var idx = 0;

          for (var document of data.documents) {
            const doc = await getDocumentInfo(document.document_id);
            refs.push(
              Math.random(),
              Math.random(),
              Math.random(),
              Math.random()
            );
            const dataDoc = JSON.parse(doc.data);
            docs.push(dataDoc);
            console.log("doc data : ", dataDoc);

            if (dataDoc.status === "submitted") {
              console.log("SUBMITTED!!!!!!!!!");
              setPollId(document.document_id);
              setIsPolling(true);
              setPollIdx(idx);
            }
            idx++;
          }
          scrollRefs.current = refs.map((item) =>
            React.createRef<HTMLDivElement>()
          );
          setDocumentList(docs);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const suggestions = (e: ReactNode) => {
    // console.log(e);
    return <SS.SuggestionsContainer>{e}</SS.SuggestionsContainer>;
  };

  useEffect(() => {
    // scrollRefs.current = [];
    scrollRef.current?.scrollTo(0, 0);
    // setNowWitch(0);
    const token = cookies.get("TOKEN");
    console.log(token);

    if (!token) {
      window.location.href = "/login";
    }
    setDocuments(undefined);
    setDocumentList([]);
    setDocumentTree([]);

    setIsPolling(false);
    setPollId("");
    setPollIdx(-1);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }

    console.log(id);

    getDocumentData();
    getDocumentTree();
  }, [id]);

  useEffect(() => {
    setIsLoadingToc(!isLoadingToc);
  }, [scrollRefs, scrollRefs.current]);

  const queryStyle = {
    minHeight: 55,
    width: "100%",
    borderTopRightRadius: mentionItems.length > 0 ? "0px" : "40px",
    borderTopLeftRadius: mentionItems.length > 0 ? "0px" : "40px",
    borderBottomRightRadius: "40px",
    borderBottomLeftRadius: "40px",
    maxHeight: 200,
    paddingTop: "calc((55px - 18px) / 2)",
    paddingBottom: "calc((55px - 18px) / 2)",
    paddingLeft: 32,
    paddingRight: 64,
    input: {
      scrollbarWidth: "none",
      overflowY: "scroll",
      // borderRadius: "40px",
      borderTopRightRadius: mentionItems.length > 0 ? "0px" : "40px",
      borderTopLeftRadius: mentionItems.length > 0 ? "0px" : "40px",
      borderBottomRightRadius: "40px",
      borderBottomLeftRadius: "40px",
      // color: "transparent",
      boxShadow: "none",
      border: "none",
      outline: "none",
      background: "white",
      paddingLeft: 32,
      paddingRight: 64,
      paddingTop: "calc((55px - 18px) / 2)",
      paddingBottom: "calc((55px - 18px) / 2)",
      boxSizing: "border-box",
      fontSize: 16,
      fontFamily: "LG_Smart_Regular",
    },
  };

  return (
    <Menubar>
      <S.DocumentWrapper isOpen={isOpen}>
        <S.DocumentHeader isOpen={isOpen}>
          <S.DocumentTreeContainer>
            {documentTree.length === 0 ? (
              <>
                <Skeleton width={"200px"} />
                <Divider />
                <Skeleton width={"200px"} />
                <Divider />
                <Skeleton width={"200px"} />
              </>
            ) : (
              documentTree.map((item) => {
                if (item === "#DIVIDER#") {
                  return <Divider />;
                }
                return (
                  <S.DocumentTreeText
                    as={Link}
                    to={`${item.id === "Main" ? "/" : `/document/${item.id}`}`}
                  >
                    {item.display}
                  </S.DocumentTreeText>
                );
              })
            )}
          </S.DocumentTreeContainer>
          <S.DocumentHeaderButtonWrapper>
            <S.SaveAndEditButton
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            >
              {isEdit ? <Add /> : <Edit />}
              {isEdit ? "SAVE" : "EDIT"}
            </S.SaveAndEditButton>
            <S.DocumentHeaderButtonContainer>
              <Option
                data-tooltip-id={"tooltip_id"}
                data-tooltip-content="Save to Folder"
                data-tooltip-place="bottom"
              />
              <Export
                data-tooltip-id={"tooltip_id"}
                data-tooltip-content="Export to PDF"
                data-tooltip-place="bottom"
              />
              <Delete
                data-tooltip-id={"tooltip_id"}
                data-tooltip-content="Delete"
                data-tooltip-place="bottom"
                onClick={(e) => {
                  // setDeleteId(documents.id);
                  cookies.set("deleteId", documents.id);
                  console.log(
                    "=====document id=====",
                    documents.id,
                    typeof deleteId
                  );
                  setShowIsDeleteModal(true);
                }}
              />
            </S.DocumentHeaderButtonContainer>
          </S.DocumentHeaderButtonWrapper>
        </S.DocumentHeader>
        <S.DocumentContentWrapper isOpen={isOpen}>
          <S.DocumentContentContianer ref={scrollRef}>
            <S.DocumentScrollWrapper>
              <S.DocumentContents>
                {!documents ? (
                  <DocumentItem
                    // setScrollRefs={setScrollRefList}
                    // scrollRefs={[]}
                    index={-1}
                    refs={scrollRefs}
                    item={null}
                  />
                ) : (
                  (documents.documents as any[]).map((item, index) => {
                    console.log(item);
                    return (
                      <DocumentItem
                        key={index}
                        index={index}
                        refs={scrollRefs}
                        // setScrollRefs={setScrollRefList}
                        // scrollRefs={scrollRefList}
                        item={
                          documentList.length > 0 ? documentList[index] : null
                        }
                      />
                    );
                  })
                )}
              </S.DocumentContents>
            </S.DocumentScrollWrapper>
            <S.DocumentQueryWrapper>
              <S.QueryInputContainer>
                <S.InputContainer ref={drop}>
                  <SS.QueryInputBorder
                    className="mention_input_styling"
                    ref={(el) => {
                      queryBorderRef.current = el;
                      container = el;
                    }}
                  >
                    <S.MentionItemWrapper length={mentionItems.length}>
                      {mentionItems.map((item, index) => {
                        return (
                          <S.MentionItem key={index}>
                            <S.MentionItemContainer>
                              <S.MentionItemTitle>
                                {item.type === "news"
                                  ? item.data.title
                                  : item.result
                                  ? item.result.title
                                  : ""}
                              </S.MentionItemTitle>
                            </S.MentionItemContainer>
                            {item.type === "news" && (
                              <S.MentionsItemImage
                                src={
                                  item.type === "news" ? item.data.image : ""
                                }
                              />
                            )}
                            <Close
                              style={{
                                position: "absolute",
                                top: 0,
                                right: 0,
                              }}
                              onClick={() => {
                                // setMentionItems(items);
                                setMentionItems((list) =>
                                  list.filter((item, idx) => index !== idx)
                                );
                              }}
                            />
                          </S.MentionItem>
                        );
                      })}
                    </S.MentionItemWrapper>
                    <MentionsInput
                      customSuggestionsContainer={suggestions}
                      disabled={isLoading}
                      className="mention_input_styling"
                      singleLine={false}
                      classNames={["mentions"]}
                      allowSpaceInQuery={true}
                      onChange={(e, newValue, newPlainTextValue, mentions) => {
                        // console.log("newValue : ", newValue);
                        // console.log("newPlainTextValue", newPlainTextValue);
                        console.log("mentions", mentions);
                        console.log("value", e.target.value);

                        setMentions(mentions);

                        setQuery(e.target.value);
                      }}
                      allowSuggestionsAboveCursor={true}
                      suggestionsPortalHost={container}
                      // forceSuggestionsAboveCursor={true}
                      inputRef={queryRef}
                      style={queryStyle}
                      placeholder="Ask Something.."
                      value={query}
                      onFocus={() => {
                        queryBorderRef.current?.classList.add("focus");
                        exampleRef.current?.classList.add("focus");
                        console.log("Focus!");
                      }}
                      onBlur={() => {
                        console.log("Blur!");
                        if (query.length === 0) {
                          queryBorderRef.current?.classList.remove("focus");
                          exampleRef.current?.classList.remove("focus");
                        }
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
                  </SS.QueryInputBorder>
                  <S.QuerySendButton
                    query={query}
                    onClick={async () => {
                      console.log(mentionItems);
                      let q = `${query}`;
                      const m = [...mentions];
                      console.log(m);
                      const mentionList = m.map((item) => {
                        const mention = item.id.split("|||");

                        console.log(mention);

                        return {
                          key: mention[0],
                          value: mention[1],
                        };
                      });

                      mentionList.map((item) => {
                        q = q.replaceAll(
                          `@[${item.key}](${item.key}|||${item.value})`,
                          `@${item.key}`
                        );
                      });

                      console.log(q, mentionList);

                      const references = mentionItems.map((item) => {
                        return {
                          type: item.type,
                          id: item.id,
                        };
                      });

                      setIsLoading(true);

                      await makeNewDocument(documents.id, q, mentionList)
                        .then(async (res) => {
                          const data =
                            typeof res.data === "string"
                              ? JSON.parse(res.data)
                              : res.data;

                          console.log(data);

                          if (res.status === 200 || res.status === 201) {
                            await generateAI(data.id, references).then(
                              async (r) => {
                                console.log(r.data);
                                if (r.status === 200 || r.status === 201) {
                                  setIsLoading(false);
                                  setMentionItems([]);
                                  if (queryRef.current) {
                                    queryRef.current.value = "";
                                    queryRef.current.blur();
                                  }
                                  setQuery("");
                                  await getDocumentData();
                                } else {
                                  toast.current?.show({
                                    severity: "error",
                                    summary: "Failed",
                                    detail: `${data.detail}`,
                                    life: 3000,
                                  });
                                  setIsLoading(false);
                                }
                              }
                            );
                          } else {
                            if (res.status === 422) {
                              toast.current?.show({
                                severity: "error",
                                summary: "Failed",
                                detail: `${data.detail[0].msg}`,
                                life: 3000,
                              });
                              setIsLoading(false);
                            }
                          }
                        })
                        .catch((err) => {
                          toast.current?.show({
                            severity: "error",
                            summary: "Failed",
                            content: `${err}`,
                            life: 3000,
                          });
                          setIsLoading(false);
                        });
                    }}
                  >
                    {query !== "" ? <ArrowUp /> : <ArrowUpDisable />}
                  </S.QuerySendButton>
                </S.InputContainer>
              </S.QueryInputContainer>
            </S.DocumentQueryWrapper>
          </S.DocumentContentContianer>
          <S.DocumentRightBar>
            <S.DocumentRightBarTitle>On this page</S.DocumentRightBarTitle>
            <S.DocumentRightBarListContainer>
              {documentList.length > 0 &&
                scrollRefs.current
                  .filter((item) => item.current?.id.startsWith("Query"))
                  .map((item, index) => {
                    console.log("item ref : ", item.current?.id);
                    return (
                      <>
                        {item.current?.id.startsWith("Query") && (
                          <>
                            <S.DocumentRightBarText
                              style={{
                                paddingBottom: 18,
                              }}
                              key={index}
                              isInterect={false}
                              onClick={() => {
                                console.log(item);
                                item.current?.scrollIntoView({
                                  behavior: "smooth",
                                });
                              }}
                            >
                              <div>•</div>
                              {/* {item?.nodeValue} */}
                              {item.current?.id}
                            </S.DocumentRightBarText>
                            <S.DocumentRightOl>
                              <S.DocumentRightBarText
                                key={`${
                                  scrollRefs.current[4 * index + 1].current?.id
                                }`}
                                isInterect={false}
                                onClick={() => {
                                  console.log(
                                    scrollRefs.current[4 * index + 1]
                                  );
                                  // item.current?.scrollIntoView({
                                  //   behavior: "smooth",
                                  // });
                                  scrollRefs.current[
                                    4 * index + 1
                                  ].current?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {/* {item?.nodeValue} */}
                                <div>•</div>
                                <div>{`${
                                  scrollRefs.current[4 * index + 1].current?.id
                                }`}</div>
                              </S.DocumentRightBarText>
                              <S.DocumentRightBarText
                                key={`${scrollRefs.current[
                                  4 * index + 2
                                ].current?.id
                                  .replaceAll("#", "")
                                  .replaceAll("*", "")}`}
                                isInterect={false}
                                onClick={() => {
                                  console.log(
                                    scrollRefs.current[4 * index + 2]
                                  );
                                  // item.current?.scrollIntoView({
                                  //   behavior: "smooth",
                                  // });
                                  scrollRefs.current[
                                    4 * index + 2
                                  ].current?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {/* {item?.nodeValue} */}
                                <div>•</div>
                                <div>{`${scrollRefs.current[
                                  4 * index + 2
                                ].current?.id
                                  .replaceAll("#", "")
                                  .replaceAll("*", "")}`}</div>
                              </S.DocumentRightBarText>
                              <S.DocumentRightBarText
                                key={`${
                                  scrollRefs.current[4 * index + 3].current?.id
                                }`}
                                isInterect={false}
                                onClick={() => {
                                  console.log(
                                    scrollRefs.current[4 * index + 3]
                                  );
                                  // item.current?.scrollIntoView({
                                  //   behavior: "smooth",
                                  // });
                                  scrollRefs.current[
                                    4 * index + 3
                                  ].current?.scrollIntoView({
                                    behavior: "smooth",
                                  });
                                }}
                              >
                                {/* {item?.nodeValue} */}
                                <div>•</div>
                                <div>{`${
                                  scrollRefs.current[4 * index + 3].current?.id
                                }`}</div>
                              </S.DocumentRightBarText>
                            </S.DocumentRightOl>
                          </>
                        )}
                      </>
                    );
                  })}
            </S.DocumentRightBarListContainer>
          </S.DocumentRightBar>
        </S.DocumentContentWrapper>
      </S.DocumentWrapper>
      <Tooltip
        style={{
          fontFamily: "LG_Smart_SemiBold",
          color: "white",
          background: "rgba(117, 117, 117, 1)",
          borderRadius: 8,
        }}
        id={"tooltip_id"}
        place="bottom"
      />
      <Toast ref={toast} />
      {isLoading && (
        <SS.LoadingWrapper>
          <ProgressSpinner />
        </SS.LoadingWrapper>
      )}
    </Menubar>
  );
};

export default Document;