import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Cookies } from "react-cookie";
import Menubar from "../components/menubar/menubar";
import * as S from "../components/main/styles";
import { ReactComponent as ArrowUp } from "../assets/UpArrow.svg";
import { ReactComponent as ArrowUpDisable } from "../assets/ArrowUpDisable.svg";
import { Mention, MentionsInput } from "react-mentions";
import {
  generateAI,
  getExampleQueries,
  getSuggetion,
  makePage,
} from "../server/server";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import "../components/mention.css";
import { ThemeContext } from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkModeState } from "../recoil/recoil";

let container: any;

const MainPage = () => {
  const cookies = new Cookies();
  const theme = useContext(ThemeContext);

  const queryRef = useRef<HTMLInputElement | null>(null);
  const queryBorderRef = useRef<HTMLDivElement | null>(null);
  const exampleRef = useRef<HTMLDivElement | null>(null);
  const toast = useRef<Toast>(null);

  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [examples, setExamples] = useState<any[]>([]);
  const [mentions, setMentions] = useState<{ id: string; display: string }[]>(
    []
  );
  const isDarkMode = useRecoilValue(isDarkModeState);

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

  const getExamples = async () => {
    await getExampleQueries()
      .then((res) => {
        console.log(res.data);
        const data = JSON.parse(res.data);
        if (res.status === 200 || res.status === 201) {
          setExamples(data);
        }
      })
      .catch((err) => {
        console.log(err);
        setExamples([]);
      });
  };

  useEffect(() => {
    const token = cookies.get("TOKEN");
    console.log(token);

    if (!token) {
      window.location.href = "/login";
    }

    getExamples();
  }, []);

  const suggestions = (e: ReactNode) => {
    // console.log(e);
    return <S.SuggestionsContainer>{e}</S.SuggestionsContainer>;
  };

  const queryStyle = {
    minHeight: 55,
    width: "100%",
    paddingLeft: 32,
    paddingRight: 64,
    maxHeight: 200,
    // color: "transparent",
    paddingTop: "calc((55px - 18px) / 2)",
    paddingBottom: "calc((55px - 18px) / 2)",
    fontFamily: "Pretendard-Regular",
    input: {
      scrollbarWidth: "none",
      overflowY: "scroll",
      borderRadius: "40px",
      fontFamily: "Pretendard-Regular",
      // fontFamily: "Pretendard",
      boxShadow: "none",
      // color: "transparent",
      // lineHeight: 1,
      border: "none",
      color: theme?.color.black,
      outline: "none",
      background: theme?.color.white,
      paddingLeft: 32,
      paddingRight: 64,
      paddingTop: "calc((55px - 18px) / 2)",
      paddingBottom: "calc((55px - 18px) / 2)",
      boxSizing: "border-box",
      fontSize: 16,
    },
  };

  const videoSrc1 = isDarkMode ? "video_dark_1.mp4" : "video1.mp4";
  const videoSrc2 = isDarkMode ? "video_dark_2.mp4" : "video2.mp4";
  const videoSrc3 = isDarkMode ? "video_dark_3.mp4" : "video3.mp4";

  const video1 = useRef<HTMLVideoElement>(null);
  const video2 = useRef<HTMLVideoElement>(null);
  const video3 = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (video1.current && video2.current && video3.current) {
      if (isDarkMode) {
        video1.current.src = "video_dark_1.mp4";
        video2.current.src = "video_dark_2.mp4";
        video3.current.src = "video_dark_3.mp4";
      } else {
        video1.current.src = "video1.mp4";
        video2.current.src = "video2.mp4";
        video3.current.src = "video3.mp4";
      }
    }
  }, [isDarkMode]);

  return (
    <Menubar>
      <S.MainPageWrapper>
        <S.MainPageContainer>
          <S.AssetContianer>
            <S.AssetImageContainer>
              <S.AssetImage muted autoPlay loop ref={video1}>
                <source src={videoSrc1} type="video/mp4" />
              </S.AssetImage>
              <S.AssetText>
                @ 를 입력한 뒤 예측하고 싶은 대상을
                <br />
                검색하고 선택합니다.
              </S.AssetText>
            </S.AssetImageContainer>
            <S.AssetImageContainer>
              <S.AssetImage muted autoPlay loop ref={video2}>
                <source src={videoSrc2} type="video/mp4" />
              </S.AssetImage>
              <S.AssetText>
                예측상황을 AI에게 설명하고
                <br />
                AI의 분석 결과를 기다리세요.
              </S.AssetText>
            </S.AssetImageContainer>
            <S.AssetImageContainer>
              <S.AssetImage muted autoPlay loop ref={video3}>
                <source src={videoSrc3} type="video/mp4" />
              </S.AssetImage>
              <S.AssetText>
                추가 질문이 있다면
                <br />
                검색창으로 드래그앤 드롭 하세요.
              </S.AssetText>
            </S.AssetImageContainer>
          </S.AssetContianer>
          <S.HowToUse>
            {`How to use `}
            <S.Futurecast>Futurecast</S.Futurecast>
          </S.HowToUse>
          <S.ExampleQueryGrid ref={exampleRef}>
            {examples.map((item, index) => {
              return (
                <S.ExampleQueryItem
                  key={index}
                  onClick={(e) => {
                    if (queryRef.current) {
                      let makeQuery: string = item.full_text;

                      for (var mention of item.mentions) {
                        console.log(`@${mention.key}`);
                        console.log(makeQuery.includes(`@${mention.key}`));
                        const display = `@${mention.key}`;
                        const id = `${mention.key}|||${mention.value}`;
                        makeQuery = makeQuery.replaceAll(
                          display,
                          `@[${mention.key}](${mention.key}|||${mention.value})`
                        );
                        setMentions([
                          ...mentions,
                          {
                            id: id,
                            display: display,
                          },
                        ]);
                      }
                      console.log("query: ", makeQuery);
                      queryRef.current.value = makeQuery;
                      queryRef.current.focus();
                      setQuery(makeQuery);
                    }
                  }}
                >
                  {item.full_text}
                </S.ExampleQueryItem>
              );
            })}
          </S.ExampleQueryGrid>
          <S.InputContainer className={"focus"} ref={(el) => (container = el)}>
            <S.QueryInputBorder ref={queryBorderRef}>
              <MentionsInput
                disabled={isLoading}
                customSuggestionsContainer={suggestions}
                singleLine={false}
                classNames={["mentions", "focus"]}
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
                  className="mention_style"
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
                    return <S.Mention>@{e.display}</S.Mention>;
                  }}
                />
              </MentionsInput>
            </S.QueryInputBorder>
            <S.QuerySendButton
              query={query}
              onClick={async (e) => {
                e.stopPropagation();
                console.log("test");
                if (query === "") {
                  toast.current?.show({
                    severity: "error",
                    summary: "Failed",
                    detail: `Please, Input some query`,
                    life: 3000,
                  });
                  return;
                }
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

                setIsLoading(true);

                await makePage(q, mentionList)
                  .then(async (res) => {
                    const data =
                      typeof res.data === "string"
                        ? JSON.parse(res.data)
                        : res.data;

                    console.log(data);

                    if (res.status === 200 || res.status === 201) {
                      await generateAI(data.documents[0].document_id, []).then(
                        (r) => {
                          console.log(r.data);
                          if (r.status === 200 || r.status === 201) {
                            setIsLoading(false);
                            window.location.href = `/document/${data.id}`;
                          } else {
                            toast.current?.show({
                              severity: "error",
                              summary: "Failed",
                              detail: `${data.detail}`,
                              life: 3000,
                            });
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
        </S.MainPageContainer>
        {isLoading && (
          <S.LoadingWrapper>
            <ProgressSpinner color={"#5661f6"} />
          </S.LoadingWrapper>
        )}
      </S.MainPageWrapper>
      <Toast ref={toast} />
    </Menubar>
  );
};

export default MainPage;
