import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Item = styled.div<{ fullWidth?: boolean }>`
  width: ${props => (props.fullWidth ? "100%" : "49%")};
  margin: 0 0 24px 0;
  @media screen and (max-width: 768px) {
    &.responsive {
      width: 100%;
    }
  }

  @media screen and (max-width: 414px) {
    &.responsive {
      width: 100%;
    }
    /* width: 100%; */
  }
`;

export const Title = styled.h4`
  font-size: 20px;
  font-weight: 600;
  margin: 0 0 24px 0;
`;

export const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: #dcdcdc;
  margin: 0 0 24px 0;
`;

export const WrapperPaymentItem = styled.div`
  width: 49%;
  margin-top: -18px;
  margin-bottom: 24px;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

export const Paragraph = styled.p`
  font-weight: normal;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  color: #808080;
`;
