import React from "react";

import { Address } from "@components/atoms";

import * as S from "./styles";
import { IProps } from "./types";

export const AddressTile: React.FC<IProps> = ({
  address,
  ...props
}: IProps) => {
  const content = <Address address={address} {...props} />;
  return (
    <S.Wrapper
      data-test-billing-default={address.isDefaultBillingAddress}
      data-test-shipping-default={address.isDefaultShippingAddress}
    >
      {/* <Tile footer={footer}>{content}</Tile> */}
      {content}
    </S.Wrapper>
  );
};
