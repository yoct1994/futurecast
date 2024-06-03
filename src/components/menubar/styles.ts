import { DndProvider } from "react-dnd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const MenuWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  padding-left: 280px;
  box-sizing: border-box;
  /* background: green; */
  transition: width ease-in-out 0.3s;
  position: relative;

  &.close {
    padding-left: 0px;
    transition: width ease-in-out 0.3s;
  }
`;

export const NewFolderPopupWrapper = styled.div`
  z-index: 200;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const NewFolderPopupContainer = styled.div`
  width: 480px;
  padding: 16px;
  border-radius: 16px;
  z-index: 120;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0px -8px 36px 0px rgba(0, 0, 0, 0.17);
`;

export const NewFolderTitleContainer = styled.div`
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

export const NewFolderTitleText = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  font-size: 20px;
  font-family: "LG_Smart_Bold";
  color: #191919;
`;

export const NewFolderInputWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 8px;
`;

export const NewFolderInput = styled.input`
  border: none;
  box-sizing: border-box;
  width: 100%;
  height: 48px;
  border-radius: 8px;
  padding-left: 16px;
  font-size: 16px;
  padding-right: 16px;
  color: black;
  border: 1px solid #e9e9e9;

  &::placeholder {
    color: rgba(117, 117, 117, 1);
  }

  &:focus {
    outline: none;
  }
`;

export const NewFolderSaveButton = styled.div`
  width: 150px;
  height: 48px;
  border-radius: 8px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;

  &:active {
    background-color: #404040;
  }
`;

export const NewPageButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

export const NewPageSaveButton = styled.div`
  width: 100px;
  height: 48px;
  border-radius: 8px;
  background-color: #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: white;
  margin-top: 8px;
  cursor: pointer;

  &:active {
    background-color: #404040;
  }
`;

export const NewPageCancelButton = styled.div`
  width: 100px;
  height: 48px;
  border-radius: 8px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  color: black;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid var(--Border, rgba(233, 233, 233, 1));
  cursor: pointer;

  &:active {
    background-color: var(--Border, rgba(233, 233, 233, 1));
  }
`;

export const MenubarWrapper = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 120;
  flex-direction: row;
  align-items: center;
`;

export const MenubarContainer = styled.div`
  height: 100%;
  width: 280px;
  display: flex;
  background-color: #f7f7f7;
  padding: 16px;
  box-sizing: border-box;
  z-index: 100;
  gap: 16px;
  flex-direction: column;
  opacity: 1;

  &.close {
    width: 0px;
    opacity: 0;
    transition: 0.4s ease-in-out;
  }
`;

export const MenubarDisableIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  position: relative;
  /* background-color: grey; */
  z-index: 100;
  & > .arrow {
    position: absolute;
    opacity: 0;
  }
  & > .line {
    opacity: 1;
    position: absolute;
  }
  & > .close_open_icon {
    position: absolute;
    opacity: 0;
  }

  /* &:active {
    background-color: black;
  } */

  &:hover {
    /* background-color: black; */
    & > .arrow {
      /* transition-delay: 0.4s; */
      transition: opacity ease-in 0.3s;
      position: absolute;
      opacity: 1;
    }
    & > .line {
      transition: opacity ease-in 0.3s;
      /* transition-delay: 0.4s; */
      position: absolute;
      opacity: 0;
    }
    & > .close_open_icon {
      transition: opacity ease-in 0.3s;
      position: absolute;
      opacity: 1;
    }
  }
`;

export const MenuLogoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  /* background-color: green; */
  flex-shrink: 0;
  width: 100%;
  height: 36px;
`;

export const NewFolderButton = styled.div`
  width: 100%;
  height: 45px;
  background-color: rgba(86, 97, 246, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  gap: 4px;
  font-size: 16px;
  text-decoration: none;
  color: white;

  &:active {
    background-color: #888ff0;
  }
`;

export const FolderNodeWrapper = styled.div<{ depth: number }>`
  height: 45px;
  /* width: calc(280px - 32px - ${(props) => props.depth} * 32px); */
  width: calc(280px - 32px);
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-left: ${(props) => (props.depth === 0 ? "0px" : `32px`)};
  /* background: green; */

  &.depth0 {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  & > .hovering_button {
    display: none;
  }

  &.depth1 {
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    &.depth1 {
      background-color: #e7e7e7;

      & > .hovering_button {
        display: flex;
      }
    }
  }
`;

export const HoveringButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FolderNodeText = styled.div<{ depth: number }>`
  width: 100%;
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: flex-start; */
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* background-color: green; */
  color: ${(props) => (props.depth === 0 ? "rgba(25, 25, 25, 1)" : "#757575")};
`;

export const PageNodeText = styled(Link)<{ depth: number }>`
  width: 100%;
  /* display: flex; */
  /* flex-direction: row; */
  /* justify-content: flex-start; */
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* background-color: green; */
  color: ${(props) => (props.depth === 0 ? "rgba(25, 25, 25, 1)" : "#757575")};
`;

export const LatestDocumentsWrapper = styled.div<{ depth: number }>`
  height: 24px;
  width: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  margin-left: 32px;
  margin-top: 8px;
  /* background: green; */

  &.depth0 {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
`;

export const LatestDocumentsNodeText = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: flex-start;
  font-size: 12px;
  color: #afafaf;
`;

export const DndArea = styled.div`
  width: calc(280px - 32px);
  display: flex;
  flex: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  ul {
    list-style-type: none;
    padding-left: 0px;
    margin-left: 0px;
  }
  li {
    list-style-type: none;
    padding-left: 0px;
    margin-left: 0px;
  }

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  -webkit-scrollbar: none;
  /* background: green; */
`;

export const DndLoadingArea = styled.div`
  display: flex;
  flex: 1;
  overflow: scroll;
  flex-direction: column;
  gap: 8px;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  -webkit-scrollbar: none;
  /* background: green; */
`;

export const UserAccountWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const UserAccountContiner = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const UserImage = styled.video`
  width: 36px;
  height: 36px;
  border-radius: 20px;
  background: grey;
`;

export const UserEmailText = styled.div`
  font-size: 16px;
  color: rgba(25, 25, 25, 1);
`;

export const NodeDragPreview = styled.div`
  width: calc(280px - 32px);
  height: 45px;
  border-radius: 8px;
  display: flex;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding-left: 32px;
  /* background: green; */
  background-color: #e7e7e7;
  font-size: 16px;
  color: #757575;
`;

export const SmallLogoContainer = styled.div`
  width: 72px;
  position: fixed;
  top: 16px;
  display: flex;
  gap: 16px;
  flex-direction: column;
  align-items: center;
  /* background-color: green; */
`;

export const FolderAddButton = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #e7e7e7;
  }
`;
