import styled from "styled-components";
import AddEdge from "../../../assets/node_graph_edit/AddEdge.svg";
import AddNode from "../../../assets/node_graph_edit/AddNode.svg";
import Expanded from "../../../assets/node_graph_edit/Expanded.svg";
import Edit from "../../../assets/node_graph_edit/EditNode.svg";
import Back from "../../../assets/node_graph_edit/Back.svg";
import ZoomIn from "../../../assets/node_graph_edit/add.svg";
import ZoomOut from "../../../assets/node_graph_edit/minus.svg";
import Delete from "../../../assets/node_graph_edit/DeleteNode.svg";
import DarkAddEdge from "../../../assets/node_graph_edit/dark/AddEdge.svg";
import DarkAddNode from "../../../assets/node_graph_edit/dark/AddNode.svg";
import DarkDelete from "../../../assets/node_graph_edit/dark/DeleteNode.svg";
import DarkEdit from "../../../assets/node_graph_edit/dark/EditEdge.svg";
import DarkBack from "../../../assets/node_graph_edit/dark/Back.svg";

export const ReferencePopupWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  /* background-color: rgba(0, 0, 0, 0.3); */
  z-index: 1200;
`;

export const ReferencePopupContainer = styled.div`
  width: 1050px;
  height: 90vh;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 16px;
  box-sizing: border-box;
  padding: 24px;
  box-shadow: 0px -8px 36px 0px rgba(0, 0, 0, 0.17);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const ReferencePopupHeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
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

  margin-bottom: 8px;
`;

// export const ReferencePopup

export const BarChart = styled.div`
  width: 100%;
  height: 665px;
  border: 1px solid ${({ theme }) => theme.color.divider};
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;

  & > canvas {
    border-radius: 8px;
  }
`;

export const CausalChart = styled.div<{ isDarkMode: boolean }>`
  width: 100%;
  height: 665px;
  /* background-color: ${({ theme }) => theme.color.white}; */
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
  }

  * > div.vis-network div.vis-navigation div.vis-button.vis-zoomIn {
    background-image: url(${ZoomIn});
  }

  * > div.vis-network div.vis-navigation div.vis-button.vis-zoomOut {
    background-image: url(${ZoomOut});
  }

  * > div.vis-network div.vis-navigation div.vis-button {
    width: 27px;
    height: 27px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e9e9e9;
    background-position: 6.5px 6.5px;
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
      props.isDarkMode ? `url(${DarkEdit})` : `url(${Edit})`} !important;
  }

  * > div.vis-network div.vis-manipulation button.vis-button.vis-back {
    background-image: ${(props) =>
      props.isDarkMode ? `url(${DarkBack})` : `url(${Back})`} !important;
  }

  * > div.vis-network div.vis-manipulation div.vis-label,
  div.vis-network div.vis-edit-mode div.vis-label {
    margin: 0px 0px 0px 16px;
  }

  * > div.vis-network div.vis-manipulation button.vis-button,
  div.vis-network div.vis-edit-mode button.vis-button {
    &:hover {
      background-color: ${({ theme }) => theme.color.white1};
      box-shadow: none;
      color: ${({ theme }) => theme.color.dim};
    }
  }

  * > div.vis-network button.vis-close {
    display: none !important;
  }

  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
`;

export const ChartEditButton = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  gap: 5px;
  height: 40px;
  bottom: 10px;
  padding-left: 10px;
  padding-right: 15px;
  left: 15px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.grey2};
  border-radius: 8px;
  color: ${({ theme }) => theme.color.black};

  cursor: pointer;

  &:hover {
    background-color: rgba(86, 97, 246, 1);
    border: 1px solid rgba(86, 97, 246, 1);
    color: white;
    color: ${({ theme }) => theme.color.black};
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

export const NodeOptionButton = styled.div`
  width: 27px;
  height: 27px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9e9e9;
  position: absolute;
  cursor: pointer;

  &:active {
    background-color: rgba(204, 204, 204, 1);
  }
`;

export const ChartEditText = styled.div`
  font-family: "Pretendard-SemiBold";
  font-size: 17.5px;
  text-align: center;
`;

export const ChartControllerWrapper = styled.div`
  width: 100%;
  border-radius: 12px;
  box-sizing: border-box;
  padding-left: 8px;
  padding-right: 8px;
  padding-top: 8.5px;
  padding-bottom: 8.5px;
  background: ${({ theme }) => theme.color.dim};
  margin-top: 8px;
`;

export const ChartController = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
`;

export const Divider = styled.div`
  width: 1px;
  height: 17px;
  background: ${({ theme }) => theme.color.dim};
`;

export const ControllButton = styled.div<{ select: boolean }>`
  width: 44px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) =>
    props.select ? "rgba(86, 97, 246, 1)" : props.theme.color.desc};
  font-size: 16px;
  font-family: ${(props) =>
    props.select ? "Pretendard-SemiBold" : "Pretendard-Regular"};
  cursor: pointer;
`;
