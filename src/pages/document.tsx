import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import Menubar from "../components/menubar/menubar";
import * as S from "../components/documents/styles";
import { ReactComponent as Divider } from "../assets/Devider.svg";
import { ReactComponent as Bar } from "../assets/graph/NodeChart.svg";
import { ReactComponent as Candle } from "../assets/graph/BarChart.svg";
import { ReactComponent as Node } from "../assets/graph/CandleChart.svg";
import { ReactComponent as Fan } from "../assets/graph/FanChart.svg";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as Export } from "../assets/export.svg";
import { ReactComponent as Option } from "../assets/option.svg";
import { ReactComponent as ItemOption } from "../assets/document_page/ItemOption.svg";
import { ReactComponent as Add } from "../assets/document_page/Add.svg";
import { ReactComponent as Edit } from "../assets/document_page/Edit.svg";
import { ReactComponent as Close } from "../assets/document_page/Close.svg";
import { ReactComponent as ArrowUp } from "../assets/UpArrow.svg";
import { ReactComponent as ArrowUpDisable } from "../assets/ArrowUpDisable.svg";
import { Mention, MentionsInput } from "react-mentions";
import { Cookies } from "react-cookie";
import generatePDF, { Margin, Resolution, usePDF } from "react-to-pdf";
import {
  deleteDocument,
  deletePage,
  deleteReference,
  generateAI,
  getDocument,
  getDocumentInfo,
  getDocumentTreeData,
  getNavBar,
  getSuggetion,
  makeNewDocument,
  makePage,
  moveCollectionItem,
  updateDescription,
  updateDocument,
} from "../server/server";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  deleteIdValue,
  deleteItemsState,
  documentListState,
  isDarkModeState,
  isEditDocumentState,
  isLoadingNavState,
  menubarOpenState,
  showDeleteModal,
  treeDataState,
  updateItemsState,
} from "../recoil/recoil";
import DocumentItem from "../components/documents/document_item";
import { Skeleton } from "primereact/skeleton";
import * as SS from "../components/main/styles";
import { ProgressSpinner } from "primereact/progressspinner";
import { DndProvider, useDrop } from "react-dnd";
import { Toast } from "primereact/toast";
import "../components/mention.css";
import { Menu } from "primereact/menu";
import { MenuItem, MenuItemCommandEvent } from "primereact/menuitem";
import { ThemeContext } from "styled-components";
import ReferencePopup from "../components/documents/document_refrence/reference_popup";

let container: any;

const Document = () => {
  const { id } = useParams();
  const theme = useContext(ThemeContext);

  const cookies = new Cookies();

  const queryRef = useRef<HTMLInputElement | null>(null);
  const toast = useRef<Toast>(null);
  const queryBorderRef = useRef<HTMLDivElement | null>(null);
  const exampleRef = useRef<HTMLDivElement | null>(null);
  const scrollRefs = useRef<React.RefObject<HTMLDivElement>[]>([]);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<Menu>(null);

  const [isLoadingToc, setIsLoadingToc] = useState<boolean>(false);

  // const [nowWitch, setNowWitch] = useState<number>(0);

  const [query, setQuery] = useState("");

  const [mentions, setMentions] = useState<any[]>([]);
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | null>(null);

  const [isRefresh, setIsRefresh] = useState<boolean>(false);

  const isOpen = useRecoilValue(menubarOpenState);
  const [documentTree, setDocumentTree] = useState<any[]>([]);
  const [isEdit, setIsEdit] = useRecoilState(isEditDocumentState);
  const [documents, setDocuments] = useState<any>();
  const [documentList, setDocumentList] = useRecoilState(documentListState);
  const [mentionItems, setMentionItems] = useState<any[]>([]);
  const [isPolling, setIsPolling] = useState<boolean>(false);
  const [pollId, setPollId] = useState<string>("");
  const [pollIdx, setPollIdx] = useState<number>(-1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenView, setIsOpenView] = useState(false);
  const setShowIsDeleteModal = useSetRecoilState(showDeleteModal);
  const [collections, setCollections] = useState<MenuItem[]>([]);
  const treeData = useRecoilValue(treeDataState);
  const setIsLoadingNav = useSetRecoilState(isLoadingNavState);
  const isDarkMode = useRecoilValue(isDarkModeState);

  const [updateItems, setUpdateItems] = useRecoilState(updateItemsState);
  const [deleteItems, setDeleteItems] = useRecoilState(deleteItemsState);

  useEffect(() => {
    if (isRefresh) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
        setIsPolling(false);
        setPollId("");
        setPollIdx(-1);
      }

      setDocuments(undefined);
      setDocumentList([]);
      setDocumentTree([]);
      setIsEdit(false);

      setIsPolling(false);
      setPollId("");
      setPollIdx(-1);

      console.log(id);

      getDocumentTree();
      getDocumentData().then((res) => {
        setIsRefresh(false);
        setIsLoading(false);
      });
    }
  }, [isRefresh]);

  useEffect(() => {
    const getCollections = async () => {
      const items: MenuItem[] = [];

      var idx = 0;
      const list = treeData.filter((item) => item.data.type === "FOLDER");

      for (var collection of list) {
        items.push({
          label: collection.text,
          data: collection,
          template: (item, option) => {
            return (
              <S.CollectionItem
                idx={idx}
                length={list.length}
                onClick={async () => {
                  await moveCollectionItem(item.data?.data?.id, id ?? "").then(
                    (res) => {
                      const data = JSON.parse(res.data);

                      toast.current?.show({
                        severity:
                          res.status === 200 || res.status === 201
                            ? "success"
                            : "error",
                        summary:
                          res.status === 200 || res.status === 201
                            ? "Success"
                            : "Error",
                        detail:
                          res.status === 200 || res.status === 201
                            ? "Success to move collection"
                            : data.detail,
                        life: 3000,
                      });

                      if (res.status === 200 || res.status === 201) {
                        setIsLoadingNav(true);
                      }
                      console.log(res.data);
                    }
                  );
                }}
              >
                <ItemOption fill={theme?.color.black} />
                <S.CollectionName>{item.label}</S.CollectionName>
              </S.CollectionItem>
            );
          },
        });

        idx++;
      }

      setCollections(items);
    };

    getCollections();
  }, [treeData, isDarkMode]);

  const { toPDF, targetRef } = usePDF({
    method: "save",
    page: {
      margin: Margin.MEDIUM,
    },
    filename: `${id}.pdf`,
  });

  const [isLoadingPDF, setIsLoadingPDF] = useState(false);

  const handleDrop = useCallback(
    (item: any) => {
      const idx = mentionItems.findIndex((i) => i.id === item.id);

      console.log("mention items drop :::: ", item, idx, mentionItems);

      if (idx !== -1) {
        toast.current?.show({
          severity: "error",
          summary: "Faild mention",
          detail: "Already add this referenece",
          life: 3000,
        });
        return;
      }
      setMentionItems((list) => {
        list.push(item);
        return list;
      });

      console.log("DROP END :::: ", mentionItems);
    },
    [mentionItems]
  );

  const [_, drop] = useDrop(
    () => ({
      accept: "ITEM",
      drop: handleDrop,
      // hover: handleDrop,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [mentionItems]
  );

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
            console.log(pollIdx);
            const res = [...list];
            console.log(`${list[pollIdx]}`);
            res[pollIdx] = data;
            return res;
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
      setIsPolling(false);
      setPollId("");
      setPollIdx(-1);
      setIntervalId(null);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        setIsPolling(false);
        setPollId("");
        setPollIdx(-1);
        setIntervalId(null);
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
    console.log("RESULT");
    console.log(documentList);
    console.log("RESULT");
  }, [documentList]);

  useEffect(() => {
    // scrollRefs.current = [];
    scrollRef.current?.scrollTo(0, 0);
    // setNowWitch(0);
    const token = cookies.get("TOKEN");
    console.log(token);

    if (!token) {
      window.location.href = "/login";
    }
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      setIsPolling(false);
      setPollId("");
      setPollIdx(-1);
    }
    setDocuments(undefined);
    setDocumentList([]);
    setDocumentTree([]);
    setIsEdit(false);

    setIsPolling(false);
    setPollId("");
    setPollIdx(-1);

    console.log(id);

    getDocumentData();
    getDocumentTree();
  }, [id]);

  useEffect(() => {
    setIsLoadingToc(!isLoadingToc);
  }, [scrollRefs, scrollRefs.current, isEdit]);

  useEffect(() => {
    console.log("scroll : :::: : : ", scrollRef.current);
  }, [isEdit]);

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
      background: theme?.color.white,
      paddingLeft: 32,
      paddingRight: 64,
      paddingTop: "calc((55px - 18px) / 2)",
      paddingBottom: "calc((55px - 18px) / 2)",
      boxSizing: "border-box",
      color: theme?.color.black,
      fontSize: 16,
      fontFamily: "Pretendard-Regular",
    },
  };

  return (
    <>
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
                      to={`${
                        item.id === "Main" ? "/" : `/document/${item.id}`
                      }`}
                    >
                      {item.display}
                    </S.DocumentTreeText>
                  );
                })
              )}
            </S.DocumentTreeContainer>
            <S.DocumentHeaderButtonWrapper>
              <S.SaveAndEditButton
                onClick={async () => {
                  if (documents && documentList.length > 0) {
                    if (isEdit) {
                      setIsLoading(true);
                      console.log("SAVE ::: ", updateItems, deleteItems);

                      for (var deleteItem of deleteItems) {
                        switch (deleteItem.type) {
                          case "SUB_PAGE":
                            console.log(
                              "DELETE_SUB_PAGE ::: ",
                              deleteItem.data
                            );
                            await deletePage(deleteItem.data.page_id).then(
                              (res) => {
                                if (res.status !== 200) {
                                  const data = JSON.parse(res.data);
                                  toast.current?.show({
                                    severity: "error",
                                    summary: "Failed",
                                    detail: data.detail,
                                    life: 3000,
                                  });
                                }
                              }
                            );
                            break;
                          case "REFERENCE":
                            await deleteReference(
                              deleteItem.data.id,
                              deleteItem.data.type
                            ).then((res) => {
                              if (res.status !== 200) {
                                const data = JSON.parse(res.data);
                                toast.current?.show({
                                  severity: "error",
                                  summary: "Failed",
                                  detail: data.detail,
                                  life: 3000,
                                });
                              }
                            });
                            break;
                          case "CONTENT":
                          case "DESCRIPTION":
                          case "QUERY":
                          default:
                            break;
                        }
                      }

                      for (var updateItem of updateItems) {
                        switch (updateItem.type) {
                          case "CONTENT":
                            await updateDocument(
                              updateItem.data.id,
                              {
                                full_text: updateItem.data.content,
                                mentions: [],
                              },
                              null
                            ).then((res) => {
                              console.log("RES :::::", JSON.parse(res.data));
                              if (res.status !== 200) {
                                const data = JSON.parse(res.data);
                                toast.current?.show({
                                  severity: "error",
                                  summary: "Failed",
                                  detail: data.detail,
                                  life: 3000,
                                });
                              }
                            });
                            break;
                          case "DESCRIPTION":
                            await updateDescription(
                              updateItem.data.id,
                              updateItem.data.description,
                              updateItem.data.type
                            ).then((res) => {
                              console.log("RES ::::: ", res.data);

                              if (res.status !== 200) {
                                const data = JSON.parse(res.data);
                                toast.current?.show({
                                  severity: "error",
                                  summary: "Failed",
                                  detail: data.detail,
                                  life: 3000,
                                });
                              }
                            });
                            break;
                          case "QUERY":
                            let q = `${updateItem.data.full_text}`;
                            const m = [...updateItem.data.mentions];
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

                            await updateDocument(updateItem.data.id, null, {
                              full_text: q,
                              mentions: mentionList,
                            }).then((res) => {
                              console.log("RES ::::: ", res.data);

                              if (res.status !== 200) {
                                const data = JSON.parse(res.data);
                                toast.current?.show({
                                  severity: "error",
                                  summary: "Failed",
                                  detail: data.detail,
                                  life: 3000,
                                });
                              }
                            });
                            break;
                          case "REFERENCE":
                          case "SUB_PAGE":
                          default:
                            break;
                        }
                      }

                      setDeleteItems([]);
                      setUpdateItems([]);

                      await getDocumentData().then((res) =>
                        setIsLoading(false)
                      );
                    } else {
                    }

                    setIsEdit(!isEdit);
                  }
                }}
              >
                {isEdit ? <Add /> : <Edit />}
                {isEdit ? "SAVE" : "EDIT"}
              </S.SaveAndEditButton>
              <S.DocumentHeaderButtonContainer>
                <S.HeaderButton
                  aria-controls="option_menu_popup"
                  aria-haspopup
                  onClick={(e) => {
                    menuRef.current?.toggle(e);
                  }}
                >
                  <Menu
                    model={collections}
                    popup
                    ref={menuRef}
                    id="option_menu_popup"
                    color={theme?.color.black}
                    style={{
                      backgroundColor: theme?.color.white,
                      boxShadow: "0px -8px 36px 0px rgba(0, 0, 0, 0.17)",
                      borderRadius: 14,
                      border: "none",
                    }}
                  />
                  <Option
                    fill={theme?.color.black}
                    data-tooltip-id={"tooltip_id"}
                    data-tooltip-content="Save to Folder"
                    data-tooltip-place="bottom"
                  />
                </S.HeaderButton>
                <Export
                  fill={theme?.color.black}
                  data-tooltip-id={"tooltip_id"}
                  data-tooltip-content="Export to PDF"
                  data-tooltip-place="bottom"
                  onClick={async () => {
                    setIsLoadingPDF(true);
                    setIsOpenView(true);
                    setTimeout(() => {
                      toPDF();
                    }, 3000);
                    setTimeout(() => {
                      setIsLoadingPDF(false);
                      setIsOpenView(false);
                    }, 4000);
                  }}
                />
                <Delete
                  fill={theme?.color.black}
                  data-tooltip-id={"tooltip_id"}
                  data-tooltip-content="Delete"
                  data-tooltip-place="bottom"
                  onClick={(e) => {
                    // setDeleteId(documents.id);
                    if (documents) {
                      // console.log(
                      //   "=====document id=====",
                      //   documents.id,
                      //   typeof deleteId
                      // );
                      cookies.set("deleteId", documents.id);
                      setShowIsDeleteModal(true);
                    } else {
                      toast.current?.show({
                        severity: "error",
                        summary: "Failed",
                        detail:
                          "The document is still loading. Please wait a moment.",
                        life: 3000,
                      });
                    }
                  }}
                />
              </S.DocumentHeaderButtonContainer>
            </S.DocumentHeaderButtonWrapper>
          </S.DocumentHeader>
          <S.DocumentContentWrapper isOpen={isOpen}>
            <S.DocumentContentContianer ref={scrollRef}>
              <S.DocumentScrollWrapper
                ref={targetRef}
                style={
                  isLoadingPDF
                    ? {
                        overflow: "visible",
                      }
                    : {}
                }
              >
                <S.DocumentContents>
                  {!documents ? (
                    <DocumentItem
                      toast={toast}
                      setIsLoading={setIsLoading}
                      getDocument={async () => {}}
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
                          toast={toast}
                          setIsLoading={setIsLoading}
                          getDocument={getDocumentData}
                          isOpenView={isOpenView}
                          setIsRefresh={setIsRefresh}
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
                      // className="mention_input_styling"
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
                                    : item.description
                                    ? item.description
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
                              {item.type !== "news" &&
                                item.type !== "search" && (
                                  <S.IconMentionsItemImage
                                    color={
                                      item.type === "bar-chart"
                                        ? "rgba(222, 222, 227, 0.8)"
                                        : item.type === "candle-chart"
                                        ? "rgba(219, 200, 221, 0.8)"
                                        : item.type === "causal-graph"
                                        ? "rgba(236, 227, 222, 0.8)"
                                        : item.type === "fan-chart"
                                        ? "rgba(240, 234, 232, 0.8)"
                                        : "rgba(222, 222, 227, 0.8)"
                                    }
                                  >
                                    {item.type === "bar-chart" && <Bar />}
                                    {item.type === "fan-chart" && <Fan />}
                                    {item.type === "causal-graph" && <Node />}
                                    {item.type === "candle-chart" && <Candle />}
                                  </S.IconMentionsItemImage>
                                )}
                              <Close
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  right: 0,
                                  cursor: "pointer",
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
                        disabled={false}
                        // className="mention_input_styling"
                        singleLine={false}
                        classNames={["mentions", "focus"]}
                        allowSpaceInQuery={true}
                        onChange={(
                          e,
                          newValue,
                          newPlainTextValue,
                          mentions
                        ) => {
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
                      onClick={async (e) => {
                        e.stopPropagation();
                        if (query === "") {
                          toast.current?.show({
                            severity: "error",
                            summary: "Failed",
                            detail: `Please Input some query`,
                            life: 3000,
                          });
                          return;
                        }
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
                      {query !== "" ? (
                        <ArrowUp fill={theme?.color.white} />
                      ) : (
                        <ArrowUpDisable />
                      )}
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
                                {/* {item?.nodeValue} */}
                                {item.current?.id.substring(6)}
                              </S.DocumentRightBarText>
                              <S.DocumentRightOl>
                                <S.DocumentRightBarText
                                  key={`${
                                    scrollRefs.current[4 * index + 1].current
                                      ?.id
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
                                  <div>{`${
                                    scrollRefs.current[4 * index + 1].current
                                      ?.id
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
                                  <div>{`${scrollRefs.current[
                                    4 * index + 2
                                  ].current?.id
                                    .replaceAll("#", "")
                                    .replaceAll("*", "")}`}</div>
                                </S.DocumentRightBarText>
                                <S.DocumentRightBarText
                                  key={`${
                                    scrollRefs.current[4 * index + 3].current
                                      ?.id
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
                                  <div>{`${
                                    scrollRefs.current[4 * index + 3].current
                                      ?.id
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
            fontFamily: "Pretendard-SemiBold",
            color: "${({theme}) => theme.color.white}",
            background: "rgba(117, 117, 117, 1)",
            borderRadius: 8,
          }}
          id={"tooltip_id"}
          place="bottom"
        />
        <Toast ref={toast} />
        {isLoading && (
          <SS.LoadingWrapper>
            <ProgressSpinner color="#5661f6" />
          </SS.LoadingWrapper>
        )}
      </Menubar>
    </>
  );
};

export default Document;
