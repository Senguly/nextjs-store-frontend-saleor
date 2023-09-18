import styled from "styled-components";

export const Wrapper = styled.div<{ isUser: any }>`
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  cursor: pointer;
  padding: ${props => (props.isUser ? "12px 24px" : "8px 24px")};
  color: #808080;
  transition: 0.3s;
  &:hover {
    border: 1px solid #ff6347;
    color: #ff6347 !important;
    box-shadow: 3px 3px 0px #e5e5e5;
    p {
      color: #ff6347 !important;
    }
  }
  /* margin-left: 16px; */
`;
export const IconBox = styled.div`
  margin-right: 8px;
  div {
    div {
      display: flex;
      align-items: center;
    }
  }
`;
export const Icon = styled.img``;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #808080;
  transition: 0.3s;
`;
