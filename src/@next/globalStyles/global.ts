import { createGlobalStyle } from "styled-components";

import { DefaultTheme, media } from ".";

export const GlobalStyle = createGlobalStyle<{ theme: DefaultTheme }>`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  .customizeModal::-webkit-scrollbar {
    display: none;
  }

  body {
    margin: 0;
    min-width: 320px;
    font-family: ${props => props.theme.typography.baseFontFamily};
    font-size: ${props => props.theme.typography.baseFontSize};
    line-height: ${props => props.theme.typography.baseLineHeight};
    color: ${props => props.theme.colors.baseFont};
  }

  input, textarea, button {
    font-family: inherit;
  }

  .active {
    color: #ff6347 !important;
    border-bottom: 2px solid #ff6347;
    margin-bottom: -2px;
    @media screen and (max-width: 768px){
      margin-bottom: -0px;
    }
  }

  .test1{
    display: block;
    padding: 0 0 14px 0;
    white-space: nowrap;
    color: #808080;
  }

  h1 {
    font-size: ${props => props.theme.typography.h1FontSize};
    line-height: ${props => props.theme.typography.h1LineHeight};

    ${props => media.smallScreen`
      font-size: ${props.theme.typography.h2FontSize};
    `}
  }

  h3 {
    font-size: ${props => props.theme.typography.h3FontSize};
    line-height: 1.7rem;
  }

  h4 {
    font-size: ${props => props.theme.typography.h4FontSize};
  }

  a {
    text-decoration: none;
    font-weight: normal;
    color: inherit;
  }

  p {
    line-height: 1.5rem;
  }

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
    outline: none;
    padding: 0;
  }

  ul {
    list-style: none;
  }

  #root,
  #__next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;

    & > div:first-of-type {
      // flex: 1;
    }
  }
`;
