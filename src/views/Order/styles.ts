import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  scroll-behavior: smooth;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;

export const Wrapper = styled.div`
  max-width: 730px;
  min-height: 1045px;
  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
`;

export const Wrapper2 = styled.div`
  max-width: 350px;
  min-height: 1045px;
  @media screen and (max-width: 768px) {
    // width: 0%;
    display: none;
  }
`;

export const ButtonWrap = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    padding: 16px 15px 24px 15px;
    border-radius: 8px 8px 0 0;
    background: #fff;
    position: fixed;
    bottom: 0;
    width: 100vw;
    left: 0;
  }
`;
