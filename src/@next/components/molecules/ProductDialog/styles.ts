import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 24px;
  width: 540px;
  @media screen and (max-width: 768px) {
    /* max-height: 500px; */
    overflow: scroll;
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  /* @media screen and (max-width: 414px) {
    max-width: 414px !important;
    max-height: 700px !important;
  } */

  @media screen and (max-width: 717px) {
    width: 100% !important;
    border-radius: 8px 8px 0px 0px;
  }
`;

// header

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  // position: fixed;
  // top: 0;
`;

export const Name = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: 20px;
`;

export const IconBox = styled.div`
  cursor: pointer;

  svg * {
    transition: 0.6s;
  }
  &:hover {
    svg * {
      fill: #ff6347;
    }
  }
`;

// content

export const ContentWrap = styled.div`
  max-height: 700px;
  margin-bottom: 48px;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 1368px) {
    max-height: 500px;
  }
  @media screen and (max-width: 717px) {
    max-height: calc(100vh - 44px);
  }
`;

export const ProductWrap = styled.div`
  // padding: 0 0 24px 0;
  // border-bottom: 1px solid #dcdcdc;
  // margin: 0 0 24px 0;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: #dcdcdc;
  margin: 24px 0;
`;

export const ImageBox = styled.div`
  width: 300px;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
  margin-bottom: 24px;
  @media screen and (max-width: 768px) {
    width: 150px;
  }
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Description = styled.p`
  margin: 0;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  color: #808080;
`;

export const FormOption = styled.form`
  // padding: 0 0 24px 0;
  // border-bottom: 1px solid #dcdcdc;
  // margin: 0 0 24px 0;
  max-height: 300px;
  @media screen and (max-width: 717px) {
    max-height: calc(100vh - 345px);
  }
  overflow: scroll;
  scroll-behavior: smooth;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  overflow-x: hidden;
`;

export const Footer = styled.div`
  display: flex;
`;

export const FooterWrap = styled.div`
  position: fixed;
  bottom: 24px;
  width: calc(100% - 48px);
  background: #fff;
`;
