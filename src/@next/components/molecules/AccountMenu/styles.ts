import { styled } from "@styles";

export const Wrapper = styled.div`
  height: 100%;
  @media screen and (max-width: 540px) {
    display: flex;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

export const MenuHeader = styled.div`
  font-size: ${props => props.theme.typography.h3FontSize};
  font-weight: ${props => props.theme.typography.boldFontWeight};
  text-transform: "uppercase";
  padding-bottom: 2rem;
`;

export const ItemWrap = styled.div<{ active: boolean }>`
  cursor: pointer;
  display: flex;
  padding: 8px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: ${props => props.active && "#F5F5F5"};
  svg * {
    fill: ${props => props.active && "#FF6347"};
  }
  @media screen and (max-width: 540px) {
    margin-bottom: 24px;
  }
`;

export const IconBox = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
  div {
    div {
      display: flex;
      align-items: flex-end;
    }
  }
`;

export const MenuItem = styled.div<{
  active: boolean;
}>`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  color: ${props => (props.active ? "#FF6347" : "#808080")};
  white-space: nowrap;
`;
