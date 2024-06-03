import { createGlobalStyle } from "styled-components";
import LgSmartBold from "./fonts/LG_Smart_Bold.ttf";
import LgSmartBoldItalic from "./fonts/LG_Smart_Bold_Italic.ttf";
import LgSmartLight from "./fonts/LG_Smart_Light.ttf";
import LgSmartRegular from "./fonts/LG_Smart_Regular.ttf";
import LgSmartRegularItalic from "./fonts/LG_Smart_Regular_Italic.ttf";
import LgSmartSemiBold from "./fonts/LG_Smart_SemiBold.ttf";

export const Global = createGlobalStyle`
    * {
        margin : 0px;
    }
    body { 
        margin: 0px;
        background-color: white;
        font-family: "LG_Smart_Regular";
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
        font-family: "LG_Smart_Bold";
        src: local('LG_Smart_Bold'), local('LG_Smart_Bold');
        font-style: normal;
        src: url(${LgSmartBold}) format('truetype');
    }

    @font-face {
        font-family: "LG_Smart_Bold_Italic";
        src: local('LG_Smart_Bold_Italic'), local('LG_Smart_Bold_Italic');
        font-style: normal;
        src: url(${LgSmartBoldItalic}) format('truetype');
    }

    @font-face {
        font-family: "LG_Smart_Light";
        src: local('LG_Smart_Light'), local('LG_Smart_Light');
        font-style: normal;
        src: url(${LgSmartLight}) format('truetype');
    }

    @font-face {
        font-family: "LG_Smart_Regular";
        src: local('LG_Smart_Regular'), local('LG_Smart_Regular');
        font-style: normal;
        src: url(${LgSmartRegular}) format('truetype');
    }

    @font-face {
        font-family: "LG_Smart_Regular_Italic";
        src: local('LG_Smart_Regular_Italic'), local('LG_Smart_Regular_Italic');
        font-style: normal;
        src: url(${LgSmartRegularItalic}) format('truetype');
    }

    @font-face {
        font-family: "LG_Smart_SemiBold";
        src: local('LG_Smart_SemiBold'), local('LG_Smart_SemiBold');
        font-style: normal;
        src: url(${LgSmartSemiBold}) format('truetype');
    }
`;
