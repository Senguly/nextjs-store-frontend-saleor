import styled from "styled-components";

export const Wrapper = styled.div<{ cartItems?: any; isStretch: boolean }>`
  padding: 24px;
  display: grid;
  grid-template-columns: ${props => (props.isStretch ? "auto 96px" : "auto")};
  grid-column-gap: 16px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  transition: 0.3s;
  margin-bottom: 24px;
  ${props =>
    props.cartItems > 0
      ? "border: 1px solid #ff6347;box-shadow: 7px 6px 0px rgba(34, 34, 34, 0.16);"
      : ""}
  &:hover {
    border: 1px solid #ff6347;
    box-shadow: 7px 6px 0px rgba(34, 34, 34, 0.16);
  }
`;

export const ProductWrap = styled.div``;

export const Name = styled.h3`
  font-size: 16px;
  font-weight: 600;
  display: flex;
  margin: 0 0 8px 0;
`;

export const Quantity = styled.span`
  font-size: 16px;
  line-height: 24px;
  font-weight: normal;
  color: #808080;
  padding-right: 4px;
  white-space: nowrap;
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  margin: 0 0 8px 0;
  color: #808080;
`;

export const Price = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: #222222;
`;

export const ImageBox = styled.div`
  width: 96px;
  height: 96px;
  border-radius: 8px;
  overflow: hidden;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
