/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

interface IProps {
  icon?: any;
  text?: string;
  bgColor?: any;
  isActive?: any;
  onClick?: any;
  disable?: any;
}

function ButtonIcon({
  icon,
  text,
  bgColor,
  isActive,
  onClick,
  disable,
}: IProps) {
  return (
    <DeliveryBox
      disable={disable}
      bgColor={bgColor}
      isActive={isActive}
      onClick={onClick}
    >
      {icon && (
        <IconBox className="icon-box" isActive={isActive} bgColor={bgColor}>
          <ReactSVG path={icon} />
        </IconBox>
      )}

      <DeliveryText bgColor={bgColor} isActive={isActive}>
        {text}
      </DeliveryText>
    </DeliveryBox>
  );
}

export const DeliveryBox = styled.div<{
  bgColor?: any;
  isActive?: boolean;
  disable?: boolean;
}>`
  border: 1px solid ${props => (props.isActive ? "#ff6347" : "#dcdcdc")};
  padding: 11px 23px;
  border-radius: 8px;
  background: ${props => props.bgColor || "#fff"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: ${props => (props.disable ? 0.25 : 1)};

  box-shadow: ${props =>
    props.bgColor || (props.isActive && "4px 4px 0px #22222216")};

  &:hover {
    border: 1px solid #ff6347;
    box-shadow: 4px 4px 0px #22222216;
    p {
      color: ${props => !props.bgColor && "#ff6347 !important"};
    }
    div {
      div {
        svg * {
          fill: ${props => (props.bgColor ? "#fff" : "#ff6347")};
        }
      }
    }
  }

  ${props => props.disable && `cursor: not-allowed; opacity: 0.4;`}
`;

export const IconBox = styled.div<{ isActive?: boolean; bgColor?: any }>`
  div {
    div {
      display: flex;
      align-items: center;
    }
  }
  svg * {
    fill: ${props =>
      props.isActive ? "#ff6347" : props.bgColor ? "#fff" : "#808080;"};
  }
`;

export const DeliveryText = styled.p<{ bgColor?: any; isActive?: boolean }>`
  margin: 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: ${props =>
    props.isActive
      ? "#ff6347"
      : props.bgColor
      ? "#fff !important"
      : "#808080 !important"};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export default ButtonIcon;
