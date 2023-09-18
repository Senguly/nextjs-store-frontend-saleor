import React from "react";

import * as S from "./styles";

interface IProps {
  title?: string;
}

const mock = [
  {
    stt: true,
    text: "Order placed",
    time: "17:01",
  },
  {
    stt: true,
    text: "In the kitchen",
    time: "17:01",
  },
  {
    stt: false,
    text: "Ready for pickup",
    time: "17:01",
  },
  {
    stt: false,
    text: "Picked up",
    time: "17:01",
  },
];

function CheckoutProgress({ title }: IProps) {
  return (
    <S.Wrapper>
      <S.Title>{title}</S.Title>
      <S.ProgressBarConTainer>
        {mock.map((item: any, index: number) => {
          return (
            <S.ProgressItem key={index}>
              <S.ProgressBar stt={item.stt} />
              <S.ProgressTitle stt={item.stt}>{item.text}</S.ProgressTitle>
              {item.stt && <S.ProgressTime>{item.time}</S.ProgressTime>}
            </S.ProgressItem>
          );
        })}
      </S.ProgressBarConTainer>
    </S.Wrapper>
  );
}

export default CheckoutProgress;
