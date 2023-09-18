import Scrollspy from "react-scrollspy";
import styled from "styled-components";

export const Wrapper = styled.div<{ isGoingUp?: boolean }>`
  /* margin-top: 40px; */
  padding-top: 16px;
  margin-top: 24px;
  position: -webkit-sticky;
  position: sticky;
  top: ${props => (props.isGoingUp ? "58px" : "0px")};
  transition: 0.3s;
  background: #fff;
  border-bottom: 2px solid #f5f5f5;
`;

export const List = styled.ul`
  font-size: 16px;
  font-weight: 400;
  padding: 0;
  justify-content: left;
  grid-auto-flow: column;
  grid-column-gap: 24px;
  display: grid;

  &.isMobile {
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    grid-column-gap: 24px;
    scroll-behavior: smooth;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollspyCustomize = styled(Scrollspy)`
  &.nav__inner {
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    justify-content: left;
    grid-auto-flow: column;
    grid-column-gap: 24px;
    display: grid;
    scroll-behavior: smooth;
  }
  &.isMobile {
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    grid-column-gap: 24px;
  }
  &::-webkit-scrollbar {
    display: none;
  }
  &.scroll-horizon {
    scroll-behavior: smooth;
  }
`;

export const Ul = styled.ul`
  &.nav__inner {
    font-size: 16px;
    font-weight: 400;
    padding: 0;
    justify-content: left;
    grid-auto-flow: column;
    grid-column-gap: 24px;
    display: grid;
  }
  &.isMobile {
    overflow: hidden;
    overflow-x: scroll;
    white-space: nowrap;
    grid-column-gap: 24px;
    scroll-behavior: smooth;
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Item = styled.li<{ isActive?: boolean }>`
  // padding: 14px 0;
  cursor: pointer;
  border-bottom: ${props => props.isActive && "2px solid #ff6347"};
  display: block;
  padding: 0 0 14px 0;
  white-space: nowrap;
  &.isMobile {
    white-space: nowrap;
  }
  p {
    color: #808080;
  }

  &.active {
    p {
      color: #ff6347;
    }
  }
`;
