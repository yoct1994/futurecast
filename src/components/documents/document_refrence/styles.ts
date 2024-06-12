import styled from "styled-components";

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
  width: 812px;
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
  height: 512px;
  border: 1px solid ${({ theme }) => theme.color.divider};
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;

  & > canvas {
    border-radius: 8px;
  }
`;

export const CausalChart = styled.div`
  width: 100%;
  height: 620px;
  background-color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.divider};
  box-sizing: border-box;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  &:focus {
    outline: none;
  }
  margin-bottom: 8px;
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
