/* eslint-disable react/require-default-props */
import React from "react";

import * as S from "./styles";

interface IProps {
  product?: any;
  isOpen?: any;
  cartItems?: any;
  setCurProduct?: any;
}

const formatDescription = (description: string) => {
  // console.log("Desc", description);
  const listText = description.replace(/&nbsp;/gi, "").split("<br>");
  const finalText = listText.map(item => (
    <>
      <span>{item}</span>
      <br />
    </>
  ));
  return finalText;
};

function ProductBox(props: IProps) {
  const { product, isOpen, cartItems, setCurProduct } = props;

  // console.log(product);

  return (
    <S.Wrapper
      cartItems={cartItems}
      onClick={() => {
        isOpen(true);
        setCurProduct(product);
      }}
      isStretch={!!product.url}
    >
      <S.ProductWrap key={product.id}>
        <S.Name>
          {cartItems === 0 || cartItems === undefined ? null : (
            <S.Quantity>{`${cartItems} x`}</S.Quantity>
          )}
          {product.name}
        </S.Name>
        <S.Description>
          {product.description && formatDescription(product.description)}
        </S.Description>
        {/* <S.Description
          dangerouslySetInnerHTML={{ __html: product.description }}
        /> */}
        <S.Price>{`${product.currency} ${
          product?.price && product?.price.toFixed(2).replace(".", ".")
        }`}</S.Price>
      </S.ProductWrap>
      {product.url && (
        <S.ImageBox>
          <S.Image src={product.url} />
        </S.ImageBox>
      )}
    </S.Wrapper>
  );
}

export default ProductBox;
