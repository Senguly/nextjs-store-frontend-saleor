import styled from "styled-components";

export const Wrapper = styled.div`
  // display: flex;
  margin-top: 24px;
  padding-bottom: 48px;
  cursor: pointer;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

export const Description = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 24px 0;
  color: #808080 !important;
`;

export const ListWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const Col1 = styled.div`
  width: 50%;
  padding-right: 12px;
  @media screen and (max-width: 480px) {
    width: 100%;
    padding-right: 0px;
  }
`;

export const Col2 = styled.div`
  width: 50%;
  padding-left: 12px;
  @media screen and (max-width: 480px) {
    width: 100%;
    padding-left: 0px;
  }
`;
