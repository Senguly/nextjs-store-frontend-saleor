import React from "react";

import * as S from "./styles";
import { IProps } from "./types";

export const TileGrid: React.FC<IProps> = ({
  elements,
  columns = 3,
}: IProps) => {
  return (
    <S.Wrapper>
      <S.Title>My addresses</S.Title>
      <S.GridLayout>
        {elements.map((element: React.ReactNode, index) => (
          <S.Tile key={index} columns={columns}>
            {element}
          </S.Tile>
        ))}
      </S.GridLayout>
    </S.Wrapper>
  );
};
