import React from "react";
import ReactSVG from "react-svg";
import styled from "styled-components";

import plus from "images/plus.svg";

interface IProps {
  title?: string;
  isActive?: boolean;
  onClick?: any;
}

function AddNewAddress({ title, isActive = false, onClick }: IProps) {
  return (
    <Wrapper className={isActive ? "isActive" : ""} onClick={onClick}>
      <IconBox>
        <ReactSVG path={plus} />
      </IconBox>
      <Title>{title}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  min-height: 176px;
  height: 100%;
  transition: 0.6s;
  cursor: pointer;
  &:hover {
    border: 1px solid #ff6347;
    box-shadow: 4px 4px 0px rgba(34, 34, 34, 0.16);
  }

  &.isActive {
    border: 1px solid #ff6347;
    box-shadow: 4px 4px 0px rgba(34, 34, 34, 0.16);
  }
`;

const IconBox = styled.div`
  svg * {
    fill: #808080;
  }
`;

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #808080;
`;

export default AddNewAddress;
