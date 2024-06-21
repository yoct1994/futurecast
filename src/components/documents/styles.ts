import Markdown from "react-markdown";
import styled from "styled-components";
import AddEdge from "../../assets/node_graph_edit/AddEdge.svg";
import AddNode from "../../assets/node_graph_edit/AddNode.svg";
import Expanded from "../../assets/node_graph_edit/Expanded.svg";
import Edit from "../../assets/node_graph_edit/EditNode.svg";
import Back from "../../assets/node_graph_edit/Back.svg";
import ZoomIn from "../../assets/node_graph_edit/add.svg";
import ZoomOut from "../../assets/node_graph_edit/minus.svg";
import Delete from "../../assets/node_graph_edit/DeleteNode.svg";
import DarkAddEdge from "../../assets/node_graph_edit/dark/AddEdge.svg";
import DarkAddNode from "../../assets/node_graph_edit/dark/AddNode.svg";
import DarkDelete from "../../assets/node_graph_edit/dark/DeleteNode.svg";
import DarkEdit from "../../assets/node_graph_edit/dark/EditNode.svg";
import DarkBack from "../../assets/node_graph_edit/dark/Back.svg";

export const DocumentWrapper = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* padding-left: ${(props) => (props.isOpen ? "0px" : "280px")}; */
`;

export const DocumentHeader = styled.div<{ isOpen: boolean }>`
  width: 100%;
  height: 64px;
  display: flex;
  /* background-color: green; */
  padding-right: 28px;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  padding-left: ${(props) => (props.isOpen ? "60px" : "80px")};
`;

export const DocumentTreeContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: flex-start;
  align-items: center;
`;

export const DocumentTreeText = styled.div`
  font-size: 16px;
  color: ${({ theme }) => theme.color.black};
  font-family: "Pretendard-Regular";
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
`;

export const DocumentHeaderButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
  /* background-color: green; */
`;

export const DocumentHeaderButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  svg {
    cursor: pointer;
  }
`;

export const SaveAndEditButton = styled.div`
  display: flex;
  height: 32px;
  flex-direction: row;
  padding-left: 8px;
  padding-right: 12px;
  box-sizing: border-box;
  padding-top: 4px;
  padding-bottom: 4px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grey2};
  color: ${({ theme }) => theme.color.black};
  gap: 4px;
  align-items: center;

  font-size: 14px;
  font-family: "Pretendard-SemiBold";

  cursor: pointer;

  &:hover {
    background-color: rgba(86, 97, 246, 1);
    border: 1px solid rgba(86, 97, 246, 1);
    color: ${({ theme }) => theme.color.white};
    svg {
      color: ${({ theme }) => theme.color.white};
      fill: ${({ theme }) => theme.color.white};
    }
    path {
      color: ${({ theme }) => theme.color.white};
      fill: ${({ theme }) => theme.color.white};
    }
  }
`;

export const DocumentContentWrapper = styled.div<{ isOpen: boolean }>`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 64px);
  /* flex: 1; */
  /* background: green; */
  padding-left: ${(props) => (props.isOpen ? "0px" : "280px")};
`;

export const DocumentContentContianer = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  /* background-color: grey; */
`;

export const DocumentScrollWrapper = styled.div`
  width: 100%;
  /* height: 100%; */
  flex: 1;
  overflow-y: scroll;
  /* overflow-x: hidden; */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DocumentContents = styled.div`
  width: 812px;
  height: 100%;
  box-sizing: border-box;
`;

export const DocumentLoadingArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DocumentRightBar = styled.div`
  width: 400px;
  height: 100%;
  border-left: 1px solid ${({ theme }) => theme.color.divider};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
  overflow-x: hidden;
  box-sizing: border-box;
  flex-wrap: nowrap;
  padding-top: 8px;
  padding-left: 24px;
  padding-right: 24px;
  padding-bottom: 30px;
  /* background-color: green; */
`;

export const DocumentRightBarTitle = styled.div`
  width: 100%;
  height: 27px;
  display: flex;
  align-items: center;
  font-size: 18px;
  font-family: "Pretendard-SemiBold";
  color: ${({ theme }) => theme.color.black};
  margin-bottom: 24px;
`;

export const DocumentRightBarText = styled.li<{ isInterect: boolean }>`
  width: 250px;
  /* line-height: 20px; */
  height: 18px;
  /* background-color: grey; */
  font-size: 16px;
  font-family: ${(props) =>
    props.isInterect ? "Pretendard-Bold" : "Pretendard-Regular"};
  overflow: hidden;
  text-overflow: ellipsis;
  max-lines: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
  /* list-style-type: circle; */
  color: ${(props) =>
    props.isInterect ? props.theme.color.black : props.theme.color.desc};
  cursor: pointer;

  &:hover {
    color: rgba(86, 97, 246, 1);
  }
`;

export const HeaderButton = styled.div``;

export const CollectionItem = styled.div<{ idx: number; length: number }>`
  width: 100%;
  height: 40px;
  display: flex;
  gap: 4px;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 4px;
  padding-bottom: 4px;
  align-items: center;
  cursor: pointer;
  /* border-radius: 16px; */
  background-color: ${({ theme }) => theme.color.white};

  &:hover {
    background-color: ${({ theme }) => theme.color.grey1};
  }
`;

export const CollectionName = styled.div`
  width: calc(160px - 40px - 16px);
  font-size: 16px;
  font-family: "Pretendard-Regular";
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  color: ${({ theme }) => theme.color.black};
  align-items: center;
  max-lines: 1;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const DocumentRightOl = styled.ol`
  margin-left: 0px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  li {
    margin-left: 24px;
    padding-left: 0px;
    /* margin-bottom: 16px; */
  }
`;

export const DocumentTwoDepthRightOl = styled.ol`
  margin-left: 0px;
  padding-left: 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  li {
    margin-left: 48px;
    padding-left: 0px;
    /* margin-bottom: 16px; */
  }
`;

export const DocumentRightBarListContainer = styled.ul`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-direction: column;
  /* gap: 24px; */
  padding-left: 0px;
  margin-left: 0px;
  gap: 15px;
`;

export const DocumentQueryWrapper = styled.div`
  width: 100%;
  padding-top: 16px;
  /* background-color: red; */
  box-sizing: border-box;
  padding-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 100;
`;

export const QueryInputContainer = styled.div`
  width: 812px;
  display: flex;
  gap: 8px;
  padding-left: 8px;
  padding-right: 8px;
  flex-direction: column;
`;

export const InputContainer = styled.div`
  width: 100%;
  position: relative;
  /* background-color: green; */
  /* background-color: green; */
`;

export const EditDocumentQueryWrapper = styled.div`
  width: 100%;
  display: flex;
  padding-left: 16px;
  padding-top: 18px;
  padding-bottom: 18px;
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.color.grey2};
  border-radius: 16px;
  margin-bottom: 16px;
  flex-direction: row;
  min-height: 75px;
  align-items: center;
  position: relative;
`;

export const DocumentContainer = styled.div`
  width: 100%;
  /* background-color: ${({ theme }) => theme.color.white}; */
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: center; */
  margin-bottom: 40px;
`;

export const RetryButton = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.grey};
  }
`;

export const DocumentQueryContainer = styled.div`
  width: 100%;
  display: flex;
  line-height: 1;
  /* background-color: ; */
  font-size: 24px;
  color: ${({ theme }) => theme.color.black};
  font-family: "Pretendard-Bold";
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const DocumentStatusWrapper = styled.div<{ status: string }>`
  padding-left: 5px;
  padding-right: 5px;
  padding-top: 5.5px;
  padding-bottom: 5.5px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-left: 16px;
  font-size: 13px;
  font-family: "Pretendard-SemiBold";
  color: ${(props) => {
    if (props.status === "completed") {
      return "rgba(48, 195, 158, 1)";
    } else if (props.status === "Failed") {
      return "rgba(253, 49, 46, 1)";
    } else {
      return "rgba(252, 175, 69, 1)";
    }
  }};
  background-color: ${(props) => {
    if (props.status === "completed") {
      return "rgba(48, 195, 158, 0.2)";
    } else if (props.status === "Failed") {
      return "rgba(253, 49, 46, 0.2)";
    } else {
      return "rgba(255, 200, 69, 0.2)";
    }
  }};
`;

export const SubDocumentGrid = styled.div`
  width: 812px;
  display: inline-grid;
  grid-template-columns: calc((812px - 16px) / 2) calc((812px - 16px) / 2);
  /* grid-auto-flow: column; */
  grid-gap: 16px;
  /* grid-row-gap: 16px; */
  /* grid-column-gap: 16px; */
  box-sizing: border-box;
  /* background-color: blue; */
`;

export const SubDocumentItem = styled.div`
  height: 187px;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.color.grey1};
  display: flex;
  padding-top: 24px;
  flex-direction: column;
  justify-content: flex-start;
  text-decoration: none;
  padding-left: 24px;
  padding-right: 24px;
  gap: 16px;
  border: 1px solid ${({ theme }) => theme.color.grey1};
  cursor: pointer;
  box-sizing: border-box;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.color.white};
    border: 1px solid ${({ theme }) => theme.color.grey2};
    box-sizing: border-box;
  }
`;

export const DeleteSubPageIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.color.black};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(16px, -16px);
  cursor: pointer;
`;

export const QuerySendButton = styled.div<{ query: string }>`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  position: absolute;
  right: 16px;
  top: 50%;
  bottom: 50%;
  transform: translateY(-50%);
  background-color: ${(props) =>
    props.query !== "" ? "rgba(86, 97, 246, 1)" : props.theme.color.grey2};
  display: flex;
  justify-content: center;
  z-index: 1000;
  align-items: center;
  cursor: pointer;
`;

export const SubDocumentQuery = styled.div`
  width: calc((812px - 16px) / 2 - 48px);
  font-size: 18px;
  color: ${({ theme }) => theme.color.black};
  font-family: "Pretendard-SemiBold";
  overflow: hidden;
  text-overflow: ellipsis;
  max-lines: 3;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const SubDocumentContent = styled.div`
  color: rgba(117, 117, 117, 1);
  width: calc((812px - 16px) / 2 - 48px);
  font-size: 16px;
  font-family: "Pretendard-Regular";
  overflow: hidden;
  text-overflow: ellipsis;
  max-lines: 2;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
`;

export const SubDocumentTagContainer = styled.div`
  width: calc((812px - 16px) / 2 - 48px);
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
`;

export const SubDocumentTag = styled.div<{ index: number; type: string }>`
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 7.5px;
  padding-bottom: 7.5px;
  font-size: 14px;
  font-family: "Pretendard-Regular";
  background-color: rgba(119, 119, 119, 0.1);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  gap: 3.5px;
  color: ${(props) =>
    props.type === "news"
      ? "rgba(86, 97, 246, 1)"
      : props.type === "casual-graph"
      ? "rgba(88, 81, 219, 1)"
      : props.type === "timeseries-chart"
      ? "rgba(245, 96, 64, 1)"
      : props.type === "bar-chart"
      ? "rgba(131, 58, 180, 1)"
      : props.type === "search"
      ? "rgba(225, 48, 108, 1)"
      : "rgba(221, 68, 35, 1)"};
`;

export const SubDocumentViewMore = styled.div`
  width: 100%;
  height: 72px;
  display: flex;
  margin-top: 16px;
  box-sizing: border-box;
  align-items: center;
  position: relative;
  /* background-color: grey; */
`;

export const SubDocumentViewMoreLine = styled.div`
  background-color: ${({ theme }) => theme.color.grey2};
  width: 100%;
  height: 1px;
`;

export const SubDocumentViewMoreButton = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  flex-direction: row;
  gap: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  color: ${({ theme }) => theme.color.black};
  cursor: pointer;
  /* 
  &:hover {
    svg {
      transition: all ease-in 0.2s;
      transform: rotate(180deg);
    }
  } */

  &.view_more {
    svg {
      transition: all ease-in 0.2s;
      transform: rotate(180deg);
    }
  }
`;

export const AnswerWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 24px;
  margin-top: 40px;
`;

export const AnswerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CustomFontMarkDown = styled(Markdown)`
  /* font-family: "Pretendard-Regular"; */
  /* font-family: "Noto Sans"; */
  font-family: "Pretendard", "Malgun Gothic", sans-serif;
`;

export const NewsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const NewsTitleWrapper = styled.div`
  font-size: 32px;
  font-family: "Pretendard-Bold";
  color: ${({ theme }) => theme.color.black};
  padding-top: 80px;
  margin-bottom: 24px;
`;

export const NewsGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc((812px - 16px) / 2) calc((812px - 16px) / 2);
  grid-gap: 16px;
  box-sizing: border-box;
  /* margin-bottom: 40px; */
`;

export const NewsItem = styled.div`
  background-color: ${({ theme }) => theme.color.white};
  height: 122px;
  border: 1px solid ${({ theme }) => theme.color.grey2};
  border-radius: 8px;
  gap: 16px;
  display: flex;
  flex-direction: row;
  cursor: pointer;
  position: relative;
`;

export const NewsContentContainer = styled.div`
  padding: 16px;
  display: flex;
  width: calc(((812px - 16px) / 2) - 136px);
  flex-direction: column;
  gap: 8px;
  /* align-items: center; */
  justify-content: center;
`;

export const NewsTitleText = styled.div`
  width: calc(((812px - 16px) / 2) - 168px);
  font-size: 16px;
  font-family: "Pretendard-SemiBold";
  max-lines: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1; // 원하는 라인수
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.color.black};
`;

export const NewsContentText = styled.div`
  width: calc(((812px - 16px) / 2) - 168px);
  font-size: 16px;
  font-family: "Pretendard-Regular";
  max-lines: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; // 원하는 라인수
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.color.black};
`;

export const NewsImage = styled.img`
  height: 100%;
  width: 120px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const NewsNullImage = styled.div`
  height: 100%;
  width: 120px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: grey;
`;

export const DocumentItemDivider = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
  position: relative;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const DocumentLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.grey2};
`;

export const DocumentDividerCreateAt = styled.div`
  width: 181px;
  height: 28px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.color.white};
  font-size: 13px;
  position: absolute;
  color: rgba(175, 175, 175, 1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SkeletonLoadingContainer = styled.div`
  width: 100%;
  display: flex;
  /* gap: 8px; */
  flex-direction: column;
`;

export const MarkdownTheme = styled.div`
  background: ${(props) => props.theme.color.white} !important;
  background-color: ${({ theme }) => theme.color.white} !important;
  color: ${(props) => props.theme.color.black};

  div {
    background: ${(props) => props.theme.color.white} !important;
    background-color: ${({ theme }) => theme.color.white} !important;
    color: ${(props) => props.theme.color.black};
  }
  ul {
    background-color: ${({ theme }) => theme.color.white} !important;
    color: ${(props) => props.theme.color.black};
  }
  li {
    background-color: ${({ theme }) => theme.color.white} !important;
    color: ${(props) => props.theme.color.black};
  }
  h1 {
    color: ${(props) => props.theme.color.black};
  }
  h2 {
    color: ${(props) => props.theme.color.black};
  }
  h3 {
    color: ${(props) => props.theme.color.black};
  }
  h4 {
    color: ${(props) => props.theme.color.black};
  }
  h5 {
    color: ${(props) => props.theme.color.black};
  }
  h6 {
    color: ${(props) => props.theme.color.black};
  }
  p {
    color: ${(props) => props.theme.color.black};
  }
  code {
    color: ${(props) => props.theme.color.black};
  }
`;

export const MentionItemWrapper = styled.div<{ length: number }>`
  width: 100%;
  background-color: red;
  height: ${(props) => (props.length === 0 ? "0px" : "84px")};
  padding-top: ${(props) => (props.length === 0 ? "0px" : "24px")};
  padding-left: ${(props) => (props.length === 0 ? "0px" : "32px")};
  padding-right: ${(props) => (props.length === 0 ? "0px" : "32px")};
  box-sizing: border-box;
  gap: 8px;
  display: flex;
  padding-right: 64px;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  background-color: ${({ theme }) => theme.color.white};
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const MentionItem = styled.div`
  border: 1px solid var(--Border, ${({ theme }) => theme.color.grey2});
  width: 232px;
  height: 56px;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
`;

export const MentionItemContainer = styled.div`
  width: calc(232px - 56px);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
`;

export const MentionItemTitle = styled.div`
  width: calc(232px - 56px - 16px);
  display: -webkit-box;
  font-size: 12px;
  font-family: "Pretendard-SemiBold";
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 20px;
  max-lines: 2;
  -webkit-line-clamp: 2; /* number of lines to show */
  line-clamp: 2;
  -webkit-box-orient: vertical;
  color: ${({ theme }) => theme.color.black};
  /* text-align: justify; */
`;

export const MentionsItemImage = styled.img`
  width: 56px;
  height: 56px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const IconMentionsItemImage = styled.div<{
  color: string;
}>`
  width: 56px;
  height: 56px;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

export const EmptyWrapper = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  box-sizing: border-box;
`;

export const EmptyContainer = styled.div`
  background: ${({ theme }) => theme.color.grey};
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.divider};
  display: flex;
  font-family: "IBMPlexMono-Regular";
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.desc};
  font-size: 14px;
`;

export const BarChartWrapper = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  gap: 24px;
  flex-direction: column;
  cursor: pointer;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 16px;
`;

export const BarChart = styled.div`
  width: 100%;
  height: 512px;
  border: 1px solid ${({ theme }) => theme.color.divider};
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  & > canvas {
    border-radius: 8px;
  }
`;

export const Cover = styled.div`
  width: 100%;
  height: 100%;
  z-index: 100;
  position: absolute;
  /* background-color: ${({ theme }) => theme.color.white}; */
`;

export const EditIcon = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(Edit);
`;

export const CausalChart = styled.div<{
  isDarkMode: boolean;
}>`
  width: 100%;
  height: 620px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.divider};
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  * > .vis-button.vis-up {
    display: none !important;
  }

  * > .vis-button.vis-right {
    display: none !important;
  }

  * > .vis-button.vis-down {
    display: none !important;
  }

  * > .vis-button.vis-left {
    display: none !important;
  }

  * > div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
    background-image: url(${Expanded});
    z-index: 1000;
  }

  * > div.vis-network div.vis-navigation div.vis-button.vis-zoomIn {
    background-image: url(${ZoomIn});
    z-index: 1000;
  }

  * > div.vis-network div.vis-navigation div.vis-button.vis-zoomOut {
    background-image: url(${ZoomOut});
    z-index: 1000;
  }

  * > div.vis-network div.vis-navigation div.vis-button {
    width: 24px;
    height: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e9e9e9;
    background-position: 5px 5px;
    border-radius: 6px;

    &:hover {
      background-color: #cccccc;
      box-shadow: none;
    }
  }

  * > .vis-manipulation {
    background: ${({ theme }) => theme.color.white1} !important;
    display: flex;
    align-items: center;
    padding: 0 !important;
    border-bottom: 1px;
    border-style: solid;
    border-color: ${({ theme }) => theme.color.divider} !important;
  }

  * > div.vis-network div.vis-manipulation button.vis-button,
  div.vis-network div.vis-edit-mode button.vis-button {
    font-family: "Pretendard-Regular";
    color: ${({ theme }) => theme.color.black};
    display: flex;
    align-items: center;

    &:hover {
      background-color: ${({ theme }) => theme.color.divider};
    }
  }
  * > div.vis-network div.vis-manipulation {
    height: 40px;
    display: flex !important;
    align-items: center;
  }

  * > div.vis-network div.vis-manipulation button.vis-button.vis-connect {
    /* display: none; */
    background-image: ${(props) =>
      props.isDarkMode ? `url(${DarkAddEdge})` : `url(${AddEdge})`} !important;
  }

  * > div.vis-network div.vis-manipulation button.vis-button.vis-add {
    background-image: ${(props) =>
      props.isDarkMode ? `url(${DarkAddNode})` : `url(${AddNode})`} !important;
  }

  * > div.vis-network div.vis-manipulation button.vis-button.vis-delete {
    background-image: ${(props) =>
      props.isDarkMode ? `url(${DarkDelete})` : `url(${Delete})`} !important;
  }

  * > div.vis-network div.vis-manipulation button.vis-button.vis-edit {
    background-image: ${(props) =>
      props.isDarkMode ? `url(${Edit})` : `url(${DarkEdit})`} !important;
  }

  * > div.vis-network div.vis-manipulation button.vis-button.vis-back {
    background-image: ${(props) =>
      props.isDarkMode ? `url(${DarkBack})` : `url(${Back})`} !important;
  }

  * > div.vis-network div.vis-manipulation div.vis-label,
  div.vis-network div.vis-edit-mode div.vis-label {
    margin: 0px 0px 0px 16px;
  }

  * > div.vis-network button.vis-close {
    display: none !important;
  }
  &:focus {
    outline: none;
  }
`;
