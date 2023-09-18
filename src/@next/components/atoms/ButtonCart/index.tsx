/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/require-default-props */
import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

interface IProps {
  color?: any;
  text: string;
  icon?: any;
  price?: string;
  onClick?: any;
  isDisable?: boolean;
}
function ButtonCard({ color, text, icon, price, onClick, isDisable }: IProps) {
  return (
    <Wrapper
      color={color}
      onClick={() => {
        if (!isDisable && onClick) {
          onClick();
        }
      }}
      isDisable={isDisable}
    >
      <Col1 style={{ width: "70%" }}>
        {icon && (
          <IconBox>
            <ReactSVG path={icon} color="#fff" />
          </IconBox>
        )}
        <Text>{text}</Text>
      </Col1>

      <Col1>
        <Price>{price}</Price>
      </Col1>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ color: any; isDisable?: boolean }>`
  background: ${props => props.color || "#28A745"};
  padding: 11px 24px;
  border-radius: 8px;
  border: 1px solid #22222216;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff !important;
  box-shadow: 3px 3px 0px #d5d5d5;
  cursor: pointer;
  ${props => props.isDisable && `cursor: not-allowed; opacity: 0.4;`}
`;
const Col1 = styled.div`
  display: flex;
  align-items: center;
  svg * {
    fill: #fff;
  }
`;

const IconBox = styled.div`
  div {
    div {
      display: flex;
      align-items: center;
    }
  }
  margin-right: 8px;
`;
const Text = styled.p`
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  color: #fff !important;
`;
const Price = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;
  color: #fff !important;
`;

export default ButtonCard;
