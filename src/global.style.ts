import { createGlobalStyle } from "styled-components";
import LgSmartBold from "./fonts/Pretendard-Bold.woff";
import LgSmartLight from "./fonts/Pretendard-Light.woff";
import LgSmartThin from "./fonts/Pretendard-Thin.woff";
import LgSmartRegular from "./fonts/Pretendard-Regular.woff";
import LgSmartSemiBold from "./fonts/Pretendard-SemiBold.woff";

export const Global = createGlobalStyle`
    * {
        margin : 0px;
    }
    body { 
        margin: 0px;
        background-color: white;
        font-family: "Pretendard-Regular";
        /* font-family: "Pretendard"; */
        /* position: fixed;
        overflow: hidden;
        touch-action: none;
        -ms-user-select: none; 
        -moz-user-select: -moz-none;
        -khtml-user-select: none; */
        /* -webkit-user-select: none; */
        /* user-select: none; */
    }

    @font-face {
        font-family: "Pretendard-Bold";
        src: local('Pretendard-Bold'), local('Pretendard-Bold');
        font-style: normal;
        src: url(${LgSmartBold}) format('woff');
    }

    @font-face {
        font-family: "Pretendard-Thin";
        src: local('Pretendard-Thin'), local('Pretendard-Thin');
        font-style: normal;
        src: url(${LgSmartThin}) format('woff');
    }

    @font-face {
        font-family: "Pretendard-Light";
        src: local('Pretendard-Light'), local('Pretendard-Light');
        font-style: normal;
        src: url(${LgSmartLight}) format('woff');
    }

    @font-face {
        font-family: "Pretendard-Regular";
        src: local('Pretendard-Regular'), local('Pretendard-Regular');
        font-style: normal;
        src: url(${LgSmartRegular}) format('woff');
    }

    @font-face {
        font-family: "Pretendard-SemiBold";
        src: local('Pretendard-SemiBold'), local('Pretendard-SemiBold');
        font-style: normal;
        src: url(${LgSmartSemiBold}) format('woff');
    }
`;
