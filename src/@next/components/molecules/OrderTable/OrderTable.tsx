import { useRouter } from "next/router";
import React from "react";
import Media from "react-media";

import { smallScreen } from "@styles/constants";
import { checkCurrency } from "@utils/money";

import { Thumbnail } from "..";
import * as S from "./styles";
import { IProps } from "./types";

export const OrderTable: React.FC<IProps> = ({ orders }: IProps) => {
  const { push } = useRouter();
  return (
    <S.Wrapper>
      <>
        {orders.map(({ created, number, lines, total, orderType, token }) => {
          const date = new Date(created).toDateString();
          return (
            <S.OrderItem onClick={() => push(`/order-history/${token}`)}>
              <S.Col1>
                <S.OrderCode>
                  {`${
                    orderType === "DELIVERY"
                      ? "Delivery"
                      : orderType === "PICKUP"
                      ? "Pickup"
                      : "Dine in"
                  } order ${number}`}
                </S.OrderCode>
                <S.OrderDate>{`Order placed on ${date}`}</S.OrderDate>
                <S.OrderPrice>
                  {checkCurrency(total.net.currency)} {total.net.amount}
                </S.OrderPrice>
              </S.Col1>

              <S.Col2>
                <Media
                  query={{
                    maxWidth: smallScreen,
                  }}
                >
                  {(matches: boolean) => {
                    return (
                      <S.ProductsOrdered>
                        {matches
                          ? lines.slice(0, 1).map((line: any) => (
                              <S.ImageBox>
                                <Thumbnail source={line!} />
                              </S.ImageBox>
                            ))
                          : lines.slice(0, 3).map((line: any) => (
                              <S.ImageBox>
                                <Thumbnail source={line!} />
                              </S.ImageBox>
                            ))}
                        {}
                      </S.ProductsOrdered>
                    );
                  }}
                </Media>
              </S.Col2>
            </S.OrderItem>
          );
        })}
      </>
    </S.Wrapper>
  );
};
