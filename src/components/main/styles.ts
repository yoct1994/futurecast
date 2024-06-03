import { MentionsInput } from "react-mentions";
import styled from "styled-components";

export const MainPageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`;

export const MainPageContainer = styled.div`
  width: 1000px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

export const AssetContianer = styled.div`
  display: flex;
  gap: 8px;
  /* justify-content: center; */
  width: 100%;
  /* background-color: green; */
`;

export const AssetImage = styled.video`
  box-shadow: 0px -8px 36px 0px rgba(0, 0, 0, 0.08);
  width: calc(100% / 3);
  border-radius: 30px;
  object-fit: cover;
`;

export const HowToUse = styled.div`
  font-size: 52px;
  color: black;
  display: flex;
  flex-direction: row;
  font-family: "LG_Smart_Light";
  gap: 10px;
  margin-top: 64px;
  margin-bottom: 64px;
`;

export const Futurecast = styled.div`
  font-family: "LG_Smart_SemiBold";
`;

export const ExampleQueryGrid = styled.div`
  padding-left: 80px;
  padding-right: 80px;
  box-sizing: border-box;
  display: grid;
  /* grid-template-columns: 76px 76px; */
  grid-template-columns: 1fr 1fr;
  width: 100%;
  grid-gap: 16px;
  /* background-color: green; */
  opacity: 1;
  height: calc(100px * 2 + 16px);
  margin-bottom: 64px;

  &.focus {
    transition: 0.4s ease-out;
    transition-property: height, opacity, margin-bottom;
    height: 0px;
    opacity: 0;
    margin-bottom: 0px;

    div {
      display: none;
    }
  }
`;

export const ExampleQueryItem = styled.div`
  border-radius: 16px;
  background-color: rgba(247, 247, 247, 1);
  color: black;
  font-size: 16px;
  height: 100px;
  border: 1px solid rgba(233, 233, 233, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  padding-left: 80px;
  padding-right: 80px;
  box-sizing: border-box;
  position: relative;
  /* background-color: green; */
  /* background-color: green; */
`;

export const QueryInputBorder = styled.div`
  border-radius: 40px;
  width: 100%;
  padding: 2px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* box-sizing: border-box; */

  /* &.not_focus { */
  background-color: rgba(233, 233, 233, 1);
  /* } */

  &.focus {
    background: linear-gradient(
      90deg,
      #a93cf2 0%,
      #ff2871 30.5%,
      #fc7145 57.5%,
      #3357ff 100%
    );
  }
`;

export const QueryInput = styled(MentionsInput)`
  width: calc(100% - 4px);
  height: 55px;
  border-radius: 28px;
  box-sizing: border-box;
  padding-left: 32px;
  padding-right: 64px;
  border: none;

  /* border: 2px solid;

  border-image-source: linear-gradient(
    90deg,
    #a93cf2 0%,
    #ff2871 30.5%,
    #fc7145 57.5%,
    #3357ff 100%
  ); */

  &:focus {
    outline: none;
    /* border: 2px solid;
    border-image-source: linear-gradient(
      90deg,
      #a93cf2 0%,
      #ff2871 30.5%,
      #fc7145 57.5%,
      #3357ff 100%
    ); */
  }
`;

export const QuerySendButton = styled.div<{ query: string }>`
  width: 32px;
  height: 32px;
  border-radius: 20px;
  position: absolute;
  right: 96px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${(props) =>
    props.query !== "" ? "rgba(86, 97, 246, 1)" : "rgba(0, 0, 0, 0.1)"};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SuggestionsContainer = styled.div`
  background-color: rgba(255, 255, 255, 1);
  box-shadow: 0px -8px 36px 0px rgba(0, 0, 0, 0.17);
  width: 240px;
  max-height: 160px;
  border-radius: 16px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none;
  -webkit-scrollbar: none;

  li {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 16px;
    padding-right: 16px;
    overflow-x: hidden;
  }
`;

export const Mention = styled.div`
  font-size: 16px;
  color: rgba(25, 25, 25, 1);
  font-family: "LG_Smart_Regular_Italic";
  width: 100%;
  /* background-color: green; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* font-family: "LG_Smart_SemiBold"; */
  /* background-color: rgba(86, 97, 246, 1); */
`;
