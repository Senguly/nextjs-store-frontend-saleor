import styled from "styled-components";

export const Wrapper = styled.div`
  background: #fff;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  padding: 24px;
  width: 540px;
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 540px) {
    width: 100%;
    border-radius: 8px 8px 0 0;
    /* height: 600px; */
  }
`;

// header

export const Head = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Name = styled.h4`
  margin: 0;
  font-size: 20px;
  font-weight: 600;
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
  overflow: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 540px) {
    /* height: 600px; */
    max-height: calc(100vh - 92px);
  }
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 14px;
  margin: 0;
`;

export const Tr = styled.tr<{ isActive?: boolean }>`
  // background: ${props => props.isActive && "red"};
  color: ${props => props.isActive && "#000"};
  font-weight: ${props => props.isActive && "600"};
`;

export const Th = styled.th`
  background: #f5f5f5;
  padding: 8px 16px;
  color: #808080;
  font-weight: 400;
`;

export const Td = styled.td`
  padding: 16px;
  border-top: 1px solid #d5d5d5;
`;
