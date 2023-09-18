/* eslint-disable react/require-default-props */
import React from "react";
import styled from "styled-components";

interface IProps {
  value?: any;
  isDialog?: boolean;
  setValue?: any;
  increase?: any;
  decrease?: any;
  removeProduct?: any;
  cartItem?: any;
  handleDeleteLine?: any;
  onUpdateLines?: any;
}

function QuantityField({
  value,
  isDialog,
  setValue,
  increase,
  decrease,
  removeProduct,
  cartItem,
  handleDeleteLine,
  onUpdateLines,
}: IProps) {
  const onDecrease = () => {
    setValue((value: number) => (value > 1 ? value - 1 : 1));
    // decrease && decrease({ cartItem, quantity: value });
    if (decrease) {
      if (value === 1) {
        removeProduct({ ...cartItem });
        // handle delete line
        if (handleDeleteLine) {
          handleDeleteLine(cartItem?.variantId);
        }
      } else {
        decrease({ ...cartItem });
        if (onUpdateLines) {
          onUpdateLines();
        }
      }
    }
  };

  const onIncrease = () => {
    setValue((value: number) => value + 1);
    if (increase) {
      increase({ ...cartItem });
      if (onUpdateLines) {
        onUpdateLines();
      }
    }
    // increase && increase({ cartItem, quantity: value });
  };

  return (
    <QuantityBox>
      <QuantityBtn isDialog={isDialog} onClick={onDecrease}>
        -
      </QuantityBtn>
      <Quantity isDialog={isDialog}>
        {cartItem ? cartItem?.quantity : value}
      </Quantity>
      <QuantityBtn isDialog={isDialog} onClick={onIncrease}>
        +
      </QuantityBtn>
    </QuantityBox>
  );
}

export const QuantityBox = styled.div`
  display: flex;
  align-items: center;
`;

export const QuantityBtn = styled.div<{ isDialog?: boolean }>`
  width: ${props => (props.isDialog ? "32px" : "16px")};
  height: ${props => (props.isDialog ? "32px" : "16px")};
  border-radius: 50%;
  background: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  cursor: pointer;
`;

export const Quantity = styled.p<{ isDialog?: boolean }>`
  font-size: 16px;
  font-weight: 400;
  margin: 0 4px;
  width: 35px;
  padding: ${props => (props.isDialog ? "0 16px" : "0 8px")};
  text-align: center;
`;

export default QuantityField;
