import React from "react";
import styled from "styled-components";

interface IProps {
  address?: any;
  isActive?: boolean;
  onClick?: any;
}

function AddressItem({ address, isActive = false, onClick }: IProps) {
  const getAddress = (address: any) => {
    let result = "";
    if (address?.streetAddress1) {
      result += `${address?.streetAddress1}, `;
    }
    if (address?.postalCode) {
      result += `${address?.postalCode}, `;
    }
    if (address?.city) {
      result += `${address?.city}`;
    }
    return result;
  };
  return (
    <Wrapper className={isActive ? "isActive" : ""} onClick={onClick}>
      <Title className={isActive ? "isActive" : ""}>
        {address.firstName} {address.lastName}
      </Title>
      <Text className={isActive ? "isActive" : ""}>{getAddress(address)}</Text>
      <Text className={isActive ? "isActive" : ""}>
        {address?.email && address?.email}
      </Text>
      <Text className={isActive ? "isActive" : ""}>
        {address?.phone && address?.phone}
      </Text>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  //   justify-content: center;
  padding: 24px;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  min-height: 176px;
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

const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #808080;
  margin: 0 0 8px 0;
  &.isActive {
    color: #ff6347;
  }
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  color: #808080;
  margin: 0 0 4px 0;
  &.isActive {
    color: #000;
  }
`;

export default AddressItem;
