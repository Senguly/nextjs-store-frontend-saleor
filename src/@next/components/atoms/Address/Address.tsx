import React from "react";

import { IProps } from "@types";

import * as S from "./styles";

export const Address: React.FC<IProps> = ({
  address,
  onEdit,
  onRemove,
}: IProps) => {
  const {
    firstName,
    lastName,
    companyName,
    streetAddress1,
    city,
    postalCode,
    countryArea,
    // country,
    phone,
  } = address;

  return (
    <S.Wrapper>
      <S.Name>{`${firstName} ${lastName}`}</S.Name>
      {companyName && <S.TextInfo>{companyName} </S.TextInfo>}
      <S.TextInfo> {streetAddress1}</S.TextInfo>

      <S.TextInfo>
        {postalCode && `${postalCode},`} {city}
      </S.TextInfo>

      <S.TextInfo>{countryArea && <>{countryArea}, </>}</S.TextInfo>

      {/* <S.TextInfo>{country!.country}</S.TextInfo> */}

      <S.TextInfo>{phone}</S.TextInfo>

      <S.ButtonWrap>
        <S.Button style={{ marginRight: "16px" }} onClick={onEdit}>
          <S.Text>Edit</S.Text>
        </S.Button>

        <S.Button>
          <S.Text color="#DC3545" onClick={onRemove}>
            Delete
          </S.Text>
        </S.Button>
      </S.ButtonWrap>
    </S.Wrapper>
  );
};
