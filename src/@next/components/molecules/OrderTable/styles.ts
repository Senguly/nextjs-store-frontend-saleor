import { media, styled } from "@styles";

export const Wrapper = styled.div``;

export const OrderItem = styled.div`
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  &:hover {
    border: 1px solid #ff6347;
    box-shadow: 4px 4px 0px rgba(34, 34, 34, 0.16);
  }
  cursor: pointer;
`;

export const Col1 = styled.div`
  display: flex;
  flex-direction: column;
  width: 49%;

  @media screen and (max-width: 540px) {
    width: 69%;
  }
`;

export const Col2 = styled.div`
  display: flex;
  width: 49%;
  @media screen and (max-width: 540px) {
    width: 29%;
  }
`;

export const OrderCode = styled.h4`
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
  margin: 0 0 8px 0;
`;

export const OrderDate = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  margin: 0 0 8px 0;

  color: #808080 !important;
`;

export const OrderPrice = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0 0 8px 0;
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 5rem;
  cursor: pointer;

  border-bottom: 1px solid ${props => props.theme.colors.tableDivider};
`;

export const HeaderRow = styled(Row)`
  color: ${props => props.theme.colors.lightFont};
  cursor: default;
`;

export const IndexNumber = styled.div`
  width: 15%;
  ${media.smallScreen`
     width: 50%;
  `}
`;

export const ImageBox = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  overflow: hidden;
  margin-left: 16px;
`;
export const ProductsOrdered = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-end;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const DateOfOrder = styled.div`
  width: 25%;
`;
export const Value = styled.div`
  width: 10%;
`;
export const Status = styled.div`
  width: 25%;
  ${media.smallScreen`
     width: 50%;
  `}
`;
