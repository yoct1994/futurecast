import { createGlobalStyle } from "styled-components";
import LgSmartBold from "./fonts/Pretendard-Bold.woff";
import LgSmartLight from "./fonts/Pretendard-Light.woff";
import LgSmartThin from "./fonts/Pretendard-Thin.woff";
import LgSmartRegular from "./fonts/Pretendard-Regular.woff";
import LgSmartSemiBold from "./fonts/Pretendard-SemiBold.woff";
import IBMPlexMonoRegular from "./fonts/IBMPlexMono-Regular.ttf";
import { SuggestionsContainer } from "./components/main/styles";

export const Global = createGlobalStyle`
    * {
        margin : 0px;
    }
    * > .p-skeleton {
        background-color: ${({ theme }) => theme.color.skeleton};
    }
    * > .p-skeleton::after {
        background: linear-gradient(90deg, rgba(255, 255, 255, 0), ${({
          theme,
        }) => theme.color.skeleton_gradient}, rgba(255, 255, 255, 0));
    }
    * > .p-menu.p-menu-overlay {
        background: ${({ theme }) => theme.color.white};
    }
    * > .p-menuitem-text {
        color: ${({ theme }) => theme.color.black};
    }
    * > .p-focus {
        background: ${({ theme }) => theme.color.menu} !important;
    }

    *.focus > div:has(${SuggestionsContainer}) {
        border-radius: 16px;
    }

    *.mention_style {
        /* color: #5661f6; */
        /* color: black; */
        color: transparent;
        text-decoration-color: ${({ theme }) => theme.color.black} !important;
        z-index: 1;
        position: relative;
        /* background-color: rgba(0, 0, 0, 0.6); */
        /* border-bottom: 1px solid black; */
        /* text-shadow: 2px 1px 0px white, 0px 0px 0px white, -1px 1px 0px white,
            -1px -1px 0px white; */
        /* transform: translate(-1px, -1px); */
        font-size: 16px;
        box-sizing: border-box;
        text-decoration: underline;
        font-family: "Pretendard-Regular";
        /* outline: 1px solid black; */
        /* overflow: visible; */
        /* margin-right: 2px; */

        pointer-events: none;
    }

    *.mention_style_edit_dark {
        /* color: black; */
        color: transparent;
        text-decoration-color: ${({ theme }) => theme.color.black} !important;
        z-index: 1;
        position: relative;
        /* background-color: rgba(0, 0, 0, 0.6); */
        /* border-bottom: 1px solid black; */
        /* text-shadow: 2px 1px 0px white, 0px 0px 0px white, -1px 1px 0px white,
            -1px -1px 0px white; */
        /* transform: translate(-1px, -1px); */
        font-size: 18px;
        box-sizing: border-box;
        text-decoration: underline;
        font-family: "Pretendard-SemiBold";
        /* outline: 1px solid black; */
        /* overflow: visible; */
        /* margin-right: 2px; */

        pointer-events: none;
    }

    * > .p-menu .p-menuitem:not(.p-highlight):not(.p-disabled).p-focus > .p-menuitem-content {
        background: ${({ theme }) => theme.color.menu} !important;
    }
    [data-color-mode*="dark"] .wmde-markdown,
  [data-color-mode*="dark"] .wmde-markdown-var,
  .wmde-markdown-var[data-color-mode*="dark"],
  .wmde-markdown[data-color-mode*="dark"],
  body[data-color-mode*="dark"] {
    color-scheme: dark;
    --color-prettylights-syntax-comment: #8b949e;
    --color-prettylights-syntax-constant: #79c0ff;
    --color-prettylights-syntax-entity: #d2a8ff;
    --color-prettylights-syntax-storage-modifier-import: #c9d1d9;
    --color-prettylights-syntax-entity-tag: #7ee787;
    --color-prettylights-syntax-keyword: #ff7b72;
    --color-prettylights-syntax-string: #a5d6ff;
    --color-prettylights-syntax-variable: #ffa657;
    --color-prettylights-syntax-brackethighlighter-unmatched: #f85149;
    --color-prettylights-syntax-invalid-illegal-text: #f0f6fc;
    --color-prettylights-syntax-invalid-illegal-bg: #8e1519;
    --color-prettylights-syntax-carriage-return-text: #f0f6fc;
    --color-prettylights-syntax-carriage-return-bg: #b62324;
    --color-prettylights-syntax-string-regexp: #7ee787;
    --color-prettylights-syntax-markup-list: #f2cc60;
    --color-prettylights-syntax-markup-heading: #1f6feb;
    --color-prettylights-syntax-markup-italic: #c9d1d9;
    --color-prettylights-syntax-markup-bold: #c9d1d9;
    --color-prettylights-syntax-markup-deleted-text: #ffdcd7;
    --color-prettylights-syntax-markup-deleted-bg: #67060c;
    --color-prettylights-syntax-markup-inserted-text: #aff5b4;
    --color-prettylights-syntax-markup-inserted-bg: #033a16;
    --color-prettylights-syntax-markup-changed-text: #ffdfb6;
    --color-prettylights-syntax-markup-changed-bg: #5a1e02;
    --color-prettylights-syntax-markup-ignored-text: #c9d1d9;
    --color-prettylights-syntax-markup-ignored-bg: #1158c7;
    --color-prettylights-syntax-meta-diff-range: #d2a8ff;
    --color-prettylights-syntax-brackethighlighter-angle: #8b949e;
    --color-prettylights-syntax-sublimelinter-gutter-mark: #484f58;
    --color-prettylights-syntax-constant-other-reference-link: #a5d6ff;
    --color-fg-default: #c9d1d9;
    --color-fg-muted: #8b949e;
    --color-fg-subtle: #484f58;
    --color-canvas-default: rgba(25, 25, 25, 1) !important;
    --color-canvas-subtle: #161b22;
    --color-border-default: #30363d;
    --color-border-muted: #21262d;
    --color-neutral-muted: rgba(110, 118, 129, 0.4);
    --color-accent-fg: #58a6ff;
    --color-accent-emphasis: #1f6feb;
    --color-attention-subtle: rgba(187, 128, 9, 0.15);
    --color-danger-fg: #f85149;
  }
    body { 
        margin: 0px;
        background-color: ${({ theme }) => theme.color.white};
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

    @font-face {
        font-family: "IBMPlexMono-Regular";
        src: local('IBMPlexMono-Regular'), local('IBMPlexMono-Regular');
        font-style: normal;
        src: url(${IBMPlexMonoRegular}) format('truetype');
    }
`;
