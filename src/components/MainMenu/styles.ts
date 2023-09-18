import styled from "styled-components";

export const Wrapper = styled.div<{ isGoingUp: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0 !important;
  /* opacity: ${props => (props.isGoingUp ? 1 : 0)}; */
  transition: 0.3s;
 
  /* margin-bottom: 24px; */
  @media screen and (max-width: 720px) {
    // padding: 8px 16px !important;
  }
`;

export const ImgBox = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const ButtonWrap = styled.div`
  display: flex;
  align-items: center;
`;

export const Container = styled.div<{ isGoingUp: boolean }>`
  position: sticky;
  background: #fff;
  z-index: 98;
  transition: 0.3s;
  ${props => (props.isGoingUp ? "top: 0" : "top: -50px")};
`;
