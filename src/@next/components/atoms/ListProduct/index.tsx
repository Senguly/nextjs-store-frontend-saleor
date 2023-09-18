/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/namespace */
import React from "react";
import { Element } from "react-scroll";

import ProductBox from "@components/molecules/ProductBox/ProductBox";
import { checkCurrency } from "@utils/money";

import * as S from "./styles";

interface IProps {
  listCategory: any;
  isOpen?: any;
  cartItems?: any;
  setCurProduct?: any;
}

const formatDescription = (description: string) => {
  const listText = description.replace(/&nbsp;/gi, "").split("<br>");
  const finalText = listText.map((item, index) => {
    if (index === listText.length || item === "") {
      return (
        <>
          <span>{item}</span>
        </>
      );
    }
    return (
      <>
        <span>{item}</span>
        <br />
      </>
    );
  });
  return finalText;
};

function ListProduct({
  listCategory,
  isOpen,
  cartItems,
  setCurProduct,
}: IProps) {
  // console.log(listCategory,"----------listt category");

  const handleCartActive = (item: any) => {
    const itemElement: any[] = [];
    let itemCount = 0;

    cartItems.forEach((element: any) => {
      if (element.id === item.id) {
        itemElement.push(element);
      }
    });

    itemElement.forEach((element: any) => {
      itemCount += element.quantity;
    });

    return itemCount;
  };

  const checkEnableCategory = (category: any) => {
    let result = false;
    if (category?.node?.enable && category?.node?.products?.edges?.length) {
      result = category?.node?.products?.edges?.some((item: any) => {
        return item?.node?.enable === true;
      });
    }
    return result;
  };

  return (
    <S.Wrapper>
      {listCategory
        .filter((item: any) => checkEnableCategory(item))
        .map((item: any, index: number) => {
          const tempDes = JSON.parse(item.node.description)?.blocks.reduce(
            (result: string, item: any) => {
              return `${result} ${item.data.text} <br>`;
            },
            ""
          );
          const listProduct = item.node.products.edges
            .filter((item: any) => item?.node?.enable)
            .map((item: any) => {
              const gross = item?.node?.pricing?.priceRange?.start?.gross;
              const description = JSON.parse(
                item.node?.description
              )?.blocks.reduce((result: string, item: any) => {
                return `${result} ${item.data.text} <br>`;
              }, "");
              // const description = JSON.parse(item.node?.description)?.blocks[0]
              //   .data.text;

              const options = item?.node?.options;

              return {
                id: item.node.id,
                name: item.node.name,
                description,
                price: gross?.amount,
                currency: checkCurrency(gross?.currency),
                url: item.node?.images[0]?.url,
                discount: item?.node?.pricing?.discount,
                variantId: item?.node?.variants[0]?.id,
                options,
              };
            });
          const breakPoint = Math.round(listProduct.length / 2);
          // console.log(listProduct, "--------------list Product");

          return (
            <Element name={item.node.id} className="element" key={index}>
              <div key={index} id={item.node.id}>
                <S.Title>{item.node.name}</S.Title>
                <S.Description>
                  {tempDes && formatDescription(tempDes)}
                </S.Description>
                <S.ListWrap>
                  <S.Col1>
                    {listProduct
                      .slice(0, breakPoint)
                      .map((item: any, index: number) => {
                        return (
                          <ProductBox
                            key={index}
                            product={item}
                            isOpen={isOpen}
                            cartItems={handleCartActive(item)}
                            setCurProduct={setCurProduct}
                          />
                        );
                      })}
                  </S.Col1>
                  <S.Col2>
                    {listProduct
                      .slice(breakPoint)
                      .map((item: any, index: number) => {
                        return (
                          <ProductBox
                            key={index}
                            product={item}
                            isOpen={isOpen}
                            cartItems={handleCartActive(item)}
                            setCurProduct={setCurProduct}
                          />
                        );
                      })}
                  </S.Col2>
                </S.ListWrap>
              </div>
            </Element>
          );
        })}
    </S.Wrapper>
  );
}

export default ListProduct;
