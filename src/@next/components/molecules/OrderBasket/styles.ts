import styled from "styled-components";

export const Wrapper = styled.div<{
  isDialog?: boolean;
  isPlace?: boolean;
  isGoingUp?: boolean;
}>`
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  padding: 23px;
  width: 350px;
  position: ${props => !props.isPlace && "sticky"};
  top: ${props => (!props.isGoingUp ? "24px" : "80px")};
  transition: 0.3s;
  background: #fff;
  height: fit-content;
  /* z-index: 104; */
  // cursor: pointer;
  @media screen and (max-width: 768px) {
    // position: relative;
    width: 100%;
    border: none;
    border-radius: 8px 8px 0px 0px;
    padding: ${props => (props.isDialog ? "24px" : "0px")};
  }

  @media screen and (max-width: 414px) {
    max-width: 414px !important;
    border-radius: 8px 8px 0px 0px;
  }
`;

export const Wrapper2 = styled.div`
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin: 0 0 24px 0; */
`;

export const IconBox = styled.div`
  cursor: pointer;
  &:hover {
    svg * {
      transition: 0.6s;
      fill: #ff6347;
    }
  }
`;

export const Box = styled.div`
  div {
    div {
      display: flex;
      align-items: center;
    }
  }
`;

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
`;

export const SubTitle = styled.p`
  font-size: 16px;
  color: #808080;
  font-weight: 400;
  margin: 8px 0 0 0;
`;

export const Spacer = styled.div`
  width: 100%;
  height: 24px;
  /* border-bottom: 1px solid #dcdcdc; */
`;
export const DeliveryBox = styled.div<{ isDisable?: boolean }>`
  border: 1px solid #dcdcdc;
  padding: 11px 23px;
  border-radius: 8px;
  box-shadow: 3px 3px 0px rgba(34, 34, 34, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  ${props => props.isDisable && `cursor: not-allowed;`}
`;

export const DeliveryInfo = styled.div`
  display: flex;
  align-items: center;
`;

export const DeliveryText = styled.p`
  margin: 0 8px;
  font-size: 16px;
  font-weight: 600;
`;

export const ItemList = styled.div<{ isPlace: any }>`
  border-bottom: 1px solid #dcdcdc;
  margin: 0 0 24px 0;
  overflow-y: scroll;
  max-height: 50vh;
  @media screen and (max-width: 768px) {
    max-height: ${props =>
      props.isPlace ? "fit-content" : "calc(100vh - 280px)"};
  }
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ButtonWrap = styled.div``;

export const DiscountBox = styled.div<{ element: any }>`
  /* margin-bottom: 24px; */
  display: grid;
  grid-row-gap: 8px;
  padding-bottom: ${props => (props.element ? 0 : "16px")};
`;

export const DiscountItem = styled.div`
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const DiscountTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  color: #28a745;
`;

export const Discount = styled(DiscountTitle)`
  font-weight: 400;
`;

export const DeliveryTitle = styled(DiscountTitle)`
  color: #000;
`;

export const DeliveryFee = styled(DeliveryTitle)`
  font-weight: 400;
`;

export const SubText = styled.p<{ isCash?: boolean }>`
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 0 0;
  color: ${props => (props.isCash ? "#DC3545" : "#808080")};
`;
