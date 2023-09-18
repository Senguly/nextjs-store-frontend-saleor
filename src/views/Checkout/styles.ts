import styled from "styled-components";

export const Wrapper = styled.div`
  width: 730px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 24px 24px 0 24px;
  justify-content: center;
  /* margin: auto; */
  @media screen and (max-width: 768px) {
    width: 100%;
    border: none;
    padding: 0;
  }
`;

export const Wrapper2 = styled.div`
  max-width: 350px;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 768px) {
    // width: 0%;
    display: none;
  }
`;

export const Space = styled.div`
  height: 16px;
  width: 100%;
`;

export const ButtonWrap = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    // padding: 16px;
    /* border-radius: 8px 8px 0 0; */
    border-top: 1px solid #dcdcdc;
    padding-top: 24px;
    margin-bottom: 48px;
    // background: #fff;
    // position: fixed;
    // bottom: 0;
    // width: 100vw;
    // left: 0;
  }
`;
